import React, { Component } from "react";
import { API } from "../../utils/api";
import { BASE_URL } from "../../utils/url";

import NavHeader from "../../components/NavHeader";
import HousePackage from "../../components/HousePackage";
import HouseItem from "../../components/HouseItem";

import { Carousel, WingBlank, Flex } from "antd-mobile-v2";

import "./index.scss";
import { isAuth } from "../../utils/auth";
import { Modal, Toast } from "antd-mobile";

// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    src: BASE_URL + "/img/message/1.png",
    desc: "72.32㎡/南 北/低楼层",
    title: "安贞西里 3室1厅",
    price: 4500,
    tags: ["随时看房"],
  },
  {
    id: 2,
    src: BASE_URL + "/img/message/2.png",
    desc: "83㎡/南/高楼层",
    title: "天居园 2室1厅",
    price: 7200,
    tags: ["近地铁"],
  },
  {
    id: 3,
    src: BASE_URL + "/img/message/3.png",
    desc: "52㎡/西南/低楼层",
    title: "角门甲4号院 1室1厅",
    price: 4300,
    tags: ["集中供暖"],
  },
];
export default class HouseDetail extends Component {
  state = {
    isLoading: false,
    // 房屋详情
    houseInfo: {
      // 房屋图片
      houseImg: [],
      // 标题
      title: "",
      // 标签
      tags: [],
      // 租金
      price: 0,
      // 房型
      roomType: "",
      // 房屋面积
      size: 0,
      // 朝向
      oriented: [],
      // 楼层
      floor: "",
      // 小区名称
      community: "",
      // 地理位置
      coord: {
        latitude: "39.928033",
        longitude: "116.529466",
      },
      // 房屋配套
      supporting: [],
      // 房屋标识
      houseCode: "",
      // 房屋描述
      description: "",
    },
    isFavorite: false,
  };
  componentDidMount() {
    console.log("this.props.match", this.props.match);
    this.getHouseDetail();
  }
  getHouseDetail = async () => {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    const res = await API.get(`${BASE_URL}/houses/${id}`);
    console.log("res", res);
    this.setState({
      houseInfo: res.data.body,
      isLoading: false,
    });
  };
  renderSwiper = () => {
    const {
      houseInfo: { houseImg },
    } = this.state;
    console.log("houseIMg", houseImg);
    if (!houseImg.length) {
      return null;
    }
    return houseImg.map((item) => (
      <a key={item} href="http://itcast.cn">
        <img src={BASE_URL + item} alt="" />
      </a>
    ));
  };
  renderTags = () => {
    const {
      houseInfo: { tags },
    } = this.state;

    return tags.map((item, index) => {
      // 如果标签数量超过3个，后面的标签就都展示位第三个标签的样式
      let tagClass = "";
      if (index > 2) {
        tagClass = "tag3";
      } else {
        tagClass = "tag" + (index + 1);
      }

      return (
        <span key={item} className={["tag", tagClass].join(" ")}>
          {item}
        </span>
      );
    });
  };
  checkFavorite = async () => {
    if (!isAuth()) {
      //未登录
      return;
    }
    const { id } = this.props.match.params;
    const res = await API.get(`/user/favorites/${id}`);
    const { status, body } = res.data;
    if (status === 200) {
      this.setState({
        isFavorite: body.isFavorite,
      });
    }
  };
  handleFavorite = async () => {
    if (!isAuth()) {
      // 未登录
      const { history, location } = this.props;
      return Modal.show({
        // title: '请先登录！',
        content: "登录后才能收藏，请先登录！",
        actions: [{ key: "login", text: "去登录", primary: true }],
        onClick: () => {
          history.push("/login", { backUrl: location });
        },
      });
    }
    const { isFavorite } = this.state;
    const { id } = this.props.match.params;
    if (isFavorite) {
      // 已经收藏了，则取消收藏
      const res = await API.delete(`/user/favorite/${id}`);
      if (res.data.status === 200) {
        Toast.info("已取消收藏", 1, null, false);
        this.setState({
          isFavorite: false,
        });
      } else {
        // token超时
        Toast.info("登录超时，请重新登录", 1, null, false);
      }
    } else {
      const res = await API.post(`/user/favorite/${id}`);
      if (res.data.state === 200) {
        Toast.info("收藏成功！", 1, null, false);
        this.setState({
          isFavorite: true,
        });
      } else {
        // token超时
        Toast.info("登录超时，请重新登录", 1, null, false);
      }
    }
  };
  render() {
    const {
      isLoading,
      houseInfo: {
        community = "",
        title,
        price,
        roomType,
        size,
        floor,
        oriented,
        supporting,
        description,
      },
      isFavorite,
    } = this.state;
    return (
      <div className="houseDetail">
        {/* 导航栏 */}
        <NavHeader
          className="house_navHeader"
          rightContent={[<i key="share" className="iconfont icon-share" />]}
        >
          房屋详情
        </NavHeader>

        {/* 轮播图 */}
        <div className="slides">
          {!isLoading ? (
            // <Carousel autoplay infinite autoplayInterval={5000}>
            //   {this.renderSwipers()}
            // </Carousel>
            <WingBlank>
              <Carousel autoplay infinite>
                {this.renderSwiper()}
              </Carousel>
            </WingBlank>
          ) : (
            ""
          )}
        </div>

        {/* 房屋基础信息 */}
        <div className="info">
          <h3 className="infoTitle">{title}</h3>
          <Flex className="tags">
            <Flex.Item>{this.renderTags()}</Flex.Item>
          </Flex>

          <Flex className="infoPrice">
            <Flex.Item className="infoPriceItem">
              <div>
                {price}
                <span className="month">/月</span>
              </div>
              <div>租金</div>
            </Flex.Item>
            <Flex.Item className="infoPriceItem">
              <div>{roomType}</div>
              <div>房型</div>
            </Flex.Item>
            <Flex.Item className="infoPriceItem">
              <div>{size}平米</div>
              <div>面积</div>
            </Flex.Item>
          </Flex>

          <Flex className="infoBasic" align="start">
            <Flex.Item>
              <div>
                <span className="title">装修：</span>
                精装
              </div>
              <div>
                <span className="title">楼层：</span>
                {floor}
              </div>
            </Flex.Item>
            <Flex.Item>
              <div>
                <span className="title">朝向：</span>
                {oriented.join("、")}
              </div>
              <div>
                <span className="title">类型：</span>普通住宅
              </div>
            </Flex.Item>
          </Flex>
        </div>

        {/* 房屋配套 */}
        <div className="about">
          <div className="houseTitle">房屋配套</div>
          {/* <HousePackage list={supporting} /> */}
          {/* <div className="title-empty">暂无数据</div> */}

          {supporting.length === 0 ? (
            <div className="titleEmpty">暂无数据</div>
          ) : (
            <HousePackage list={supporting} />
          )}
        </div>

        {/* 房屋概况 */}
        <div className="set">
          <div className="houseTitle">房源概况</div>
          <div>
            <div className="contact">
              <div className="user">
                <img src={BASE_URL + "/img/avatar.png"} alt="头像" />
                <div className="useInfo">
                  <div>王女士</div>
                  <div className="userAuth">
                    <i className="iconfont icon-auth" />
                    已认证房主
                  </div>
                </div>
              </div>
              <span className="userMsg">发消息</span>
            </div>

            <div className="descText">{description || "暂无房屋描述"}</div>
          </div>
        </div>

        {/* 推荐 */}
        <div className="recommend">
          <div className="houseTitle">猜你喜欢</div>
          <div className="items">
            {recommendHouses.map((item) => (
              <HouseItem {...item} key={item.id} />
            ))}
          </div>
        </div>

        {/* 底部收藏按钮 */}
        <Flex className="fixedBottom">
          <Flex.Item onClick={this.handleFavorite}>
            <img
              src={
                BASE_URL + (isFavorite ? "/img/star.png" : "/img/unstar.png")
              }
              className="favoriteImg"
              alt="收藏"
            />
            <span className="favorite">{isFavorite ? "已收藏" : "收藏"}</span>
          </Flex.Item>
          <Flex.Item>在线咨询</Flex.Item>
          <Flex.Item>
            <a href="tel:400-618-4000" className="telephone">
              电话预约
            </a>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
