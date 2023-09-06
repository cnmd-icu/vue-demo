<script setup lang="ts">
import { ref, onMounted } from "vue";
import "echarts-liquidfill";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return [
        {
          name: "当年新增总数",
          value: 0.2,
          color: ["#5E2DDC", "#8E87F1"]
        },
        {
          name: "当前待处置总数",
          value: 0.6,
          color: ["#89BAED", "#0053E0"]
        },
        {
          name: "当前在办总数",
          value: 0.1,
          color: ["#579BEA", "#5442E4"]
        },
        {
          name: "当年办结总数",
          value: 0.5,
          color: ["#01C8DC", "#006EC5"]
        }
      ];
    }
  }
});
const option = ref({});
const piedata = ref(props.data);
const titles = [] as any;
const series = [] as any;
piedata.value.map((item: any, index: number) => {
  titles.push({
    text: item.name,
    left: index * 25 + 12.5 + "%",
    top: "80%",
    textAlign: "center",
    textStyle: {
      fontWeight: "500",
      fontSize: 20,
      color: "#fff",
    }
  });
  series.push({
    type: "liquidFill",
    center: [index * 25 + 12.5 + "%", "40%"], // 水球图的位置
    radius: "60%", // 水球图的半径，数值越大水球越小
    backgroundStyle: {
      borderWidth: 0,
      color: "#ffffff00"
    },
    data: [item.value, item.value - 0.05],
    itemStyle: {
      color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
        {
          offset: 0,
          color: item.color[0]
        },
        {
          offset: 1,
          color: item.color[1] + "10"
        }
      ]),
      // opacity: 0.3,
      shadowColor: item.color[0],
      shadowBlur: 5, //阴影大小
      shadowOffsetY: 5, //阴影偏移
      shadowOffsetX: 0
    },
    label: {
      left: "center",
      top: "center",
      normal: {
        formatter: function (params: any) {
          return params.value * 100 + "";
        },
        textStyle: {
          fontSize: 40,
          color: "#ffffff22",
          shadowBlur: 0
        }
      }
    },
    outline: {
      show: true,
      borderDistance: 0, //内环padding值
      itemStyle: {
        borderColor: item.color[0],
        borderWidth: 2,
        shadowBlur: 0
      }
    }
  });
});
const setOption = async () => {
  option.value = {
    title: titles,
    series: series
  };
};
onMounted(() => {
  setOption();
}); // 挂载后执行
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
