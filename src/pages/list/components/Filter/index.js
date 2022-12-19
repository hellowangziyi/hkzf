import React, { Component } from "react";
import FilterTitle from "../FilterTitle";
import FilterMore from "../FilterMore";
import FilterPicker from "../FilterPicker";
import { API } from "../../../../utils/api";

const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
};

export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    // 控制组件展示与隐藏
    openType: "",
    // 筛选项数据
    filterData: {},
    selectedValue:{
      area:['area','null','null'],
      mode:['null'],
      price:['null'],
      more:[]
    }
  };
  componentDidMount() {
    this.getFilterData();
  }
  onTitleClick = (type) => {
    //修改state中高亮的值
    this.setState((prevState) => {
      return {
        titleSelectedStatus: {
          ...prevState.titleSelectedStatus,
          [type]: true,
        },
        openType: type,
      };
    });
  };
  onCancel = () => {
    this.setState({
      openType: "",
    });
  };
  onSave = (type,value) => {
    console.log('type',type);
    console.log('value',value);
    // 隐藏对话框，保存选项值
    this.setState({
      openType: "",
      selectedValue:{
        ...this.state.selectedValue,
        [type]:value
      }
     
    });
  };
  // 获取筛选项的数据
  async getFilterData() {
    const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
    const res = await API.get(`/houses/condition?id=${value}`);
    console.log("res", res);
    this.setState({
      filterData: res.data.body,
    });
  }
  // 渲染FilterPicker组件
  renderFilterPicker() {
    const { openType, filterData,selectedValue } = this.state;
    if (openType !== "area" && openType !== "mode" && openType !== "price")
      return null;
    let data = [];
    let cols = 1;
    console.log("filterData[openType]", filterData[openType]);
    const defaultValue = selectedValue[openType]
    switch (openType) {
      case "area":
        data = [filterData["area"], filterData["subway"]];
        cols = 3;
        break;
      case "mode":
        data = filterData["rentType"];
        break;
      case "price":
        data = filterData["price"];
        break;
      default:
        break;
    }
    return (
      <FilterPicker
        key={openType}
        onCancel={this.onCancel}
        onSave={this.onSave}
        data={data}
        type={openType}
        cols={cols}
        defaultValue={defaultValue}
      ></FilterPicker>
    );
  }
  render() {
    const { titleSelectedStatus, openType } = this.state;
    return (
      <div className="root">
        {openType === "area" || openType === "mode" || openType === "price" ? (
          <div className="mask" onClick={this.onCancel}></div>
        ) : null}

        <div className="content">
          <FilterTitle
            onTitleClick={this.onTitleClick}
            titleSelectedStatus={titleSelectedStatus}
          ></FilterTitle>
          {/* {openType === "area" ||
              openType === "mode" ||
              openType === "price" ? (
                <FilterPicker onCancel={this.onCancel} onSave={this.onSave}></FilterPicker>
              ) : null} */}
          {this.renderFilterPicker()}

          {/* <FilterMore></FilterMore> */}
        </div>
      </div>
    );
  }
}
