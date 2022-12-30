import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import PropsTypes from "prop-types";

function NavHeader({ children, history, onLeftClick,className,rightContent }) {
  const defaultClick = () => history.go(-1);
  return (
    <NavBar
      className={["navbar",className||''].join(" ")}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onBack={onLeftClick || defaultClick}
      rightContent={rightContent}
    >
      {children}
    </NavBar>
  );
}

NavHeader.propsTypes = {
  children: PropsTypes.string.isRequired,
  onLeftClick: PropsTypes.func,
  className:PropsTypes.string,
  
};

export default withRouter(NavHeader);
