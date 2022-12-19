import React from "react";
import { PickerView } from "antd-mobile-v2";
import { Component } from "react";
import FilterFooter from "../../../../components/FilterFooter";

export default class FilterPicker extends Component {
  state={
    value:this.props.defaultValue
  }
  render() {
    const { onCancel, onSave, data, cols,type } = this.props;
    console.log("data", data);
    console.log("this.props.defaultValue", this.props.defaultValue);
    return (
      <>
        <PickerView data={data} cols={cols} value={this.state.value} onChange={val=>this.setState({value:val})}></PickerView>
        <FilterFooter onCancel={onCancel} onOk={()=>onSave(type,this.state.value)}></FilterFooter>
      </>
    );
  }
}
