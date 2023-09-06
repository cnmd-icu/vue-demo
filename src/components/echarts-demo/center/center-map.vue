<template>
  <div class="chart" ref="mapChartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import china from "@/components/echarts-demo/center/map/321100.json";
const option = ref({});
const mapChartRef = ref<HTMLElement | null>(null);

const publicData = {
  aspectScale: 1, //长宽比. default: 0.75
  zoom: 1, //缩放
  layoutSize: "100%",
  show: true, //是否显示地图组件
  roam: false, //是否开启鼠标缩放和平移漫游
};

const setOption = () => {
  const myChart = echarts.init(mapChartRef.value as HTMLDivElement);
  echarts.registerMap("句容", china as any);
  option.value = {
    tooltip: {
      trigger: "item",
      position: function (point: any[], params: any, dom: any, rect: any, size: { contentSize: any[] }) {
        let x = 0; // x坐标位置
        let y = 0; // y坐标位置
        // 当前鼠标位置
        let pointX = point[0];
        let pointY = point[1];
        // 提示框大小
        let boxWidth = size.contentSize[0];
        let boxHeight = size.contentSize[1];

        // boxWidth > pointX 说明鼠标左边放不下提示框
        if (boxWidth > pointX) {
          x = pointX + 10;
        } else {
          // 左边放得下
          x = pointX - boxWidth - 10;
        }
        // boxHeight > pointY 说明鼠标上边放不下提示框
        if (boxHeight > pointY) {
          y = 5;
        } else {
          // 上边放得下
          y = pointY - boxHeight;
        }
        return [x, y];
      },
      show: true,
      enterable: true,
      textStyle: {
        fontSize: 18,
        color: "#fff"
      },
      backgroundColor: "#ffffff00",
      borderWidth: 0,
      padding: 0,
      formatter: function (params) {
        let tipHtml = "";
        tipHtml = `
                <div class="ui-map-img">
                    <div class='ui-maptxt'>${params.name}</div>
                    <div class='ui-mapNum'>标段数:${params.dataIndex}</div>
                    <div class='ui-mapNum'>项目数:${params.dataIndex}</div>
                </div>
            `;
        return tipHtml;
      }
    },
    geo: [
      {
        type: "map",
        map: "句容",
        layoutCenter: ["50%", "50%"],
        ...publicData,
        label: {
          emphasis: {
            show: false
          },
          textStyle: {
            color: "#fff",
            fontSize: "120%"
          }
        },
        itemStyle: {
          borderColor: "#c0f3fb",
          borderWidth: 1,
          shadowColor: "#8cd3ef",
          shadowOffsetY: 10,
          shadowBlur: 120,
          areaColor: "transparent"
        }
      },
      // 重影
      {
        type: "map",
        map: "句容",
        zlevel: -1,
        ...publicData,
        layoutCenter: ["50%", "51%"],
        roam: false,
        silent: true, //鼠标悬停事件  true为不触发
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(58,149,253,0.8)",
          shadowColor: "rgba(172, 122, 255,0.5)",
          shadowOffsetY: 5,
          shadowBlur: 15,
          areaColor: "rgba(5,21,35,0.1)"
        }
      },
      {
        type: "map",
        map: "句容",
        zlevel: -2,
        layoutCenter: ["50%", "52%"],
        ...publicData,
        silent: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(58,149,253,0.6)",
          shadowColor: "rgba(65, 214, 255,1)",
          shadowOffsetY: 5,
          shadowBlur: 15,
          areaColor: "transpercent"
        }
      },
      {
        type: "map",
        map: "句容",
        zlevel: -3,
        layoutCenter: ["50%", "53%"],
        ...publicData,
        silent: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(58,149,253,0.4)",
          shadowColor: "rgba(58,149,253,1)",
          shadowOffsetY: 15,
          shadowBlur: 10,
          areaColor: "transpercent"
        }
      },
      {
        type: "map",
        map: "句容",
        zlevel: -4,
        layoutCenter: ["50%", "54%"],
        ...publicData,
        silent: true,
        itemStyle: {
          borderWidth: 5,
          borderColor: "rgba(5,9,57,0.8)",
          shadowColor: "rgba(29, 111, 165,0.8)",
          shadowOffsetY: 15,
          shadowBlur: 10,
          areaColor: "rgba(5,21,35,0.1)"
        }
      }
    ],
    series: [
      {
        name: "句容市数据",
        type: "map",
        map: "句容",
        showLegendSymbol: true,
        layoutCenter: ["50%", "50%"],
        ...publicData,
        markPoint: {
          symbol: "none"
        },
        label: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: "120%"
          }
        },
        itemStyle: {
          areaColor: {
            type: "linear",
            x: 1200,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgba(3,27,78,0.75)"
              },
              {
                offset: 1,
                color: "rgba(58,149,253,0.75)"
              }
            ],
            global: true // 缺省为 false
          },
          borderColor: "#fff",
          borderWidth: 0.2
        }
      }
    ]
  };

  myChart.setOption(option.value);

  let index = 0;
  let showTip = setInterval(function () {
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index
    });
    index++;
    if (index >= 14) {
      index = 0;
    }
  }, 2000);

  myChart.on("mouseover", function (params) {
    clearInterval(showTip);//清除定时器
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: params.dataIndex
    });
  });

  //如果被点击
  myChart.on("click", function (params) {
    // eslint-disable-next-line no-console
    console.log(params);
  });
};

onMounted(() => {
  nextTick(() => {
    setOption();
  });
});
</script>
<style lang="scss" scoped>
.chart {
  min-width: 600px;
  min-height: 600px;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}
:deep(.ui-map-img){
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  text-align: center;
  background: #080b1840;
  backdrop-filter: blur(10px);
}
</style>
