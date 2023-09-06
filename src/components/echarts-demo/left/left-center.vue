<script setup lang="ts">
import { ref, onMounted } from "vue";

import * as echarts from "echarts";
import icon19 from "@/assets/img/icon19.png";

const option = ref({});
const titleData = {
  titleTop: "1569",
  titleBottom: "三个三"
};
const chartData = [
  { value: 10, name: "测试一" },
  { value: 10, name: "测试一二" },
  { value: 15, name: "测试一二三" },
  { value: 20, name: "测试一二三四" },
  { value: 25, name: "测试一二三四五" },
];
const colorList = ["#FF3639", "#F6DA1D", "#BAE7FF", "#1EE7E7", "#477DF6"];
const pieData1 = [] as any;
const pieData2 = [] as any;
const jiashuju = {
  value: 1, // 圆弧与圆弧之间的间距
  name: "",
  itemStyle: {
    color: "rgba(255,255,255,0)"
  }
};
for (let i = 0; i < chartData.length; i++) {
  pieData1.push({
    ...chartData[i],
    itemStyle: {
      borderRadius: 2,
      shadowColor: colorList[i],
      shadowBlur: 3, //阴影大小
      shadowOffsetY: 0,
      shadowOffsetX: 0,
      borderColor: "rgba(255,255,255,0)",
      borderWidth: 2
    }
  });
  pieData1.push(jiashuju);
  pieData2.push({
    ...chartData[i],
    itemStyle: {
      borderColor: "rgba(255,255,255,0)",
      borderWidth: 2,
      borderRadius: 0,
      color: colorList[i],
      opacity: 0.3,
      shadowColor: "#000",
      shadowBlur: 1, //阴影大小
      shadowOffsetY: 5, //阴影偏移
      shadowOffsetX: 0
    }
  });
  pieData2.push(jiashuju);
}

const setOption = () => {
  option.value = {
    dataset: {
      source: chartData
    },
    title: [
      {
        text: titleData.titleTop,
        left: "49%",
        top: "40%",
        textAlign: "center",
        textStyle: {
          fontSize: "28",
          fontWeight: "900",
          color: "#2668ed",
          textAlign: "center",
          fontFamily: "Microsoft YaHei"
        }
      },
      {
        text: titleData.titleBottom,
        left: "49%",
        top: "53%",
        textAlign: "center",
        textStyle: {
          fontSize: "18",
          fontWeight: "900",
          color: "#fff",
          textAlign: "center"
        }
      }
    ],
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: icon19,
            width: 200,
            height: 68
          },
          left: "5%",
          top: "70%"
        }
      ]
    },
    color: colorList,
    series: [
      {
        type: "pie",
        z: 3, //层级
        roundCap: false, //圆角
        radius: ["63%", "58%"], //内外圆半径
        center: ["50%", "50%"], //圆心位置
        hoverAnimation: false, //鼠标移入变大
        layoutSize: "160%", //地图大小
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: pieData1
      },
      {
        type: "pie",
        z: 2,
        roundCap: false, //圆角
        radius: ["69%", "48%"], //内外圆半径
        center: ["50%", "50%"], //圆心位置
        hoverAnimation: false, //鼠标移入变大
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: pieData2
      },
      {
        //背景阴影
        type: "pie",
        z: 1,
        roundCap: false, //圆角
        radius: ["80%", "50%"], //内外圆半径
        center: ["50%", "50%"], //圆心位置
        hoverAnimation: false, //鼠标移入变大
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 30,
            name: "",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                { offset: 0, color: "#175DDF00" },
                { offset: 1, color: "#175DDF33" }
              ])
            }
          },
          {
            value: 40,
            name: "",
            itemStyle: {
              color: "#00000000"
            }
          },
          {
            value: 30,
            name: "",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                { offset: 0, color: "#175DDF00" },
                { offset: 1, color: "#175DDF33" }
              ])
            }
          },
          {
            value: 20,
            name: "",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                { offset: 0, color: "#175DDF00" },
                { offset: 1, color: "#175DDF33" }
              ])
            }
          },
          {
            value: 10,
            name: "",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                { offset: 0, color: "#175DDF00" },
                { offset: 1, color: "#175DDF33" }
              ])
            }
          }
        ]
      }
    ]
  };
};

onMounted(() => {
  setOption();
});
</script>
<template>
  <div class="contetn_left-center">
    <base-echart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
    <div class="left-center-option">
      <div class="left-center-option-item" v-for="(item, index) in chartData" :key="index">
        <p>
          <span class="item-text"
            >{{ item.name }}
            <strong>{{ item.value }}%</strong>
          </span>
          <span class="item-num">{{ item.value }}</span>
        </p>
        <p>
          <span class="item-color" :style="{ background: colorList[index],width:item.value+'%' }" />
          <span class="item" :style="{ background: colorList[index] }" />
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contetn_left-center {
  display: flex;
  height: 100%;
  align-items: center;
}
.chart {
  width: 50%;
  height: 100%;
}
.left-center-option {
  display: flex;
  flex-direction: column;
  width: 46%;
  .left-center-option-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 4px 0px;
    p {
      justify-content: space-between;
      margin: 1px;
      width: 100%;
      display: flex;
      .item-text {
        font-size: 10px;
        color: #fff;
        margin: 0;
      }
      .item-num {
        font-size: 18px;
        color: #fff;
        font-weight: 900;
        margin-right: 12px;
      }
      .item-color {
        width: 20px;
        height: 5px;
        border-radius: 3px;
        margin-right: 5px;
        margin-top: 0;
      }
      .item {
        width: 100%;
        height: 5px;
        border-radius: 5px;
        margin-right: 10px;
        opacity: 0.2;
      }
    }
  }
}
</style>
