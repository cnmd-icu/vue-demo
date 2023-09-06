import { PluginOption } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import viteCompression from "vite-plugin-compression";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
/**自动导入 */
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {setPreLoadFile} from "./setPreLoadFils";
// import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/resolver';
/**
 * 打包CDN配置
 * @description 用于打包时，将依赖的第三方包通过 CDN 引入，减少打包后的体积
 * @description 与AutoImport插件可能会有冲突，如果出现冲突，可以将AutoImport插件的配置项中的imports字段中的vue去掉
 * @url 参考地址：https://blog.csdn.net/qq_34450741/article/details/129766676
 */
import { buildConfig } from "./cdnConfig";
/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_TITLE, VITE_REPORT, VITE_PWA, VITE_OPEN_CDN,VITE_IS_PRELOAD } = viteEnv;
  return [
    vue(),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      inject: {
        data: { title: VITE_TITLE }
      }
    }),
    // 自动导入
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router"],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox...
        ElementPlusResolver()
      ],
      eslintrc: {
        enabled: true, // 是否开启 eslint 检测，默认为 true
        filepath: "./src/eslintrc-auto-import.json" // eslint 配置文件路径
      },
      // 配置文件生成位置，默认是根目录 /auto-imports.d.ts
      dts: "./src/auto-imports.d.ts"
    }),
    Components({
      // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
      extensions: ["vue", "vue-router"],
      // 解析的 UI 组件库，这里以 Element Plus 为例
      resolvers: [ElementPlusResolver()],
      // 遍历子目录
      deep: true,
      // 配置文件生成位置，默认是根目录 /components.d.ts
      dts: "./src/components.d.ts"
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ filename: "dist/stats.html", gzipSize: true, brotliSize: true }) as PluginOption),
       // 是否开启 CDN
    VITE_OPEN_CDN ? buildConfig.cdn() : null,
    // 开发模式，从缓存预加载文件
    VITE_IS_PRELOAD && setPreLoadFile({
      pathList: [ // 需要提前加载的资源目录
        './src/assets/',
      ],
      preFix: '.', // 根目录
    })
  ];
};
/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins: PluginOption[] = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: VITE_TITLE,
      short_name: VITE_TITLE,
      theme_color: "#ffffff",
      icons: [
        {
          src: "assets/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "assets/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "assets/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  });
};
