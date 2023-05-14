import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Container, SignInForm } from "./SignInStyle";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const check = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  if (!check) {
    const onFinish = () => {
      navigate("/");
      localStorage.setItem("isLoggedIn", true);
    };

    return (
      <Container>
        <SignInForm>
          <h1
            className="header"
            style={{ textAlign: "center", paddingBottom: 10 }}
          >
            Sign In
          </h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              {/* Or <a href="">register now!</a> */}
              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/signup">Register</Link>
              </Form.Item>
            </Form.Item>
          </Form>
        </SignInForm>
      </Container>
    );
  } else {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <div>Bạn đã đăng nhập. Bạn sẽ được đưa về trang chủ sau 2 giây</div>;
  }
}
