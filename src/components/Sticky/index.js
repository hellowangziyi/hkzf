import React, { Component, createRef } from "react";
import './index.scss'

class Sticky extends Component {
  // 创建Ref对象
  placeHolder = createRef();
  content = createRef();

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const placeHolderEl = this.placeHolder.current;
    const contentEl = this.content.current;
    const { top } = placeHolderEl.getBoundingClientRect();
    if (top < 0) {
      // 吸顶
      contentEl.classList.add("fixed");
      placeHolderEl.style.height = `${this.props.height}px`;
    } else {
      // 取消吸顶
      contentEl.classList.remove("fixed")
      placeHolderEl.style.height = "0";
    }
  };
  render() {
    return (
      <div>
        {/* 占位元素 */}
        <div ref={this.placeHolder}></div>
        {/* 内容元素 */}
        <div ref={this.content}>{this.props.children}</div>
      </div>
    );
  }
}

export default Sticky;
