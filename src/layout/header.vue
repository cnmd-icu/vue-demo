<script setup lang="ts">
import { reactive } from "vue";
import dayjs from "dayjs";
import type { DateDataType } from "./index.d";
// import { useSettingStore } from "@/stores/index";

const dateData = reactive<DateDataType>({
  dateYear: "",
  dateDay: "",
  timing: null
});

// const { setSettingShow } = useSettingStore();
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateYear = dayjs().format("YYYY年MM月DD日");
    dateData.dateDay = dayjs().format("hh : mm : ss");
  }, 1000);
};
timeFn();
</script>

<template>
  <div class="d-flex jc-center title_wrap">
    <div class="zuojuxing"></div>
    <div class="youjuxing"></div>
    <div class="guang"></div>
    <div class="nav_wrap">
      <div class="nav_btn">
        <router-link class="twinkle" to="/home">首页</router-link>
        <router-link class="twinkle" to="/demo">预览</router-link>
        <router-link class="twinkle" to="/read">分析</router-link>
        <router-link class="twinkle" to="/home">状态</router-link>
      </div>
      <div class="nav_title">
        <span class="title-text">大屏数据可视化平台</span>
      </div>
      <div class="nav_timers">
        <span class="year">{{ dateData.dateYear }}</span>
        <span class="day">{{ dateData.dateDay }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title_wrap {
  height: 60px;
  background-image: url("../assets/img/top.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url("../assets/img/guang.png");
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }

  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url("../assets/img/headers/juxing1.png");
  }

  .zuojuxing {
    left: 11%;
  }

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }
}

.nav_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.nav_btn {
  display: flex;
  padding: 0;
  margin-top: 20px;
  margin-left: 65px;
  cursor: pointer;
  a {
    transform: skew(10deg);
    width: 100%;
    height: 100%;
    border: 2px solid #286ae9;
    padding: 5px 10px;
    cursor: pointer;
    display: inline-block;
    margin-right: 20px;
    font-size: 26px;
    font-weight: 800;
    border-radius: 3px;
    box-sizing: border-box;
    text-decoration: none;
    color: #fff;
    &:hover {
      color: #5572b1;
    }
  }

  .twinkle {
    overflow: hidden;
    position: relative;
    color: #ffffff;
    transition: background-color 0.2s;
  }

  .twinkle::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 200%;
    background-color: rgb(255, 255, 255);
    transform: skew(45deg) translate3d(-200px, 0, 0);
  }

  .twinkle:hover {
    background-color: #2c3e50;
  }

  .twinkle:hover::before {
    transition: ease-in-out 0.5s;
    transform: skew(45deg) translate3d(300px, 0, 0);
  }
}

.nav_title {
  z-index: 0;
  position: absolute;
  left: 39%;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    width: 100%;
    background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.nav_timers {
  z-index: 0;
  position: absolute;
  right: 1%;
  font-size: 18px;
  font-weight: 900;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  text-shadow: 0px 0px 10px #fff;
}
</style>
