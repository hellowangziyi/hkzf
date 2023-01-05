import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Button, Grid, Toast, Modal } from "antd-mobile";

import { BASE_URL } from "../../utils/url";
import { API } from "../../utils/api";
import { isAuth, removeToken, getToken } from "../../utils/auth";
import "./index.scss";

// 菜单数据
const menus = [
  { id: 1, name: "我的收藏", iconfont: "icon-coll", to: "/favorate" },
  { id: 2, name: "我的出租", iconfont: "icon-ind", to: "/rent" },
  { id: 3, name: "看房记录", iconfont: "icon-record" },
  {
    id: 4,
    name: "成为房主",
    iconfont: "icon-identity",
  },
  { id: 5, name: "个人资料", iconfont: "icon-myinfo" },
  { id: 6, name: "联系我们", iconfont: "icon-cust" },
];

// 默认头像
const DEFAULT_AVATAR = BASE_URL + "/img/profile/avatar.png";
export default class Profile extends Component {
  state = {
    isLogin: isAuth(),
    userInfo: {},
  };
  componentDidMount() {
    this.getUserInfo();
  }
  renderUser = () => {
    const {
      userInfo: { avatar, nickname },
      isLogin,
    } = this.state;
    return (
      <div className="title">
        <img
          className="bg"
          src={BASE_URL + "/img/profile/bg.png"}
          alt="背景图"
        />
        <div className="info">
          <div className="myIcon">
            <img className="avatar" src={avatar || DEFAULT_AVATAR} alt="icon" />
          </div>
          <div className="user">
            <div className="name">{nickname || "游客"}</div>
            {isLogin ? (
              <>
                <div className="auth">
                  <span onClick={this.logout}>退出</span>
                </div>
                <div style={{ color: "orange" }} className="edit">
                  编辑个人资料
                  <span className="arrow">
                    <i className="iconfont icon-arrow" />
                  </span>
                </div>
              </>
            ) : (
              <div className="edit">
                <Button
                  type="primary"
                  size="small"
                  inline
                  //   onClick={() => this.props.history.push("/login")}
                  onClick={this.logout}
                >
                  去登录
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  getUserInfo = async () => {
    const { isLogin } = this.state;
    if (!isLogin) {
      // 未登录
      return;
    }
    // const res = await API.get("/user", {
    //   headers: { authorization: getToken() },
    // });
    const res = await API.get("/user");
    if (res.data.state === 200) {
      // 处理图片路径
      if (res.data.avatar) {
        res.data.avatar = BASE_URL + res.data.avatar;
      }
      this.setState({
        userInfo: res.data,
      });
    } else {
      // 登录失败
      Toast.info(res.data.description);
      this.setState({
        userInfo: {},
        isLogin: false,
      });
    }
  };
  logout = () => {
    Modal.show({
      title: "提示",
      content: "确定退出登录？",
      onConfirm: () => {
        console.log("Confirmed");
      },
      closeOnMaskClick: true,
      closeOnAction: true,
      className: "logoutModel",
      actions: [
        {
          key: "confirm",
          text: "确定",
          onClick: async () => {
            await API.post("/user/logout", null, {
              headers: { authorization: getToken() },
            });
            removeToken();
            this.setState({
              isLogin: false,
              userInfo: {},
            });
            this.props.history.push("/login");
          },
        },
        {
          key: "cancel",
          text: "取消",
        },
      ],
    });

    // removeToken();
  };
  render() {
    return (
      <div className="profile_root">
        {/* 个人信息 */}
        {this.renderUser()}
        {/* 九宫格 */}
        <Grid columns={3} gap={8}>
          {menus.map((item) => (
            <Grid.Item>
              <Link to={item.to}>
                <div className="menuItem">
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            </Grid.Item>
          ))}
        </Grid>

        {/* 加入我们 */}
        <div className="ad">
          <img src={BASE_URL + "/img/profile/join.png"} alt="" />
        </div>
      </div>
    );
  }
}
