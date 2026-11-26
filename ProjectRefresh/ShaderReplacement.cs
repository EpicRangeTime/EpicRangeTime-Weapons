using System;
using System.Collections;
using System.Collections.Generic;
using BepInEx.Configuration;
using BepInEx;
using Comfort.Common;
using Diz.DependencyManager;
using Diz.Resources;
using EFT;
using HarmonyLib;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace ProjectRefresh;

[BepInPlugin(PluginId, "Project Refresh", "1.0.0")]
public sealed class ShaderReplacement : BaseUnityPlugin
{
    private const string PluginId = "com.epicrangetime.projectrefresh";
    private const string BundleKey = "epic_aio_shaders.bundle";
    private const string ReplacementPrefix = "Epic Replacements/";
    private const string WindowShaderName = "Global Fog/Transparent Reflective Specular";
    private static readonly int ShardReflectionStrengthId = Shader.PropertyToID("_GlobalReflectionStrength");
    private static readonly Dictionary<string, Shader> replacements = new(StringComparer.Ordinal);
    private DependencyGraph<IEasyBundle>.Token? bundleToken;
    private Harmony? harmony;

    private const string OwnerTag = "ProjectRefresh_Shaderswap";
    private static readonly List<OriginalState> states = new();
    private ConfigEntry<bool> enableReplacement = null!;
    private static bool active;

    private sealed class ConfigurationManagerAttributes
    {
        public bool? IsAdvanced = true;
    }

    private sealed class OriginalState
    {
        public Shader Original = null!;
        public Shader Target = null!;
        public string[] Keywords = null!;
        public float GlossToggle;
        public string Tag = "";
    }

    private void Awake()
    {
        enableReplacement = Config.Bind("Graphics", "Enable shader replacement", true,
            new ConfigDescription("Use Epic's bundled Tarkov replacement shaders. Turn off to restore stock shaders immediately.",
                null, new ConfigurationManagerAttributes()));
    }

    private void Update()
    {
        if (replacements.Count == 0 || active == enableReplacement.Value)
            return;

        active = enableReplacement.Value;
        if (active)
            SwapLoadedMaterials();
        else
            RestoreMaterials();
    }

    private IEnumerator Start()
    {
        var delay = new WaitForSecondsRealtime(1f);
        while (Singleton<IEasyAssets>.Instance?.System == null)
            yield return delay;

        var assets = Singleton<IEasyAssets>.Instance;
        UnityEngine.Object[]? bundledAssets = null;
        if (assets.System.Nodes.ContainsKey(BundleKey))
        {
            // Let Tarkov own the registered copy when both packages are installed.
            bundleToken = assets.Retain(new[] { BundleKey });
            var loading = bundleToken.LoadingJob;
            while (!loading.IsCompleted)
                yield return null;

            if (!loading.IsFaulted && !loading.IsCanceled && assets.IsAssetLoaded(BundleKey))
                bundledAssets = assets.System.GetNode(BundleKey).Data.Assets;
            else
            {
                Logger.LogWarning($"SPT could not load {BundleKey}. Trying the client copy. {loading.Exception}");
                bundleToken.Release();
                bundleToken = null;
            }
        }

        if (bundledAssets == null)
        {
            var path = System.IO.Path.Combine(System.IO.Path.GetDirectoryName(Info.Location)!, BundleKey);
            if (!System.IO.File.Exists(path))
            {
                Logger.LogError($"Client shader bundle missing: {path}");
                yield break;
            }

            var request = AssetBundle.LoadFromFileAsync(path);
            yield return request;
            var localBundle = request.assetBundle;
            if (!localBundle)
            {
                Logger.LogError($"Unity could not open the client shader bundle: {path}");
                yield break;
            }
            try
            {
                bundledAssets = localBundle.LoadAllAssets();
            }
            finally
            {
                localBundle.Unload(false); // Release the bundle file while keeping its loaded assets.
            }
        }

        foreach (var asset in bundledAssets)
        {
            var shader = asset is Material material ? material.shader : asset as Shader;
            if (!shader || !shader!.name.StartsWith(ReplacementPrefix, StringComparison.Ordinal))
                continue;
            if (shader.name == ReplacementPrefix + WindowShaderName &&
                shader.FindPropertyIndex("_GlobalReflectionStrength") < 0)
            {
                Logger.LogWarning("Window replacement bundle lacks the shard reflection property. Using the stock window shader.");
                continue;
            }
            if (shader.isSupported)
                replacements[shader.name.Substring(ReplacementPrefix.Length)] = shader;
            else
                Logger.LogWarning($"Unsupported replacement shader: {shader.name}");
        }
        Logger.LogInfo($"Loaded {replacements.Count} shader mappings from {BundleKey}.");
        if (replacements.Count == 0)
            yield break;

        harmony = new Harmony(PluginId);
        harmony.PatchAll(typeof(PooledObjectPatch));
        harmony.PatchAll(typeof(IconPatch));
        harmony.PatchAll(typeof(WindowMaterialPatch));
        SceneManager.sceneLoaded += OnSceneLoaded;
        active = enableReplacement.Value;
        if (active)
            Logger.LogInfo($"Initially replaced {SwapLoadedMaterials()} materials.");

        // Catch runtime materials created outside Tarkov's item factory.
        var interval = new WaitForSecondsRealtime(10f);
        while (true)
        {
            yield return interval;
            if (active) SwapLoadedMaterials();
        }
    }

    private static bool Swap(Material material)
    {
        if (!material || !material.shader)
            return false;

        if (!replacements.TryGetValue(material.shader.name, out var target))
            return false;

        int queue = material.renderQueue;
        var original = material.shader;
        var keywords = material.shaderKeywords;
        material.shader = target!;
        material.shaderKeywords = keywords;
        bool hasGloss = material.HasProperty("_UseBSGGloss");
        float gloss = hasGloss ? material.GetFloat("_UseBSGGloss") : 0f;
        // A material cloned by Tarkov inherits override tags. Keep a small table of
        // distinct original states so clones can also be restored after despawning.
        var state = states.Find(s => s.Original == original && s.Target == target &&
            s.GlossToggle.Equals(gloss) && s.Keywords.AsSpan().SequenceEqual(keywords));
        if (state == null)
        {
            state = new OriginalState { Original = original, Target = target!, Keywords = keywords,
                GlossToggle = gloss, Tag = (states.Count + 1).ToString() };
            states.Add(state);
        }
        material.SetOverrideTag(OwnerTag, state.Tag);
        if (hasGloss)
        {
            material.SetFloat("_UseBSGGloss", 1f);
            material.EnableKeyword("_USEBSGGLOSS_ON");
        }
        if (material.renderQueue != queue)
            material.renderQueue = queue;
        return true;
    }

    private static void RestoreMaterials()
    {
        foreach (var material in Resources.FindObjectsOfTypeAll<Material>())
        {
            if (!material)
                continue;
            if (!int.TryParse(material.GetTag(OwnerTag, false, ""), out int id) || id < 1 || id > states.Count)
                continue;
            var state = states[id - 1];
            if (!state.Original || material.shader != state.Target)
                continue;

            int queue = material.renderQueue;
            material.SetOverrideTag(OwnerTag, "");
            if (material.HasProperty("_UseBSGGloss"))
                material.SetFloat("_UseBSGGloss", state.GlossToggle);
            material.shader = state.Original;
            material.shaderKeywords = state.Keywords;
            if (material.renderQueue != queue)
                material.renderQueue = queue;
        }
    }

    private static int SwapLoadedMaterials()
    {
        int count = 0;
        foreach (var material in Resources.FindObjectsOfTypeAll<Material>())
            if (Swap(material)) count++;
        return count;
    }

    private static void SwapModel(GameObject model)
    {
        if (!active || !model) return;
        foreach (var renderer in model.GetComponentsInChildren<Renderer>(true))
            foreach (var material in renderer.sharedMaterials)
                Swap(material);
    }

    private static void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        if (active) SwapLoadedMaterials();
    }

    private void OnDestroy()
    {
        SceneManager.sceneLoaded -= OnSceneLoaded;
        harmony?.UnpatchSelf();
        active = false;
        if (states.Count > 0) RestoreMaterials();
        states.Clear();
        bundleToken?.Release();
        replacements.Clear();
    }

    [HarmonyPatch(typeof(WindowsManager), nameof(WindowsManager.IsMaterialValid))]
    private static class WindowMaterialPatch
    {
        private static void Postfix(Material __0, ref bool __result)
        {
            if (__result || !__0 || !__0.HasProperty(ShardReflectionStrengthId))
                return;

            // WindowsManager reads properties from this pane, then draws with its own shader.
            if (replacements.TryGetValue(WindowShaderName, out var replacement) &&
                __0.shader == replacement)
                __result = true;
        }
    }

    [HarmonyPatch(typeof(ObjectsFactory.Pools), nameof(ObjectsFactory.Pools.PopOrCreate))]
    private static class PooledObjectPatch
    {
        private static void Postfix(GameObject __result) => SwapModel(__result);
    }

    [HarmonyPatch(typeof(ShaderReplacer), nameof(ShaderReplacer.Replace))]
    private static class IconPatch
    {
        private static void Prefix(GameObject __0) => SwapModel(__0);

        // Extend Tarkov's existing "_Icon" exemption to our bundled replacement shaders.
        private static IEnumerable<CodeInstruction> Transpiler(IEnumerable<CodeInstruction> instructions)
        {
            var contains = AccessTools.Method(typeof(string), nameof(string.Contains), new[] { typeof(string) });
            var exempt = AccessTools.Method(typeof(IconPatch), nameof(IsIconShader));
            foreach (var instruction in instructions)
            {
                if (instruction.Calls(contains))
                {
                    instruction.opcode = System.Reflection.Emit.OpCodes.Call;
                    instruction.operand = exempt;
                }
                yield return instruction;
            }
        }

        private static bool IsIconShader(string name, string marker) =>
            name.Contains(marker) || (active && name.StartsWith(ReplacementPrefix, StringComparison.Ordinal)
                && replacements.ContainsKey(name.Substring(ReplacementPrefix.Length)));
    }
}
