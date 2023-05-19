import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Container, FormReset, SignInForm } from "./SignInStyle";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import unorm from "unorm";
import { useForm } from "antd/es/form/Form";
import { child, get, getDatabase, ref } from "firebase/database";
import { database } from "../../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  // get(child(dbRef, `users`)).then(snapshot => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log('No data');
  //   }
  // }).catch(error => {
  //   console.error(error);
  // })
  const check = localStorage.getItem("isLoggedIn") === "true";
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  // const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate();
  const normalizeInput = (event) => {
    const value = event.target.value;
    const normalizedValue = unorm.nfd(value).replace(/[\u0300-\u036f]/g, "");
    event.target.value = normalizedValue;
  };
  const formData = JSON.parse(localStorage.getItem("formData"));
  const handleForgotPassword = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const handleConfirm = (values) => {
    if (
      formData &&
      values.email === formData.email &&
      values.phonenumber === formData.phonenumber &&
      values.username === formData.username
    ) {
      localStorage.setItem(
        "formData",
        JSON.stringify({ ...formData, password: values.newpassword })
      );
      Swal.fire({
        title: "Password Reset Successfully",
        text: "Now you can login with new password",
        icon: "success",
        confirmButtonColor: "#1677ff",
        timer: 3000,
      });
      form.resetFields();
      setVisible(false);
    } else {
      Swal.fire({
        title: "Your email/phone number/username is incorrect",
        text: "Please try again",
        icon: "error",
        confirmButtonColor: "#1677ff",
        timer: 3000,
      });
    }
  };
  if (!check) {
    const onFinish = async (values) => {
      try {
        // const dbRef = ref(getDatabase())
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, values.email, values.password).then(
          () => {
            Swal.fire({
              title: "Login Successfully!",
              text: "Wish you have a great experience",
              icon: "success",
              confirmButtonColor: "#1677ff",
              timer: 5000,
            });
            localStorage.setItem("isLoggedIn", true);
            navigate("/");
          }
        )
      } catch (error) {
        // console.log(error);
        // if (error.message === "auth/wrong-password") {
          Swal.fire({
            title: "Invalid username or password",
            text: "Please try again",
            icon: "error",
            confirmButtonColor: "#1677ff",
          });
        // } else {
        //     Swal.fire({
        //       title: 'There was an error',
        //       text: 'Please contact to supporter',
        //       icon: 'error',
        //       confirmButtonColor: '#1677ff',
        //       timer: 3000
        //     })
        // }
      }
      // if (
      //   formData &&
      //   values.username === formData.username &&
      //   values.password === formData.password
      // ) {
      //   localStorage.setItem("isLoggedIn", true);
      //   Swal.fire({
      //     title: "Login Successfully!",
      //     text: "Wish you have a great experience",
      //     icon: "success",
      //     confirmButtonColor: "#1677ff",
      //     timer: 5000,
      //   });
      //   navigate("/");
      // } else {
      //   // setError("Invalid username or password");
      //   Swal.fire({
      //     title: "Invalid username or password",
      //     text: "Please try again",
      //     icon: "error",
      //     confirmButtonColor: "#1677ff",
      //   });
      // }
    };

    return (
      <Container>
        <SignInForm>
          <h1
            className="header"
            style={{ textAlign: "center", paddingBottom: 10, color: "#1677ff" }}
          >
            Đăng Nhập
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nhập email"
                onInput={normalizeInput}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Nhập mật khẩu"
                onInput={normalizeInput}
              />
            </Form.Item>
            <Form.Item>
              <Link onClick={() => handleForgotPassword()}>
                Quên mật khẩu?
              </Link>
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
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/signup">Chưa có tài khoản? Đăng kí</Link>
            </Form.Item>
          </Form>
        </SignInForm>
        <Modal
          title="Forgot Password"
          open={visible}
          footer={[]}
          closable={false}
        >
          <FormReset onFinish={handleConfirm} form={form}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter you email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              name="newpassword"
              rules={[
                { required: true, message: "Please enter your new password" },
                {
                  pattern: /^\S+$/,
                  message: "Password cannot contain whitespace",
                },
              ]}
            >
              <Input.Password placeholder="Enter your new password" />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </FormReset>
        </Modal>
      </Container>
    );
  } else {
    setTimeout(() => {
      navigate("/");
    }, 1000);
    Swal.fire({
      title: "Bạn chưa đăng nhập",
      text: "Bạn không thể truy cập trang này khi đã đăng nhập",
      icon: "warning",
      confirmButtonColor: "#1677ff",
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
