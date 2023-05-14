import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Container, SignUpForm } from "./SignUpStyle";
import { Link, useNavigate } from "react-router-dom";
import { FontSizeOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2'

export default function SignUp() {
  const navigate = useNavigate();
  const check = localStorage.getItem('isLoggedIn') === 'true'
  const onFinish = (values) => {
    const {cofirm_password, ...formData} = values
    localStorage.setItem('formData', JSON.stringify(formData))
    Swal.fire({
      title: 'Register Successfully!',
      text: 'Welcome to Find Car Parking',
      icon: 'success',
      confirmButtonColor: '#1677ff',
      timer: 5000
    })
    navigate('/signin');
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (check) {
    setTimeout(() => {
      navigate('/')
    }, 3000)
    Swal.fire({
      title: "You are logged in",
      text: "You cannot access this page unless you are logged out",
      icon: "warning",
      confirmButtonColor: "#1677ff",
      timer: 3000,
      showConfirmButton: false,
    });
  }
  return (
    <Container>
      <SignUpForm>
        <h1
          className="header"
          style={{ textAlign: "center", paddingBottom: 10 }}
        >
          Sign Up
        </h1>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            // label="Full name"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input your fullname!",
              },
            ]}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Input
              prefix={<FontSizeOutlined />}
              placeholder="Enter your fullname"
            />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please input a valid phone number with 10 digits.",
              },
              {
                pattern: /^\S+$/,
                message: "Phone number cannot contain whitespace",
              },
            ]}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter your phone number"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter valid email address",
              },
              {
                pattern: /^\S+$/,
                message: "Email cannot contain whitespace",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                pattern: /^\S+$/,
                message: "Username cannot contain whitespace",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: /^\S+$/,
                message: "Password cannot contain whitespace",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              {
                pattern: /^\S+$/,
                message: "Password cannot contain whitespace",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The passwords that you entered do not match the new password"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your confirm password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/signin">Log In</Link>
            </Form.Item>
          </Form.Item>
        </Form>
      </SignUpForm>
    </Container>
  );
}