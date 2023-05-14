import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Container, SignInForm } from "./SignInStyle";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import unorm from "unorm";

export default function SignIn() {
  const check = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const normalizeInput = (event) => {
    const value = event.target.value;
    const normalizedValue = unorm.nfd(value).replace(/[\u0300-\u036f]/g, "");
    event.target.value = normalizedValue;
  };
  if (!check) {
    const formData = JSON.parse(localStorage.getItem("formData"));
    const onFinish = (values) => {
      if (
        formData &&
        values.username === formData.username &&
        values.password === formData.password
      ) {
        localStorage.setItem("isLoggedIn", true);
        Swal.fire({
          title: "Login Successfully!",
          text: "Wish you have a great experience",
          icon: "success",
          confirmButtonColor: "#1677ff",
          timer: 5000,
        });
        navigate("/");
      } else {
        // setError("Invalid username or password");
        Swal.fire({
          title: "Invalid username or password",
          text: "Please try again",
          icon: "error",
          confirmButtonColor: "#1677ff",
        });
      }
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
                onInput={normalizeInput}
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
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onInput={normalizeInput}
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
    }, 3000);
    Swal.fire({
      title: "You are logged in",
      text: "You cannot access this page unless you are logged out",
      icon: "warning",
      confirmButtonColor: "#1677ff",
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
