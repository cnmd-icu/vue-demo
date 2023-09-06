<template>
  <base-echart v-if="JSON.stringify(option) != '{}'" :option="option" class="chart"/>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
const option = ref({});
const Data = [
  {
    name: "问题线索数",
    value: 25
  },
  {
    name: "被反映人人数",
    value: 25
  },
  {
    name: "党纪处分数",
    value: 25
  },
  {
    name: "移送司法数",
    value: 35
  }
] as any;

const colorList = ["#FF3639", "#1EE7E7", "#1890FF","#F6DA1D"];
const jiashuju = {
  value: 2, // 圆弧与圆弧之间的间距
  name: '',
  itemStyle: {
    color: "rgba(255,255,255,0)"
  }
}
const pieData = [] as any;

for (let i = 0; i < Data.length; i++) {
  pieData.push({
    ...Data[i],
    itemStyle: {
      color: colorList[i]
    }
  });
  pieData.push(jiashuju);
}

const setOption = () => {
  option.value = {
    title: [{
      top: '40%',
      left: '21%',
      text: '1820',
      textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontWize: 900,
        fontSize: 30
      }
    }, {
      top: '53.5%',
      left: '23.5%',
      text: '问题数',
      textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontWize: 700,
        fontSize: 16
      }
    }],
    grid: {
      width: '100%',
      height: '100%',
    },
    legend: {
      show: true,
      top: "middle", //图例组件离容器上侧的距离。[ default: auto ]
      left: "55%",
      icon: `path://M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z`,
      itemWidth: 15, //图例标记的图形宽度。[ default: 25 ]
      itemHeight: 15, //图例标记的图形高度。[ default: 14 ]
      itemGap: 40, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ]
      data: Data.map(item => item.name),
      textStyle: {
        color: '#fff',
        rich: {
          uname: {
            width: 100,
            fontSize: 14,
          },
          unum: {
            color: '#fff',
            width: 20,
            fontSize: 16,
            // align: 'right'
          }
        }
      },
      formatter(name) {
        return `{uname|${name}}{unum|${Data.find(item => item.name === name).value}}`
      }
    },
    series: [
      {
        type: 'liquidFill',
        radius: '56%',
        center: ["30%", "50%"], //圆心位置
        data: [0.8],
        amplitude: '10%',// 振幅
        label: {
          show: false
        },
        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#1343B1"
          },
          {
            offset: 1,
            color: "#198FB1"
          }
        ])],
        backgroundStyle: {
          borderWidth: 0,
          borderColor: '#1789fb',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(19,67,177,0.30)"
            },
            {
              offset: 1,
              color: "rgba(25,143,177,0.30)"
            }
          ]),
        },
        outline: {
          itemStyle: {
            borderWidth: 5,
            borderHeight: 10,
            borderColor: '#027383',
            borderType: 'dashed',//虚线
          }
        },
      },
      {
        type: "pie",
        roundCap: false, //圆角
        radius: ["66%", "76%"], //内外圆半径
        center: ["30%", "50%"], //圆心位置
        hoverAnimation: false, //鼠标移入变大
        clockWise: false, //顺时针
        //两个环之间的间距
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderRadius: 50,
          borderWidth: 0, //设置border的宽度有多大
          borderColor: 'rgba(27,44,57,0)',//这里的颜色修改为背景颜色就行
        },
        data: pieData
      },
    ]
  };
};

onMounted(() => {
  setOption();
});
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>