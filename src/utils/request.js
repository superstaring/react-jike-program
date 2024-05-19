// axios的封装处理
import axios from "axios";
import { getToken } from "./token";

const request = axios.create({
  baseURL: "/", // 根域名配置
  timeout: 5000, // 超时时间
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 操作config注入token数据
    // 1.获取到token（在本地获取到）；2.按照后端的格式要求做token拼接
    const token = getToken() || "token";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { request };
