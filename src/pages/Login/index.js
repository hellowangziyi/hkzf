import React, { Component } from "react";
import { Flex, WingBlank, WhiteSpace, Toast } from "antd-mobile-v2";
import { Form, Button, Input, Loading } from "antd-mobile";

import { Link } from "react-router-dom";
import { API } from "../../utils/api";
import NavHeader from "../../components/NavHeader";

export default class Login extends Component {
  state = {
    isLoading: false,
  };
  onFinish = async (vals) => {
    const { username, password } = vals;
    const { isLoading } = this.state;
    Toast.loading("正在登录中...", 0);
    this.setState({
      isLoading: true,
    });
    const res = await API.post("/user/login", {
      username,
      password,
    });
    this.setState({
      isLoading: false,
    });
    Toast.hide();
    if (res.data.state === 200) {
      // 登录成功
      localStorage.setItem("hkzf_token", res.data.body.token);
      Toast.success("登录成功！");
      if (this.props.location.state) {
        // 返回重定向之前的页面
        this.props.push(this.props.location.state.backUrl.pathname);
      } else {
        this.props.history(-1);
      }
    } else {
      // 登录失败
      Toast.info(res.data.description);
    }
    console.log("login_res", res);
    console.log("onFinish", vals);
  };
  render() {
    return (
      <div className="login">
        <NavHeader>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        <WingBlank>
          <Form
            layout="horizontal"
            onFinish={this.onFinish}
            footer={
              <Button block type="submit" color="primary" size="large">
                登录
              </Button>
            }
          >
            <Form.Item
              name="username"
              label="用户名"
              validateTrigger="onBlur"
              rules={[
                { min: 5, message: "用户名长度不低于5个字符" },
                {
                  pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, "g"),
                  message: "名称只允许包含数字、字母和下划线",
                },
              ]}
            >
              {/* 长度为5到8位，只能出现数字、字母、下划线 */}
              <Input onChange={console.log} placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              validateTrigger="onBlur"
              rules={[
                { min: 5, message: "密码长度不低于5个字符" },
                {
                  pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, "g"),
                  message: "密码只允许包含数字、字母和下划线",
                },
              ]}
            >
              {/* 长度为5到12位，只能出现数字、字母、下划线 */}
              <Input placeholder="请输入密码" clearable type="password" />
            </Form.Item>
          </Form>
          <Flex className="backHome">
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}
