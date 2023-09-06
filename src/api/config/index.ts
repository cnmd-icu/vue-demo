import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { LOGIN_URL } from "@/config";
import { ResultEnum } from "@/api/config/enums/httpEnum";
import { checkStatus } from "@/api/config/helper/checkStatus";
import { encrypt } from "@/api/config/utils/jsencrypt";
import { encryptBase64, encryptWithAes, generateAesKey } from "@/api/config/utils/crypto";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { Local } from "@/stores/utils";
import { ElMessage } from "element-plus";
import router from "@/router";
import qs from "qs";
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  isLoading?: boolean; // 是否显示全屏加载loading 默认不显示
  isEncrypt?: boolean; // 是否加密 默认不加密
  isToken?: boolean; // 是否需要token 默认需要
}

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  paramsSerializer: {
    serialize(params) {
      return qs.stringify(params, { allowDots: true });
    }
  } // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
});

// 添加请求拦截器
/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器(处理数据返回) -> [响应拦截器] -> 客户端
 */
service.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 当前请求不需要显示 loading，通过指定的第三个参数: { isLoading: false } 来控制
    !config.headers.isLoading || showFullScreenLoading();

    // 是否需要加密
    const isEncrypt = config.headers.isEncrypt || import.meta.env.VITE_IS_ENCRYPT;

    // 当开启参数加密
    if (isEncrypt === true && (config.method === "post" || config.method === "put")) {
      // 生成一个 AES 密钥
      const aesKey = generateAesKey();
      config.headers["encrypt-key"] = encrypt(encryptBase64(aesKey));
      config.data =
        typeof config.data === "object"
          ? encryptWithAes(JSON.stringify(config.data), aesKey)
          : encryptWithAes(config.data, aesKey);
    }
    // FormData数据去请求头Content-Type
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    tryHideFullScreenLoading();
    // 登陆失效
    // if (data.code === ResultEnum.OVERDUE) {
    if (Number(data.code) == Number(401)) {
      Local.clear(); //清除数据
      router.push(LOGIN_URL);
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
    if (data.code && data.code !== ResultEnum.SUCCESS) {
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
    return Promise.resolve(data);
  },
  async (error: AxiosError) => {
    const { response } = error;
    tryHideFullScreenLoading();
    // 请求超时 && 网络错误单独判断，没有 response
    if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
    if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
    // 根据服务器响应的错误状态码，做不同的处理
    if (response) checkStatus(response.status);
    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    if (!window.navigator.onLine) router.replace("/404");
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default service;
