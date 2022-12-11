import React from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile-v2";
import { API } from "../../utils/api";
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";
import "./index.scss";
import { BASE_URL } from "../../utils/url";

const navs = [
  {
    id: 1,
    img: Nav1,
    title: "整租",
    path: "/home/list",
  },
  {
    id: 2,
    img: Nav2,
    title: "合租",
    path: "/home/list",
  },
  {
    id: 3,
    img: Nav3,
    title: "地图找房",
    path: "/home/map",
  },
  {
    id: 4,
    img: Nav4,
    title: "去出租",
    path: "/home/rent",
  },
];

const data = Array.from(new Array(4)).map((_val, i) => ({
  imgSrc: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
  title: `name${i}`,
}));
export default class Index extends React.Component {
  state = {
    // 轮播图数据
    swipers: [],
    isSwipersLoaded: false,
    groups: [],
    news: [],
    cityName: "定位中",
  };

  async getSwipers() {
    const res = await API.get("http://localhost:8080/home/swiper");
    this.setState({
      swipers: res.data.body,
      isSwipersLoaded: true,
    });
  }
  async getGroups() {
    const res = await API.get("http://localhost:8080/home/groups", {
      params: {
        area: "",
      },
    });
    this.setState({
      groups: res.data.body,
    });
  }

  renderSwipers() {
    return this.state.swipers.map((item) => {
      <a
        key={item.id}
        href="http://www.alipay.com"
        style={{ display: "inline-block", width: "100%", height: 212 }}
      >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
        />
      </a>;
    });
  }

  renderFlexItem() {
    return navs.map((item) => (
      <Flex.Item
        key={item.id}
        onClick={() => {
          this.props.history.push(item.path);
          this.props.history.go(0);
        }}
      >
        <img src={item.img}></img>
        <h2>{item.title}</h2>
      </Flex.Item>
    ));
  }
  renderGroups() {
    // return this.state.groups.map(item =>
    //     )
  }
  componentDidMount() {
    this.getSwipers();
    this.getGroups();

    // const curCity = new window.Bmap.LocalCity()
    // curCity.get(async res => {
    //     const result = await axios.get(`http://localhost:8080/home/swiper?name=${res.name}`)
    //     this.setState({
    //         cityName: result.data.body.label
    //     })

    // })
  }
  // componentDidUpdate (preProps) {
  //     console.log('preProps', preProps)
  //     if (this.preProps.location.pathname !== this.props.location.pathname) {
  //         this.setState({
  //             selectedTab: this.props.location.pathname
  //         })
  //     }
  // }
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        {/* {this.state.isSwipersLoaded ?
                    (<Carousel
                        autoplay={true}
                        infinite

                    >
                        {this.renderSwipers()}
                    </Carousel>) : ''} */}

        <Carousel autoplay infinite>
          {this.renderSwipers()}
        </Carousel>

        {/* 搜索框 */}
        <Flex className="search-box">
          {/* 左侧白色区域 */}
          <div
            className="location"
            onClick={() => this.props.history.push("/citylist")}
          >
            <span className="name">{this.state.cityName}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
        </Flex>

        <Flex className="nav">
          {/* <Flex.Item>
                    <img src={Nav1}></img>
                    <h2>整租</h2>
                </Flex.Item>
                <Flex.Item>
                    <img src={Nav2}></img>
                    <h2>合租</h2>
                </Flex.Item>
                <Flex.Item>
                    <img src={Nav3}></img>
                    <h2>地图找房</h2>
                </Flex.Item>
                <Flex.Item>
                    <img src={Nav4}></img>
                    <h2>去出租</h2>
                </Flex.Item> */}
          {this.renderFlexItem()}
        </Flex>

        {/* 租房小组 */}
        <div className="group-title">
          <p className="group-title-left">租房小组</p>
          <span className="group-title-right">更多</span>
          {/* <Link to='/home/list' className='group-title-right'>更多</Link> */}
        </div>
        <Grid
          className="group-list"
          data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={(item) => (
            <div className="group-item">
              {/* 左边：标题、简介 */}
              <div>
                <div className="group-item-title">{item.title}</div>
                <div className="group-item-desc">{item.desc}</div>
              </div>
              {/* 右边：图片 */}
              <img src={BASE_URL + item.imgSrc} alt="" />
            </div>
          )}
        />

        {/* 最新资讯 */}
        <WingBlank className="news-title">
          <p>最新资讯</p>
        </WingBlank>
        <WingBlank className="news-item">
          {this.state.news.map((i, idx) => (
            <div className="news-list" key={idx}>
              <img src={`http://127.0.0.1:8080${i.imgSrc}`}></img>
              <div className="news-data">
                <div className="title">{i.title}</div>
                <div className="info">
                  <span>{i.from}</span>
                  <span>{i.data}</span>
                </div>
              </div>
            </div>
          ))}
        </WingBlank>
      </div>
    );
  }
}
