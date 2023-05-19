import React from "react";
import { Button, Form, Input } from "antd";
import { Container, SignUpForm } from "./SignUpStyle";
import { Link, useNavigate } from "react-router-dom";
import {
  FontSizeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import unorm from "unorm";
import { child, getDatabase, ref, set } from "firebase/database";
// import { auth, database } from "../../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const normalizeInput = (event) => {
    const value = event.target.value;
    const normalizedValue = unorm.nfd(value).replace(/[\u0300-\u036f]/g, "");
    event.target.value = normalizedValue;
  };
  const check = localStorage.getItem("isLoggedIn") === "true";
  const onFinish = async (values) => {
    // const { cofirm_password, ...formData } = values;
    try {
      const dbRef = ref(getDatabase());
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      const currentUser = auth.currentUser
      const userData = {
        id: currentUser.uid,
        fullname: values.fullname,
        phonenumber: values.phonenumber,
        email: values.email,
        username: values.username,
      };
      await set(child(dbRef, `users/${currentUser.uid}`), userData);
      // localStorage.setItem(
      //   "formData",
      //   JSON.stringify({
      //     email: values.email,
      //     phonenumber: values.phonenumber,
      //     username: values.username,
      //     password: values.password,
      //   })
      // );
      Swal.fire({
        title: "Register Successfully!",
        text: "Welcome to Find Car Parking",
        icon: "success",
        confirmButtonColor: "#1677ff",
        timer: 5000,
      });
      navigate("/signin");
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message
      })
      // console.log(error);
    }
  };
  if (check) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
    Swal.fire({
      title: "Bạn đã đăng nhập",
      text: "Bạn không thể truy cập trang này khi đã đăng nhập",
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
          style={{ textAlign: "center", paddingBottom: 10, color: "#1677ff" }}
        >
          Đăng Kí
        </h1>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            // label="Full name"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please enter your fullname",
              },
            ]}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Input
              prefix={<FontSizeOutlined />}
              placeholder="Nhập họ tên"
            />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid phone number with 10 digits.",
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
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
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
            <Input prefix={<MailOutlined />} placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
              {
                pattern: /^\S+$/,
                message: "Username cannot contain whitespace",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập tên người dùng"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                pattern: /^\S+$/,
                message: "Password cannot contain whitespace",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              onInput={normalizeInput}
              onKeyPress={(event) => {
                if (event.key === " ") {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "Please enter your confirm password",
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
              placeholder="Xác nhận mật khẩu"
              onInput={normalizeInput}
            />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng kí
            </Button>
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/signin">Đã có tài khoản? Đăng nhập</Link>
          </Form.Item>
        </Form>
      </SignUpForm>
    </Container>
  );
}
