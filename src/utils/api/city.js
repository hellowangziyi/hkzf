/**
 * 城市信息
 */
import { API } from "../api";

// 获取当前城市信息
export const getCityInfo = (cityName) => {
  return API.get(`/area/info?name=${cityName}`);
};

// 获取城市列表数据
export const getCities = (level = 1) => {
  return API.get(`/area/city?level=${level}`);
};

// 获取热门城市
export const getHotCities = () => {
  return API.get(`/area/hot`);
};

// 小区关键词查询
export const getCommunity = (name, id) => {
  return API.get(`/area/community`, {
    params: {
      name,
      id,
    },
  });
};

// 获取地图区域房源信息
export const getMapHouses = (id) => {
  return API.get(`/area/map?id=${id}`);
};
