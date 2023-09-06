<script setup lang="ts">
import { ref, onMounted } from "vue";
import { graphic } from "echarts/core";
import request from "@/api/config";
import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  request("/bigscreen/leftTop", {}).then(res => {
    // eslint-disable-next-line no-console
    // console.log("报警次数 ", res);
    if (res.success) {
      setOption(res.data.dateList, res.data.numList, res.data.numList2);
    } else {
      ElMessage({
        message: res.msg,
        type: "warning"
      });
    }
  });
};
const setOption = async (xData: any[], yData: any[], yData2: any[]) => {
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
    yAxis: [
      {
        type: "value",
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
      }
    ],
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
      left: "5px",
      right: "5px",
      bottom: "10px",
      top: "20px",
      width: "90%",
      height: "80%",
      containLabel: true,
      borderColor: "#1F63A3"
    },
    series: [
      {
        data: yData2,
        type: "line",
        //smooth: true,//平滑曲线
        symbol: "none", //去除点
        name: "报警2次数",
        color: "rgba(9,202,243,.7)",
        lineStyle: {
          width: 5 // 设置线条粗细，可以根据需要调整数值
        },
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#44A4FF"
              },
              {
                offset: 1,
                color: "#44A4FF10"
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
  getData();
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
