<script setup lang="ts" name="right-bottom">
import { graphic } from "echarts";
import { ref, onMounted } from "vue";
let salvProName = ["留置", "冻结", "搜查", "封存", "扣押", "调查", "限制出境", "通缉"];
let salvProValue = [20, 20, 30, 40, 30, 20, 40, 55];
// let salvProMax: any = []; //背景按最大值
const option = ref({});
const setOption = async () => {
  // 对 salvProValue 数组进行排序，并反转顺序
  //   salvProValue = reverse(salvProValue);
  option.value = {
    grid: {
      left: "0%",
      right: "9%",
      bottom: "3%",
      top: "6%",
      containLabel: true
    },
    tooltip: {
      trigger: "axis", //触发类型
      axisPointer: {
        //坐标轴指示器
        type: "none"
      },
      formatter: function (params: any) {
        return params[0].name + " : " + params[0].value;
      }
    },
    xAxis: {
      show: false,
      type: "value"
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 16,
            margin: 20
          }
        },
        splitLine: {
          //分割线
          show: false
        },
        axisTick: {
          //刻度线
          show: false
        },
        axisLine: {
          //坐标轴线
          show: false
        },
        data: salvProName
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          textStyle: {
            color: "#ffffff",
            fontSize: "16"
          }
        },
        data: salvProValue
      }
    ],

    series: [
      {
        name: "值",
        type: "bar",
        zlevel: 1, //层级
        showBackground: true,
        backgroundStyle: {
          color: "#00000056",
          borderRadius: [0, 30, 30, 0]
        },
        itemStyle: {
          // barBorderRadius: [0, 30, 30, 0],
          color: new graphic.LinearGradient(0, 1, 1, 0, [
            {
              offset: 0,
              color: "#74F7FF00"
            },
            {
              offset: 1,
              color: "#007cff"
            }
          ])
        },
        barWidth: 15,
        //第一个柱子的的颜色是黑色
        data: salvProValue.map((item, index) => {
          if (index === 0) {
            return {
              value: item,
              itemStyle: {
                color: new graphic.LinearGradient(0, 1, 1, 0, [
                  {
                    offset: 0,
                    color: "#74F7FF00"
                  },
                  {
                    offset: 1,
                    color: "#52F7AC"
                  }
                ])
              }
            };
          } else {
            return item;
          }
        })
      },
      {
        name: "小圈圈",
        type: "scatter",
        emphasis: {
          scale: false
        },
        symbol:
          "image://data:image/png;base64,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",
        symbolSize: [26, 26],
        itemStyle: {
          color: "#007cff00",
          shadowColor: "rgba(0, 255, 254, 0.53)",
          shadowBlur: 5,
          borderWidth: 1,
          opacity: 1
        },
        z: 2,
        zlevel: 10,
        data: salvProValue.map((item, index) => {
          if (index === 0) {
            return {
              value: item,
              itemStyle: {
                color: "#52F7AC",
                shadowColor: "rgba(0, 255, 254, 0.53)",
                shadowBlur: 5,
                borderWidth: 1,
                opacity: 1
              }
            };
          } else {
            return item;
          }
        }),
        animationDelay: 500
      }
    ]
  };
};
onMounted(() => {
  setOption();
});
</script>

<template>
  <base-echart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" style="height: 100%" />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
