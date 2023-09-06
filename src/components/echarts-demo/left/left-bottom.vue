<template>
  <div class="btn">
    <input type="text" v-model="barData[0]" style=" width: 100px;" />
    <input type="text" v-model="autoOption.time" style=" width: 100px;" />
    <button @click="editOption">切换数据</button>
    <button @click="redOption">{{ autoOption.open ? "停止" : "开始" }}切换数据</button>
  </div>
  <base-echart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// import * as echarts from "echarts";
const option = ref({});
const barData = ["测试一", "测试一二", "测试一二三", "测试一二三四", "测试一二三四五"];
const barDatas = ref([24, 54, 54, 45, 34]);
const autoOption = reactive({
  open: false,
  time: 1000,
  timer: null as any
});

const redOption = () => {
  autoOption.open = !autoOption.open;
  if (autoOption.open) {
    autoOption.timer = setInterval(() => {
      editOption();
    }, autoOption.time);
  } else {
    clearInterval(autoOption.timer);
  }
};

const editOption = () => {
  for (let i = 0; i < barDatas.value.length; i++) {
    barDatas.value[i] = Math.floor(Math.random() * 100);
  }
};
const setOption = () => {
  option.value = {
    grid: {
      containLabel: true,
      width: "100%",
      height: "80%",
      top: 20,
      left: 0,
      bottom: 40
    },
    xAxis: {
      axisLabel: {
        overflow: "breakAll",
        width: 80,
        interval: 0,
        textStyle: {
          color: "#C5DFFB",
          fontWeight: 500,
          fontSize: "13",
          lineHeight: 14
        }
      },
      axisTick: {
        lineStyle: {
          color: "#384267"
        },
        show: true
      },
      splitLine: {
        show: false
      },
      axisLine: {
        //坐标轴
        lineStyle: {
          color: "#384267",
          width: 1,
          type: "dashed"
        },
        show: true
      },
      data: barData,
      type: "category"
    },
    yAxis: {
      axisLabel: {
        color: "#c0c3cd",
        fontSize: 12
        //换行
      },
      axisTick: {
        //刻度线
        lineStyle: {
          color: "#384267",
          width: 1
        },
        show: true
      },
      splitLine: {
        //网格线
        show: true,
        lineStyle: {
          color: "#384267",
          opacity: 0.2
        }
      },
      axisLine: {
        //坐标轴
        lineStyle: {
          color: "#384267",
          width: 1,
          type: "dashed"
        },
        show: false
      },
      name: ""
    },
    series: [
      {
        data: barDatas.value,
        type: "bar",
        barMaxWidth: "auto",
        barWidth: 20,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: "#009BFB"
              },
              {
                offset: 1,
                color: "#63caff"
              }
            ]
          }
        },
        label: {
          show: true,
          position: "top",
          distance: 10,
          color: "#fff"
        }
      },
      {
        data: [80, 80, 80, 80, 80],
        type: "bar",
        barMaxWidth: "auto",
        barWidth: 20,
        barGap: "-100%",
        color: "#009BFB20",
        opacity: 0.2,
        zlevel: -1
      }
    ]
  };
};

onMounted(() => {
  setOption();
});
</script>
<style scoped lang="scss">
.btn {
  display: flex;
  justify-content: flex-start;
  height: fit-content;
  align-items: center;
  input{
    height: 26px;
    font-size: 10px;
    text-align: center;
    border-radius: 5px;
    margin-left: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color:#ffffff00;
    border-radius: 2px;
    color: #fff;
  }
  button {
    width: fit-content;
    height: 26px;
    font-size: 10px;
    text-align: center;
    border-radius: 5px;
    margin-left: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color:#ffffff00;
    border: 1px solid rgba(18, 55, 112, 1);
    border-radius: 2px;
    color: #fff;
    &:hover {
      background-image: linear-gradient(270deg, #103470 0%, rgba(9, 32, 70, 0) 49%, #103470 100%);
    }
  }
}
.chart {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
