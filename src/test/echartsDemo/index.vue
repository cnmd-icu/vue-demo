<template>
  <div class="chart" ref="mapChartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import china from "@/components/echarts-demo/center/map/china.json";
const option = ref({});
const mapChartRef = ref<HTMLElement | null>(null);
const setOption = () => {
  const myChart = echarts.init(mapChartRef.value as HTMLDivElement);
  echarts.registerMap("中国", china as any);
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
          // 左边放的下
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
        fontSize: 13,
        color: "#fff"
      },
      backgroundColor: "rgba(0,2,89,0.8)",
      formatter: function (params: any) {
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
        map: "中国",
        aspectScale: 1,
        zoom: 0.65,//缩放
        layoutCenter: ["50%", "50%"],
        layoutSize: "180%",
        show: true,
        roam: false,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderColor: "#c0f3fb",
            borderWidth: 1,
            shadowColor: "#8cd3ef",
            shadowOffsetY: 10,
            shadowBlur: 120,
            areaColor: "transparent"
          }
        }
      },
      // 重影
      {
        type: "map",
        map: "中国",
        zlevel: -1,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "51%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            // borderColor:"rgba(17, 149, 216,0.6)",
            borderColor: "rgba(58,149,253,0.8)",
            shadowColor: "rgba(172, 122, 255,0.5)",
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: "rgba(5,21,35,0.1)"
          }
        }
      },
      {
        type: "map",
        map: "中国",
        zlevel: -2,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "52%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            // borderColor: "rgba(57, 132, 188,0.4)",
            borderColor: "rgba(58,149,253,0.6)",
            shadowColor: "rgba(65, 214, 255,1)",
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: "transpercent"
          }
        }
      },
      {
        type: "map",
        map: "中国",
        zlevel: -3,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "53%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            // borderColor: "rgba(11, 43, 97,0.8)",
            borderColor: "rgba(58,149,253,0.4)",
            shadowColor: "rgba(58,149,253,1)",
            shadowOffsetY: 15,
            shadowBlur: 10,
            areaColor: "transpercent"
          }
        }
      },
      {
        type: "map",
        map: "中国",
        zlevel: -4,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "54%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 5,
            // borderColor: "rgba(11, 43, 97,0.8)",
            borderColor: "rgba(5,9,57,0.8)",
            shadowColor: "rgba(29, 111, 165,0.8)",
            shadowOffsetY: 15,
            shadowBlur: 10,
            areaColor: "rgba(5,21,35,0.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "中国市数据",
        type: "map",
        map: "中国", // 自定义扩展图表类型
        aspectScale: 1,
        zoom: 0.65, // 缩放
        showLegendSymbol: true,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "120%"
            }
          },
          emphasis: {
            // show: false,
          }
        },
        itemStyle: {
          normal: {
            areaColor: {
              type: "linear",
              x: 1200,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(3,27,78,0.75)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(58,149,253,0.75)" // 50% 处的颜色
                }
              ],
              global: true // 缺省为 false
            },
            borderColor: "#fff",
            borderWidth: 0.2
          },
          emphasis: {
            show: false,
            color: "#fff",
            areaColor: "rgba(0,254,233,0.6)"
          }
        },
        layoutCenter: ["50%", "50%"],
        layoutSize: "180%",
        markPoint: {
          symbol: "none"
        }
      }
    ]
  };
  myChart.setOption(option.value);
  
  let index = 0; //播放所在下标
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
    clearInterval(showTip);
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: params.dataIndex
    });
  });

  myChart.on("mouseout", function (params) {
    // eslint-disable-next-line no-console
    console.log(params);
    showTip && clearInterval(showTip);
    showTip = setInterval(function () {
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
  width: 99vh;
  height: 99vh;
}
</style>
