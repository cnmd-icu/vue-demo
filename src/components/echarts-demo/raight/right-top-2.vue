<template>
  <base-echart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<script setup>
// import * as echarts from "echarts";
const option = ref({});
let series = [];
let pieDatas = [
  {
    value: 75,
    name: "留置"
  },
  {
    value: 65,
    name: "技术调查"
  },
  {
    value: 50,
    name: "限制出境"
  }
];
let maxRadius = 80,
  barWidth = 10,
  barGap = 10;

let barColor = ["#0179FF", "#FF3639", "#F6DA1D"];

pieDatas.map((item, i) => {
  series.push({
    type: "pie",
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    radius: [maxRadius - i * (barGap + barWidth) + "%", maxRadius - (i + 1) * barWidth - i * barGap + "%"],
    center: ["30%", "50%"],
    label: {
      show: false
    },
    itemStyle: {
      borderRadius: 100,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      borderWidth: 5
    },
    data: [
      {
        value: item.value,
        name: item.name,
        itemStyle: {
          color: barColor[i]
        }
      },
      {
        value: 100 - item.value,
        name: "",
        itemStyle: {
          color: "transparent"
        },
        tooltip: {
          show: false
        },
        hoverAnimation: false
      }
    ]
  });
  series.push({
    name: "",
    type: "pie",
    silent: true,
    z: 0,
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    radius: [maxRadius - i * (barGap + barWidth) + "%", maxRadius - (i + 1) * barWidth - i * barGap + "%"],
    center: ["30%", "50%"],
    label: {
      show: false
    },
    itemStyle: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    },
    data: [
      {
        value: 1,
        itemStyle: {
          color: "#072057"
        },
        tooltip: {
          show: false
        },
        hoverAnimation: false
      }
    ]
  });
});
const setOption = () => {
  option.value = {
  
    backgroundColor: "transparent",
    tooltip: {
      show: false
    },
    xAxis: [
      {
        show: false
      }
    ],
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          inside: true,
          textStyle: {
            color: "#fff",
            fontSize: 14
          },
          show: false
        },
        data: pieDatas.map(x => x.value + "%")
      }
    ],
    legend: {
      show: true,
      top: "middle", //图例组件离容器上侧的距离。[ default: auto ]
      left: "60%",
      icon: `path://M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z`,
      itemWidth: 15, //图例标记的图形宽度。[ default: 25 ]
      itemHeight: 15, //图例标记的图形高度。[ default: 14 ]
      itemGap: 40, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ]
      formatter: function (name) {
        let res = pieDatas.filter(n => n.name === name);
        return `${name}           ${res[0]?.value}`;
      },
      textStyle: {
        fontSize: 14,
        color: "#fff",
        padding: [0, 0, 0, 8]
      }
    },
    series: series
  };
};

onMounted(() => {
  setOption();
});
</script>
<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
