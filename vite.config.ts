import { resolve } from "path";
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { buildConfig } from "./build/cdnConfig";
import { wrapperEnv } from "./build/getEnv";
import { createProxy } from "./build/proxy";
import { createVitePlugins } from "./build/plugins";
import pkg from "./package.json";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

const viteConfig = defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(); // 获取当前工作目录
  const env = loadEnv(mode, root); // 获取环境变量
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      }
    },
    plugins: createVitePlugins(viteEnv),
    optimizeDeps: {
      exclude: ["vue-demi"]
    },
    server: {
      host: "0.0.0.0", // 主机名
      port: viteEnv.VITE_PORT, // 服务端口
      open: viteEnv.VITE_OPEN, // 自动打开浏览器
      cors: true, // 允许跨域
      proxy: createProxy(viteEnv.VITE_PROXY) // 代理
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [] // 去除 console.log
    },
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 1500, // 代码分割警告限制
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js", // 代码分割文件名
          entryFileNames: "assets/js/[name]-[hash].js", // 入口文件名
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]", // 静态资源文件名
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const moduleName = id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!
                .moduleName;
              return moduleName ?? "vender";
            }
          }
        },
        ...(JSON.parse(env.VITE_OPEN_CDN) ? { external: buildConfig.external } : {})
      }
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define: {
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
      __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
      __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
      __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
      __APP_INFO__: JSON.stringify(__APP_INFO__) // 应用信息
    }
  };
});

export default viteConfig;
