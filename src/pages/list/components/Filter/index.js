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
    selectedValue: {
      area: ["area", "null"],
      mode: ["null"],
      price: ["null"],
      more: [],
    },
  };
  componentDidMount() {
    this.getFilterData();
  }
  onTitleClick = (type) => {
    const { titleSelectedStatus, selectedValue } = this.state;
    // 创建新状态数组
    const newtitleSelectedStatus = { ...titleSelectedStatus };
    Object.keys(newtitleSelectedStatus).forEach((key) => {
      if (key === type) {
        // 点击项默认高亮
        newtitleSelectedStatus[key] = true;
      } else {
        //检查是否有选中项
        const selectedVal = selectedValue[key];
        if (
          key === "area" &&
          (selectedVal.length > 2 || selectedVal[0] !== "area")
        ) {
          newtitleSelectedStatus[key] = true;
        } else if (key === "mode" && selectedVal[0] !== "null") {
          newtitleSelectedStatus[key] = true;
        } else if (key === "price" && selectedVal[0] !== "null") {
          newtitleSelectedStatus[key] = true;
        } else if (key === "more") {
          //TODOS:filterMore
        } else {
          newtitleSelectedStatus[key] = false;
        }
      }
    });
    console.log("new", newtitleSelectedStatus);
    //修改state中高亮的值
    this.setState({
      titleSelectedStatus: newtitleSelectedStatus,
      openType: type,
    });
  };
  onCancel = () => {
    this.setState({
      openType: "",
    });
  };
  onSave = (type, value) => {
    console.log("type", type);
    console.log("value", value);
    // 隐藏对话框，保存选项值
    this.setState({
      openType: "",
      selectedValue: {
        ...this.state.selectedValue,
        [type]: value,
      },
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
    const { openType, filterData, selectedValue } = this.state;
    if (openType !== "area" && openType !== "mode" && openType !== "price")
      return null;
    let data = [];
    let cols = 1;
    console.log("filterData[openType]", filterData[openType]);
    const defaultValue = selectedValue[openType];
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
        key={openType} //切换tab时可销毁和新建组件
        onCancel={this.onCancel}
        onSave={this.onSave}
        data={data}
        type={openType}
        cols={cols}
        defaultValue={defaultValue}
      ></FilterPicker>
    );
  }
  //渲染FilterMore组件
  renderFilterMore() {
    const {
      openType,
      filterData: { roomType, oriented, floor, characteristic },
    } = this.state;
    if (openType !== "more") return null;
    return (
      <FilterMore
        roomType={roomType}
        oriented={oriented}
        floor={floor}
        characteristic={characteristic}
      ></FilterMore>
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
