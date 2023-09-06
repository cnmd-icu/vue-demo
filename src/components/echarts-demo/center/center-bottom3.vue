<script setup lang="ts">
import { graphic } from "echarts";
import { ref, onMounted } from "vue";

const option = ref({});
const setOption = async () => {
  option.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none"
      },
      formatter: function (params: any) {
        return params[0].name + ": " + params[0].value;
      }
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "10%",
      height: "70%",
      splitLine: {
        lineStyle: {
          type: "dashed" // 设置背景线为虚线
        }
      }
    },

    xAxis: {
      data: [
        "浦东新区",
        "徐汇区",
        "长宁区",
        "静安区",
        "黄浦区",
        "普陀区",
        "虹口区",
        "杨浦区",
        "闵行区",
        "宝山区",
        "嘉定区",
        "金山区",
        "松江区",
        "青浦区",
        "奉贤区",
        "崇明区"
      ],
      axisTick: { show: false },
      axisLine: { show: false },//坐标轴线
      axisLabel: {
        color: "#fff",
        rotate: "35",
        margin: 10,
        fontSize: 12
      }
    },
    yAxis: {
      // splitLine: { show: false },
      // axisTick: { show: false },
      // axisLine: { show: false },
      // axisLabel: { show: false }
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: ["#25CEF3"]
        }
      }
    },
    color: ["#2CFBF2"],
    series: [
      {
        name: "hill",
        type: "pictorialBar",
        symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
        itemStyle: {
          color: new graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#2952CB"
              },
              {
                offset: 0.8,
                color: "#2CFBF2"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        data: [1000, 2000, 3000, 4000, 5000, 6000,2500, 3000, 4000, 5000, 6000,2500, 3000, 4000, 5000, 6000],
        barWidth: 55, // 调整柱状图的宽度
        barCategoryGap: "50%" // 调整柱状图之间的间距
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
