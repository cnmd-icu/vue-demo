<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
const option = ref({});

//  数据配置
const source = [
  ["出入口", "入场", "离场", "黑名单车辆"],
  ["东出入口", 338, 110, 40],
  ["北出入口", 416, 145, 33]
];
const colorArr = ["#49CCFFee", "#20D3ABee", "#FDD56Aee"];
const colorAlpha = ["#49CCFF88", "#20D3AB88", "#FDD56A88"];
const piedata = [
  {
    name: "入场",
    value: 1834,
    itemStyle: {
      normal: {
        borderWidth: 5,
        shadowBlur: 20,
        borderColor: colorAlpha[0],
        shadowColor: colorArr[0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr[0]
          },
          {
            offset: 1,
            color: colorAlpha[0]
          }
        ])
      }
    }
  },
  {
    name: "离场",
    value: 325,
    itemStyle: {
      normal: {
        borderWidth: 5,
        shadowBlur: 20,
        borderColor: colorAlpha[1],
        shadowColor: colorArr[1],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr[1]
          },
          {
            offset: 1,
            color: colorAlpha[1]
          }
        ])
      }
    }
  },
  {
    name: "黑名单车辆",
    value: 123,
    itemStyle: {
      normal: {
        borderWidth: 5,
        shadowBlur: 20,
        borderColor: colorAlpha[2],
        shadowColor: colorArr[2],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr[2]
          },
          {
            offset: 1,
            color: colorAlpha[2]
          }
        ])
      }
    }
  }
];

// 图表配置
const setOption = () => {
  option.value = {
    dataset: {
      // 数据集
      source: source
    },
    grid: {
      left: "40%",
      right: 100 // 调整右边距，增加间距
    },
    legend: {
      show: true,
      left: 293,
      top: 45,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: "#fff",
        fontWeight: "bolder"
      }
    },
    color: colorArr,
    yAxis: {
      type: "category", // 类目轴
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        margin: 2,
        textStyle: {
          color: "#fff",
          fontSize: 12
        },
        // 调整左侧文字的3个属性，缺一不可
        verticalAlign: "bottom",
        align: "top",
        //调整文字上右下左
        padding: [10, 0, 10, 0]
      }
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: "bar", // 柱状图
        name: source[0][1],
        barWidth: 10, // 柱子宽度
        stack: true, // 堆叠
        encode: {
          // 数据映射
          y: 0,
          x: 1
        },
        itemStyle: {
          normal: {
            borderWidth: 2,
            shadowBlur: 20, // 阴影模糊
            borderColor: colorAlpha[0],
            shadowColor: colorArr[0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr[0]
              },
              {
                offset: 1,
                color: colorAlpha[0]
              }
            ])
          }
        },
        label: {
          normal: {
            show: true,
            color: "#fff",
            fontWeight: "bolder",
            position: "right"
          }
        }
      },
      {
        type: "pie", // 饼图
        z: 100,
        radius: ["30%", "20%"],
        center: ["20%", "50%"],
        data: piedata,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        label: {
          show: true,
          fontSize: 12,
          formatter: "{b}\n{c}辆",
          fontWeight: "bolder",
          color: "#fff"
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
<style lang="scss" scoped>
.chart {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>
