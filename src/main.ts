import { createApp } from "vue";
import App from "@/App.vue";
import pina from "@/stores/pinia";
import router from "@/router";
import { registerEcharts } from "@/Hooks/echarts/exportEcharts";
import "default-passive-events"; //解决图表加载报警告问题，但是与编辑器和部分图标冲突
import "@/assets/css/style.scss";
import "element-plus/dist/index.css";
//不使用mock 请注释掉
import { mockXHR } from "@/api/mock/index";
mockXHR();

const app = createApp(App);
registerEcharts(app);
app.use(pina).use(router).mount("#app");
