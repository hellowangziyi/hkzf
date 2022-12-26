import React, { Component } from "react";

export default class FilterMore extends Component {
  render() {
    const { roomType, oriented, floor, characteristic } = this.props;
    return (
      <div className="root">
        <div className="mask"></div>
        <div className="content"></div>
      </div>
    );
  }
}
