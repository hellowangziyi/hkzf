import React, { Component } from "react";
import FilterFooter from "../../../../components/FilterFooter";
import './index.scss'
export default class FilterMore extends Component {
  render () {
    const { roomType, oriented, floor, characteristic } = this.props;
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
        <FilterFooter onCancel={onCancel} onOk={() => { onOk(this.state.selected) }} className="footer" />
      </div>
    )
  }
}
