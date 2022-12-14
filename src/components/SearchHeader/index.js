import React from "react";
import { Flex } from "antd-mobile-v2";
import { withRouter } from "react-router-dom";
import PropsTypes from "prop-types";
import "./index.scss";
function SearchHeader ({ history, cityName, className }) {
    return (
        <Flex className={["search-box", className || ""].join(" ")}>
            {/* 左侧白色区域 */}
            <Flex className="search">
                {/* 位置 */}
                <div
                    className="location"
                    onClick={() => history.push("/citylist")}
                >
                    <span className="name">{cityName}</span>
                    {/* //{this.state.curCityName} */}
                    <i className="iconfont icon-arrow" />
                </div>

                {/* 搜索表单 */}
                <div
                    className="form"
                // onClick={() => this.props.history.push("/search")}
                >
                    <i className="iconfont icon-seach" />
                    <span className="text">请输入小区或地址</span>
                </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i
                className="iconfont icon-map"
                onClick={() => history.push("/map")}
            />
        </Flex>
    )
}
SearchHeader.propsTypes = {
    cityName: PropsTypes.string.isRequired,
    className: PropsTypes.string
};
export default withRouter(SearchHeader)