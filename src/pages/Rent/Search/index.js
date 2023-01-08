import React, { Component } from "react";
import { SearchBar } from "antd-mobile";

import { getCity } from "../../../utils/city";
import { getCommunity } from "../../../utils/api/city";

import "./index.scss";

class RentSearch extends Component {
  state = {
    // 搜索框的值
    searchTxt: "",
    tipsList: [],
  };
  // 获取城市ID
  cityId = getCity().value;
  componentDidMount() {}
  handlerSearch = (val) => {
    val = val.trim();
    if (val === "") {
      return this.setState({
        searchTxt: "",
        tipsList: [],
      });
    }
    this.setState(
      {
        searchTxt: val,
      },
      () => {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          // 获取小区列表
          const res = await getCommunity(val, this.cityId);
          console.log("res", res);
          if (res.status === 200) {
            this.setState({
              tipsList: res.data.body,
            });
          }
        }, 600);
      }
    );
  };
  renderTips = () => {
    const { tipsList } = this.state;
    console.log("this.state", this.state);
    console.log("tipsList", tipsList);
    return tipsList.map((item) => (
      <li
        onClick={() => this.selectCom(item)}
        key={item.community}
        className="tip"
      >
        {item.communityName}
      </li>
    ));
  };
  selectCom = (item) => {
    this.props.history.replace({
      pathname: "/rent/add",
      state: { id: item.community, name: item.communityName },
    });
  };
  render() {
    const { history } = this.props;
    const { searchTxt } = this.state;

    return (
      <div className="rent_sesrch">
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.handlerSearch}
          showCancelButton={true}
          onCancel={() => history.replace("/rent/add")}
        />

        {/* 搜索提示列表 */}
        <ul className="tips">{this.renderTips()}</ul>
      </div>
    );
  }
}

export default RentSearch;
