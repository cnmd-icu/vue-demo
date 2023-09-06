<script setup lang="ts">
import { graphic } from "echarts";
import { ref, onMounted } from "vue";
let data = {
  categoryArr: [
    "干部监督室",
    "一室",
    "三室",
    "四室",
    "五室",
    "六室",
    "七室",
    "八室",
    "九室",
    "十室",
    "十一室",
    "十二室",
    "十三室",
    "十四室",
    "党风室"
  ],
  channelTime: [60, 20, 30, 40, 50, 60, 70, 80, 65, 60, 10, 20, 30, 40, 30]
};
const option = ref({});
const setOption = async () => {
  // 对 salvProValue 数组进行排序，并反转顺序
  //   salvProValue = reverse(salvProValue);
  option.value = option.value = {
    tooltip: { trigger: "axis" },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      top: "10%",
      width: "auto",
      containLabel: true
    },
    xAxis: [
      {
        type: "category", //类目轴
        axisLine: { lineStyle: { color: "#57617B" } }, //坐标轴轴线相关设置
        axisLabel: {
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          margin: 10, //刻度标签与轴线之间的距离
          textStyle: {
            fontSize: 11,
            color: "#fff"
          }
          // rotate: "45"
        },
        data: data.categoryArr
      }
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false
        },
        axisLine: { lineStyle: { color: "#57617B" } },
        axisLabel: {
          margin: 10,
          textStyle: { fontSize: 12, color: "#fff" },
          formatter: "{value}"
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: ["#25CEF3"]
          }
        }
      },
      {
        type: "value",
        axisTick: {
          show: false
        },
        axisLine: { lineStyle: { color: "#57617B" } },
        axisLabel: {
          margin: 10,
          textStyle: { fontSize: 12, color: "#fff" },
          formatter: "{value}"
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: "耗时",
        type: "bar",
        barWidth: 15,
        label: {
          normal: {
            show: true,
            lineHeight: 10,
            position: "top",
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          }
        },
        itemStyle: {
          barBorderRadius: [10, 10, 0, 0],
          color: new graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#009AFD"
              },
              {
                offset: 0.8,
                color: "#33DAFF"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        data: data.channelTime
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
