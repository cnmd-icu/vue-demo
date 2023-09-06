<script setup lang="ts">
import { ref, onMounted } from "vue";
import { graphic } from "echarts/core";

const option = ref({});
const xData = ["检举控告", "业务范围外", "批评建议", "申诉"];
const yData = [50, 45, 25, 35];

const setOption = async () => {
  option.value = {
    xAxis: [
      {
        type: "category",
        data: xData,
        boundaryGap: false, // 不留白，从原点开始
        axisLine: { lineStyle: { color: "#57617B" } }, //坐标轴轴线相关设置
        axisLabel: {
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          margin: 20, //刻度标签与轴线之间的距离
          textStyle: {
            fontSize: 15,
            color: "#fff"
          }
          // rotate: "45"
        },
        axisPointer: {
          show: true,
          type: "none"
        }
      }
    ],
    yAxis: {
      type: "value",
      splitNumber: 4,
      axisTick: {
        show: false
      },
      axisLine: { lineStyle: { color: "#57617B" } },
      axisLabel: {
        //y轴刻度
        margin: 10,
        textStyle: { fontSize: 12, color: "#fff" },
        formatter: "{value}"
      },
      splitLine: {
        //y轴分割线
        show: true,
        lineStyle: {
          //分割线颜色
          type: "dashed",
          color: ["#25CEF3"],
          opacity: 0.2
        }
      }
    },
    tooltip: {
      //提示框
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF"
      }
    },
    grid: {
      //布局
      smooth: true, //平滑曲线
      left: "5px",
      right: "5px",
      bottom: "10px",
      top: "32px",
      width: "92%",
      height: "80%",
      containLabel: true,
      borderColor: "#1F63A3"
    },
    series: [
      {
        name: "报警次数",
        data: yData, //数据
        type: "line", //折线图
        smooth: true, //平滑曲线
        symbol: "none", //去除点
        color: "#FFC577",
        lineStyle: {
          width: 4 // 设置线条粗细，可以根据需要调整数值
        },
        areaStyle: {
          color: new graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#FFC577"
              },
              {
                offset: 1,
                color: "#FFC57710"
              }
            ],
            false
          )
        }
      }
    ]
  };
};
onMounted(() => {
  setOption();
});
</script>

<template>
  <base-echart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
