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
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

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
  const handleForgotPassword = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  if (!check) {
    const onFinish = async (values) => {
      try {
        // const dbRef = ref(getDatabase())
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, values.email, values.password).then(
          () => {
            Swal.fire({
              title: "Đăng nhập thành công",
              text: "Chúc bạn có trải nghiệm tuyệt vời",
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
            title: "Email hoặc mật khẩu không hợp lệ",
            text: "Vui lòng thử lại",
            icon: "error",
            confirmButtonColor: "#1677ff",
          });
      }
    };
    const handleConfirm = async (values) => {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, values.email)
    }

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
                  message: "Vui lòng nhập email",
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
                  message: "Vui lòng nhập mật khẩu",
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
          title="Đặt lại mật khẩu"
          open={visible}
          footer={[]}
          closable={false}
        >
          <FormReset onFinish={handleConfirm}  form={form}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            {/* <Form.Item
              name="phonenumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng" },
              ]}
            >
              <Input placeholder="Nhập tên người dùng" />
            </Form.Item>
            <Form.Item
              name="newpassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
                {
                  pattern: /^\S+$/,
                  message: "Mật khẩu mới không được chứa khoảng trắng",
                },
                {
                  min: 6,
                  message: 'Mật khẩu phải có độ dài ít nhất 6 kí tự'
                }
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item> */}
            <Form.Item>
              <Button onClick={handleCancel}>Huỷ</Button>
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
