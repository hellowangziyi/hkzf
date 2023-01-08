import React, { Component } from "react";
import { Link } from "react-router-dom";

import NavHeader from "../../components/NavHeader";
import HouseItem from "../../components/HouseItem";
import noHouse from "../../components/noHouse";

import { getUserHouse } from "../../utils/api/user";

import { BASE_URL } from "../../utils/url";

export default class Rent extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    this.getRentData();
  }
  getRentData = async () => {
    const res = await getUserHouse();
    console.log("res", res);
    const { status, data } = res;
    if (status === 200) {
      this.setState({
        list: data,
      });
    } else {
      this.props.history.replace("/login");
    }
  };
  renderRentItem = () => {
    return this.state.list.map((item) => {
      return (
        <HouseItem
          src={BASE_URL + item.houseImg}
          title={item.title}
          desc={item.desc}
          tags={item.tags}
          price={item.price}
        ></HouseItem>
      );
    });
  };
  renderRentList = () => {
    const { list } = this.state;
    console.log("list", list);
    if (!list.length) {
      return (
        <noHouse>
          您还没有房源，
          <Link to="/rent/add" className="link">
            去发布房源
          </Link>
          吧~
        </noHouse>
      );
    }
    return <div className="houses">{this.renderRentItem()}</div>;
  };
  render() {
    return (
      <>
        <NavHeader>房屋管理</NavHeader>
        {this.renderRentList()}
      </>
    );
  }
}
