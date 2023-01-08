import { API } from "../api";

// 登录
export const login = (data) => {
  return API.post("/user/login", data);
};

// 获取登录用户信息
export const getUserInfo = () => {
  return API.get("/user");
};

// 退出登录
export const logout = () => {
  return API.post("/user/logout");
};

// 获取已发布房源
export const getUserHouse = () => {
  return API.get("/user/houses");
};

// 上传房源图片
export const uploadHouseImage = (data) => {
  return API.post("/user/image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 发布房源
export const pubHouse = (data) => {
  return API.post("/user/houses", data);
};
