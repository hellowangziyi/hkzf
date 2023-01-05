import axios from "axios";
import { BASE_URL } from "./url";
import { getToken, removeToken } from "./auth";
// 创建axios实例
const API = axios.create({
  baseURL: BASE_URL,
});
// 请求拦截器
API.interceptors.request.use((config) => {
  console.log("config", config);
  const { url } = config;
  if (
    url.startsWith("/user") &&
    !url.startsWith("/user/login") &&
    !url.startsWith("/user/registered")
  ) {
    config.headers.authorization = getToken();
  }
  return config;
});
// 响应拦截器
API.interceptors.response.use((response) => {
  console.log("response", response);
  if (response.data.status === 400) {
    removeToken();
  }
  return response;
});

export { API };
