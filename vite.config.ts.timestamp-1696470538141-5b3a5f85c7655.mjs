// vite.config.ts
import { crx } from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/@vitejs+plugin-vue@4.3.3_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { dirname, join, relative, resolve } from "path";
import AutoImport from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.0/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/unplugin-icons@0.16.5_@vue+compiler-sfc@3.3.4/node_modules/unplugin-icons/dist/vite.mjs";
import Components from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/vite@4.4.9_@types+node@18.17.11_sass@1.66.1/node_modules/vite/dist/node/index.js";
import Pages from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/vite-plugin-pages@0.31.0_@vue+compiler-sfc@3.3.4_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///C:/Users/topsq/Desktop/ME/CODING/dv-form-filler-2023/dv-form-filler-2023/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  dependencies: {
    "@supabase/supabase-js": "^2.33.2",
    daisyui: "^3.7.6",
    motion: "^10.16.2",
    pinia: "^2.1.6",
    vue: "^3.3.4",
    "vue-router": "^4.2.4"
  },
  description: "A Vue 3 + Vite project for building Chrome extensions",
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.18",
    "@iconify-json/mdi": "^1.1.54",
    "@tailwindcss/forms": "^0.5.5",
    "@types/chrome": "^0.0.244",
    "@types/eslint": "^8.44.2",
    "@types/eslint-config-prettier": "^6.11.0",
    "@types/node": "^18.17.11",
    "@typescript-eslint/eslint-plugin": "^6.4.1",
    "@typescript-eslint/parser": "^6.4.1",
    "@vitejs/plugin-vue": "^4.3.3",
    "@vue/compiler-sfc": "^3.3.4",
    "@vueuse/core": "^10.4.0",
    autoprefixer: "^10.4.15",
    eslint: "^8.48.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-vue": "^9.17.0",
    postcss: "^8.4.28",
    prettier: "^3.0.2",
    "prettier-plugin-tailwindcss": "^0.5.3",
    sass: "^1.66.1",
    tailwindcss: "^3.3.3",
    typescript: "^5.2.2",
    "unplugin-auto-import": "^0.16.6",
    "unplugin-icons": "^0.16.5",
    "unplugin-vue-components": "^0.25.1",
    vite: "^4.4.9",
    "vite-plugin-pages": "^0.31.0",
    "vue-tsc": "^1.8.8",
    "webext-bridge": "^6.0.1"
  },
  displayName: "EG-Datapoint Form Filler",
  name: "EG-Datapoint-Form-Filler",
  overrides: {
    "@crxjs/vite-plugin": "$@crxjs/vite-plugin"
  },
  pnpm: {
    overrides: {},
    peerDependencyRules: {
      allowAny: [],
      allowedDeprecatedVersions: {
        "sourcemap-codec": "1.4.8"
      },
      allowedVersions: {},
      ignoreMissing: []
    }
  },
  private: true,
  scripts: {
    build: "vite build",
    dev: "vite",
    lint: "eslint . --fix --ext js,mjs,cjs,ts,mts,cts,vue",
    preview: "vite preview"
  },
  type: "module",
  version: "0.0.1"
};

// manifest.config.ts
var { version, name, description, displayName } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async (env) => ({
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_popup: "src/popup/index.html"
  },
  background: {
    service_worker: "src/background/index.ts"
  },
  content_scripts: [
    {
      all_frames: false,
      js: ["src/content-script/index.ts"],
      matches: ["*://*/*"],
      run_at: "document_end"
    }
  ],
  host_permissions: ["*://*/*"],
  options_page: "src/options/index.html",
  permissions: ["storage", "activeTab", "identity"],
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/index.ts"]
    },
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/iframe/index.html"]
    }
  ]
}));

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\topsq\\Desktop\\ME\\CODING\\dv-form-filler-2023\\dv-form-filler-2023";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": resolve(join(__vite_injected_original_dirname, "src")),
      src: resolve(join(__vite_injected_original_dirname, "src"))
    }
  },
  plugins: [
    crx({ manifest: manifest_config_default }),
    vue(),
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: ""
        },
        {
          dir: "src/options/pages",
          baseRoute: "options"
        },
        {
          dir: "src/popup/pages",
          baseRoute: "popup"
        },
        {
          dir: "src/content-script/iframe/pages",
          baseRoute: "iframe"
        }
      ]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vue/macros", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables/"]
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: "i",
          enabledCollections: ["mdi"]
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: "vue3"
    }),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        iframe: "src/content-script/iframe/index.html"
      }
    }
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false
    }
  },
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
    exclude: ["vue-demi"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHRvcHNxXFxcXERlc2t0b3BcXFxcTUVcXFxcQ09ESU5HXFxcXGR2LWZvcm0tZmlsbGVyLTIwMjNcXFxcZHYtZm9ybS1maWxsZXItMjAyM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdG9wc3FcXFxcRGVza3RvcFxcXFxNRVxcXFxDT0RJTkdcXFxcZHYtZm9ybS1maWxsZXItMjAyM1xcXFxkdi1mb3JtLWZpbGxlci0yMDIzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy90b3BzcS9EZXNrdG9wL01FL0NPRElORy9kdi1mb3JtLWZpbGxlci0yMDIzL2R2LWZvcm0tZmlsbGVyLTIwMjMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luLCByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5jb25maWcnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICd+JzogcmVzb2x2ZShqb2luKF9fZGlybmFtZSwgJ3NyYycpKSxcclxuICAgICAgc3JjOiByZXNvbHZlKGpvaW4oX19kaXJuYW1lLCAnc3JjJykpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxyXG5cclxuICAgIHZ1ZSgpLFxyXG5cclxuICAgIFBhZ2VzKHtcclxuICAgICAgZGlyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRpcjogJ3NyYy9wYWdlcycsXHJcbiAgICAgICAgICBiYXNlUm91dGU6ICcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGlyOiAnc3JjL29wdGlvbnMvcGFnZXMnLFxyXG4gICAgICAgICAgYmFzZVJvdXRlOiAnb3B0aW9ucycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkaXI6ICdzcmMvcG9wdXAvcGFnZXMnLFxyXG4gICAgICAgICAgYmFzZVJvdXRlOiAncG9wdXAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGlyOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9wYWdlcycsXHJcbiAgICAgICAgICBiYXNlUm91dGU6ICdpZnJhbWUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvY29yZSddLFxyXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcy8nXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgICAgLy8gZ2VuZXJhdGUgYGNvbXBvbmVudHMuZC50c2AgZm9yIHRzIHN1cHBvcnQgd2l0aCBWb2xhclxyXG4gICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgLy8gYXV0byBpbXBvcnQgaWNvbnNcclxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgIHByZWZpeDogJ2knLFxyXG4gICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ21kaSddLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWljb25zXHJcbiAgICBJY29ucyh7XHJcbiAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2Fzc2V0cy1yZXdyaXRlJyxcclxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxyXG4gICAgICBhcHBseTogJ2J1aWxkJyxcclxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwsIHsgcGF0aCB9KSB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcclxuICAgICAgICAgIC9cIlxcL2Fzc2V0c1xcLy9nLFxyXG4gICAgICAgICAgYFwiJHtyZWxhdGl2ZShkaXJuYW1lKHBhdGgpLCAnL2Fzc2V0cycpfS9gXHJcbiAgICAgICAgKVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgaWZyYW1lOiAnc3JjL2NvbnRlbnQtc2NyaXB0L2lmcmFtZS9pbmRleC5odG1sJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDg4ODgsXHJcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgaG1yOiB7XHJcbiAgICAgIHBvcnQ6IDg4ODksXHJcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJ10sXHJcbiAgICBleGNsdWRlOiBbJ3Z1ZS1kZW1pJ10sXHJcbiAgfSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0b3BzcVxcXFxEZXNrdG9wXFxcXE1FXFxcXENPRElOR1xcXFxkdi1mb3JtLWZpbGxlci0yMDIzXFxcXGR2LWZvcm0tZmlsbGVyLTIwMjNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHRvcHNxXFxcXERlc2t0b3BcXFxcTUVcXFxcQ09ESU5HXFxcXGR2LWZvcm0tZmlsbGVyLTIwMjNcXFxcZHYtZm9ybS1maWxsZXItMjAyM1xcXFxtYW5pZmVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3RvcHNxL0Rlc2t0b3AvTUUvQ09ESU5HL2R2LWZvcm0tZmlsbGVyLTIwMjMvZHYtZm9ybS1maWxsZXItMjAyMy9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcclxuLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcblxyXG5jb25zdCB7IHZlcnNpb24sIG5hbWUsIGRlc2NyaXB0aW9uLCBkaXNwbGF5TmFtZSB9ID0gcGFja2FnZUpzb25cclxuLy8gQ29udmVydCBmcm9tIFNlbXZlciAoZXhhbXBsZTogMC4xLjAtYmV0YTYpXHJcbmNvbnN0IFttYWpvciwgbWlub3IsIHBhdGNoLCBsYWJlbCA9ICcwJ10gPSB2ZXJzaW9uXHJcbiAgLy8gY2FuIG9ubHkgY29udGFpbiBkaWdpdHMsIGRvdHMsIG9yIGRhc2hcclxuICAucmVwbGFjZSgvW15cXGQuLV0rL2csICcnKVxyXG4gIC8vIHNwbGl0IGludG8gdmVyc2lvbiBwYXJ0c1xyXG4gIC5zcGxpdCgvWy4tXS8pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChhc3luYyAoZW52KSA9PiAoe1xyXG4gIG5hbWU6IGVudi5tb2RlID09PSAnc3RhZ2luZycgPyBgW0lOVEVSTkFMXSAke25hbWV9YCA6IGRpc3BsYXlOYW1lIHx8IG5hbWUsXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgLy8gdXAgdG8gZm91ciBudW1iZXJzIHNlcGFyYXRlZCBieSBkb3RzXHJcbiAgdmVyc2lvbjogYCR7bWFqb3J9LiR7bWlub3J9LiR7cGF0Y2h9LiR7bGFiZWx9YCxcclxuICAvLyBzZW12ZXIgaXMgT0sgaW4gXCJ2ZXJzaW9uX25hbWVcIlxyXG4gIHZlcnNpb25fbmFtZTogdmVyc2lvbixcclxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxyXG4gIC8vIGtleTogJ2VrZ21jYnBnZ2xmbG1nY2Zham5nbHBiY2JkY2NubmplJyxcclxuICBhY3Rpb246IHtcclxuICAgIGRlZmF1bHRfcG9wdXA6ICdzcmMvcG9wdXAvaW5kZXguaHRtbCcsXHJcbiAgfSxcclxuICBiYWNrZ3JvdW5kOiB7XHJcbiAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzJyxcclxuICB9LFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBhbGxfZnJhbWVzOiBmYWxzZSxcclxuICAgICAganM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXHJcbiAgICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxyXG4gICAgICBydW5fYXQ6ICdkb2N1bWVudF9lbmQnLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGhvc3RfcGVybWlzc2lvbnM6IFsnKjovLyovKiddLFxyXG4gIG9wdGlvbnNfcGFnZTogJ3NyYy9vcHRpb25zL2luZGV4Lmh0bWwnLFxyXG4gIHBlcm1pc3Npb25zOiBbJ3N0b3JhZ2UnLCAnYWN0aXZlVGFiJywgJ2lkZW50aXR5J10sXHJcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXHJcbiAgICB7XHJcbiAgICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxyXG4gICAgICByZXNvdXJjZXM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcclxuICAgICAgcmVzb3VyY2VzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCddLFxyXG4gICAgfSxcclxuICBdLFxyXG59KSlcclxuIiwgIntcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI6IFwiXjIuMzMuMlwiLFxuICAgIFwiZGFpc3l1aVwiOiBcIl4zLjcuNlwiLFxuICAgIFwibW90aW9uXCI6IFwiXjEwLjE2LjJcIixcbiAgICBcInBpbmlhXCI6IFwiXjIuMS42XCIsXG4gICAgXCJ2dWVcIjogXCJeMy4zLjRcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjRcIlxuICB9LFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBWdWUgMyArIFZpdGUgcHJvamVjdCBmb3IgYnVpbGRpbmcgQ2hyb21lIGV4dGVuc2lvbnNcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMThcIixcbiAgICBcIkBpY29uaWZ5LWpzb24vbWRpXCI6IFwiXjEuMS41NFwiLFxuICAgIFwiQHRhaWx3aW5kY3NzL2Zvcm1zXCI6IFwiXjAuNS41XCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNDRcIixcbiAgICBcIkB0eXBlcy9lc2xpbnRcIjogXCJeOC40NC4yXCIsXG4gICAgXCJAdHlwZXMvZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl42LjExLjBcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjE3LjExXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl42LjQuMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjQuMVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuMy4zXCIsXG4gICAgXCJAdnVlL2NvbXBpbGVyLXNmY1wiOiBcIl4zLjMuNFwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjQuMFwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTVcIixcbiAgICBcImVzbGludFwiOiBcIl44LjQ4LjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4wLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMTcuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMjhcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4yXCIsXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC41LjNcIixcbiAgICBcInNhc3NcIjogXCJeMS42Ni4xXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjMuM1wiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjIuMlwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNi42XCIsXG4gICAgXCJ1bnBsdWdpbi1pY29uc1wiOiBcIl4wLjE2LjVcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjUuMVwiLFxuICAgIFwidml0ZVwiOiBcIl40LjQuOVwiLFxuICAgIFwidml0ZS1wbHVnaW4tcGFnZXNcIjogXCJeMC4zMS4wXCIsXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjEuOC44XCIsXG4gICAgXCJ3ZWJleHQtYnJpZGdlXCI6IFwiXjYuMC4xXCJcbiAgfSxcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIkVHLURhdGFwb2ludCBGb3JtIEZpbGxlclwiLFxuICBcIm5hbWVcIjogXCJFRy1EYXRhcG9pbnQtRm9ybS1GaWxsZXJcIixcbiAgXCJvdmVycmlkZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiJEBjcnhqcy92aXRlLXBsdWdpblwiXG4gIH0sXG4gIFwicG5wbVwiOiB7XG4gICAgXCJvdmVycmlkZXNcIjoge30sXG4gICAgXCJwZWVyRGVwZW5kZW5jeVJ1bGVzXCI6IHtcbiAgICAgIFwiYWxsb3dBbnlcIjogW10sXG4gICAgICBcImFsbG93ZWREZXByZWNhdGVkVmVyc2lvbnNcIjoge1xuICAgICAgICBcInNvdXJjZW1hcC1jb2RlY1wiOiBcIjEuNC44XCJcbiAgICAgIH0sXG4gICAgICBcImFsbG93ZWRWZXJzaW9uc1wiOiB7fSxcbiAgICAgIFwiaWdub3JlTWlzc2luZ1wiOiBbXVxuICAgIH1cbiAgfSxcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWZpeCAtLWV4dCBqcyxtanMsY2pzLHRzLG10cyxjdHMsdnVlXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCJcbiAgfSxcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCJcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFosU0FBUyxXQUFXO0FBQzlhLE9BQU8sU0FBUztBQUNoQixTQUFTLFNBQVMsTUFBTSxVQUFVLGVBQWU7QUFDakQsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVzs7O0FDUmdaLFNBQVMsc0JBQXNCOzs7QUNBamM7QUFBQSxFQUNFLGNBQWdCO0FBQUEsSUFDZCx5QkFBeUI7QUFBQSxJQUN6QixTQUFXO0FBQUEsSUFDWCxRQUFVO0FBQUEsSUFDVixPQUFTO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGFBQWU7QUFBQSxFQUNmLGlCQUFtQjtBQUFBLElBQ2pCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLGlDQUFpQztBQUFBLElBQ2pDLGVBQWU7QUFBQSxJQUNmLG9DQUFvQztBQUFBLElBQ3BDLDZCQUE2QjtBQUFBLElBQzdCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWdCO0FBQUEsSUFDaEIsUUFBVTtBQUFBLElBQ1YsMEJBQTBCO0FBQUEsSUFDMUIscUJBQXFCO0FBQUEsSUFDckIsU0FBVztBQUFBLElBQ1gsVUFBWTtBQUFBLElBQ1osK0JBQStC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
