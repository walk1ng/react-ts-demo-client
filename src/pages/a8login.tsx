import { Button, Form, Input, message } from "antd";
import { Rule } from "antd/es/form";
import RouteStore from "../store/routes_store";
import { LoginReq } from "../models/route";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

function A8Login() {
  const username_rules: Rule[] = [
    { required: true, message: "用户名不能为空" },
  ];

  const password_rules: Rule[] = [{ required: true, message: "密码不能为空" }];

  // const nav = useNavigate()

  function onFinish(loginCred: LoginReq) {
    console.log('login cred', loginCred)
    RouteStore.login(loginCred)
    console.log('login state', RouteStore.state)
  }

  const nav = useNavigate()
  useEffect(()=>{
    if (RouteStore.state === 'done') {
      // 跳转首页
      message.success(RouteStore.message)
      nav('/')
    } else if (RouteStore.state === 'error') {
      message.error(RouteStore.message)
    } 
  }, [RouteStore.state])


  return (
    <div>
      <Form name="basic" onFinish={onFinish}>
        <Form.Item name="username" label="用户名" rules={username_rules}>
          <Input placeholder="请输入用户名" style={{ width: 200 }}></Input>
        </Form.Item>
        <Form.Item name="password" label="密码" rules={password_rules}>
          <Input.Password
            placeholder="请输入密码"
            style={{ width: 200 }}
          ></Input.Password>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default observer(A8Login)