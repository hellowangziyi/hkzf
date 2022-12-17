import React from "react";
import { PickerView } from "antd-mobile-v2";
import { Component } from "react";
import FilterFooter from "../../../../components/FilterFooter";

export default class FilterPicker extends Component {
  render() {
    const { onCancel, onSave, data, cols } = this.props;
    console.log("data", data);
    return (
      <>
        <PickerView data={data} cols={cols}></PickerView>
        <FilterFooter onCancel={onCancel} onOk={onSave}></FilterFooter>
      </>
    );
  }
}
