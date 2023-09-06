import NProgress from "nprogress";
import "nprogress/nprogress.css";
/**
 * 进度条配置
 * @param {Number} easing 动画方式
 * @param {Number} speed 递增进度条的速度
 * @param {Boolean} showSpinner 是否显示加载ico
 * @param {Number} trickleSpeed 自动递增间隔
 * @param {Number} minimum 初始化时的最小百分比
 */
NProgress.configure({
  easing: "ease", // 动画方式   例如: ease、linear、ease-in、ease-out、ease-in-out
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});

export default NProgress;
