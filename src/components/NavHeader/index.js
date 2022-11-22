import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import PropsTypes from "prop-types";

function NavHeader({ children, history, onLeftClick }) {
  const defaultClick = () => history.go(-1);
  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onBack={onLeftClick || defaultClick}
    >
      {children}
    </NavBar>
  );
}

NavHeader.propsTypes = {
  children: PropsTypes.string.isRequired,
  onLeftClick: PropsTypes.func,
};

export default withRouter(NavHeader);
