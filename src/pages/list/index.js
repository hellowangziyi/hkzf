import React from "react";
import { Flex, Toast } from "antd-mobile-v2";
import SearchHeader from "../../components/SearchHeader";
import "./index.scss";
import Filter from "./components/Filter";
import { API } from "../../utils/api";
import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";
import HouseItem from "../../components/HouseItem";
import Sticky from "../../components/Sticky";
import NoHouse from "../../components/noHouse";
import { BASE_URL } from "../../utils/url";

// const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));

export default class houseList extends React.Component {
  state = {
    list: [],
    count: 0,
    isloading: false,
  };
  // 初始化实例属性
  filter = {};
  label = "";
  value = "";

  componentDidMount() {
    const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));
    this.label = label;
    this.value = value;
    this.searchHouseList();
  }
  handleFilterChange = (filter) => {
    this.filter = filter;
    this.searchHouseList();
  };
  searchHouseList = async () => {
    Toast.loading("正在加载中...", 0);
    this.setState({
      loading: true,
    });
    const res = await API.get("/houses", {
      params: {
        cityId: this.value,
        ...this.filter,
        start: 1,
        end: 20,
      },
    });
    Toast.hide();
    console.log("HouseList:res", res);
    const { list, count } = res.data.body;
    if (count !== 0) {
      Toast.success(`获取到${count}条房源信息`, 2);
    }
    this.setState({
      list: list,
      count: count,
      loading: false,
    });
  };
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    style, // Style object to be applied to row (to position it)
  }) => {
    const { list } = this.state;
    const house = list[index];
    if (!house) {
      return (
        <div key={key} style={style}>
          <p className="loading"></p>
        </div>
      );
    }
    const { houseImg, title, desc, tags, price,houseCode } = house;
    return (
      <div className="house">
        <HouseItem
          src={BASE_URL + houseImg}
          title={title}
          desc={desc}
          tags={tags}
          price={price}
          key={key}
          style={style}
          onClick={()=>{this.props.history.push({pathname:`/detail/${houseCode}`},{id:houseCode})}}
        ></HouseItem>
      </div>
    );
  };
  // 判断列表是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
  };
  // 获取更多房屋数据 返回值是一个Promise对象
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise((resolve) => {
      API.get("/houses", {
        params: {
          cityId: this.value,
          ...this.filter,
          start: startIndex,
          end: stopIndex,
        },
      }).then((res) => {
        console.log("loadMoreRows", res);
        this.setState({
          list: [...this.state.list, ...res.data.body.list],
        });
        // 数据加载完成，调用resolve
        resolve();
      });
    });
  };
  renderHouseItem = () => {
    if (this.state.count === 0 && this.state.loading === false) {
      return <NoHouse>暂无</NoHouse>;
    }
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.state.count}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              // scrollTop页面滚动距离，与list组件同步
              <AutoSizer>
                {({ width }) => (
                  <List
                    autoHeight
                    height={height}
                    width={width}
                    rowCount={this.state.count}
                    rowHeight={120}
                    rowRenderer={this.rowRenderer}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    );
  };
  render() {
    const cityName = this.label;
    return (
      <div>
        <Flex className="header">
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.go(-1)}
          ></i>
          <SearchHeader
            cityName={cityName}
            className="listSearch"
          ></SearchHeader>
        </Flex>
        {/* 筛选框*/}
        <div className="filter_list">
          <Sticky height={40}>
            <Filter handleFilterChange={this.handleFilterChange} />
          </Sticky>
        </div>
        {/* 房屋列表 */}
        <div className="house_list">{this.renderHouseItem()}</div>
      </div>
    );
  }
}
