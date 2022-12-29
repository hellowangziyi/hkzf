import React, { Component } from "react";
import FilterFooter from "../../../../components/FilterFooter";
import "./index.scss";

export default class FilterMore extends Component {
  state = {
    selected: this.props.selected || [],
  };
  // 渲染标签
  renderFilters(data) {
    const { selected } = this.state;
    return data.map((item) => (
      <span
        onClick={() => this.handlerSel(item.value)}
        key={item.value}
        className={[
          "tag",
          selected.includes(item.value) ? "tagActive" : "",
        ].join(" ")}
      >
        {item.label}
      </span>
    ));
  }
  handlerSel(val) {
    console.log("val", val);
    const newSelected = [...this.state.selected];
    if (newSelected.includes(val)) {
      //以选中，则取消选择
      const index = newSelected.findIndex((item) => item === val);
      newSelected.splice(index, 1);
    } else {
      newSelected.push(val);
    }
    this.setState({
      selected: newSelected,
    });
  }
  onCancel = () => {
    //清除
    this.setState({
      selected: [],
    });
  };
  render() {
    const { roomType, oriented, floor, characteristic, onCancel, onOk } =
      this.props;
    return (
      <div className="root">
        {/* 遮罩层 */}
        <div className="mask" onClick={onCancel} />

        {/* 条件内容 */}
        <div className="tags">
          <dl className="dl">
            <dt className="dt">户型</dt>
            <dd className="dd">{this.renderFilters(roomType)}</dd>

            <dt className="dt">朝向</dt>
            <dd className="dd">{this.renderFilters(oriented)}</dd>

            <dt className="dt">楼层</dt>
            <dd className="dd">{this.renderFilters(floor)}</dd>

            <dt className="dt">房屋亮点</dt>
            <dd className="dd">{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          onCancel={this.onCancel}
          onOk={() => {
            onOk("more", this.state.selected);
          }}
          className="more_footer"
          cancelText="清除"
        />
      </div>
    );
  }
}
