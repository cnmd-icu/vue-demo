import ECharts from "vue-echarts";
import { use } from "echarts/core";
import 'echarts-liquidfill';
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PieChart, MapChart, EffectScatterChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
  MarkPointComponent,
} from "echarts/components";

use([
  CanvasRenderer, //Canvas渲染器
  BarChart, //柱状图
  PieChart, //饼图
  MapChart, //地图
  EffectScatterChart, //涟漪散点图
  LineChart, //折线图
  GridComponent, //直角坐标系
  LegendComponent, //图例组件
  TooltipComponent, //提示框组件
  TitleComponent, //标题组件
  DatasetComponent, //数据集组件
  VisualMapComponent, //视觉映射组件
  GeoComponent, //地理坐标系组件
  MarkPointComponent, // 标注组件
]);

export const registerEcharts = (app: any) => {
  app.component("base-echart", ECharts);
};