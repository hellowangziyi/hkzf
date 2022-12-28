import React from "react";
import { Flex } from "antd-mobile-v2";
import SearchHeader from "../../components/SearchHeader";
import "./index.scss";
import Filter from "./components/Filter";
import { API } from "../../utils/api";

const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));

export default class List extends React.Component {
  state = {
    list: [],
    count: 0,
  };
  // 初始化实例属性
  filter = {};

  componentDidMount() {
    this.searchHouseList();
  }
  handleFilterChange = (filter) => {
    this.filter = filter;
    this.searchHouseList();
  };
  searchHouseList = async () => {
    const res = await API.get("/houses", {
      params: {
        cityId: value,
        ...this.filter,
        start: 1,
        end: 20,
      },
    });
    const { list, count } = res.body;
    this.setState({
      list: list,
      count: count,
    });
    console.log("res", res);
  };
  render() {
    const cityName = label;
    return (
      <div>
        <Flex className="header">
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.go(-1)}
          ></i>
          <SearchHeader
            cityName={cityName}
            className="listSearch"
          ></SearchHeader>
        </Flex>
        {/* 筛选框*/}
        <div className="filter_list">
          <Filter handleFilterChange={this.handleFilterChange} />
        </div>
      </div>
    );
  }
}
