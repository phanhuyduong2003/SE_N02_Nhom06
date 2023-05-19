import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { FormItem } from "./ProfileStyle";
import Swal from "sweetalert2";
import { redirect, useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { signInWithCredential } from "firebase/auth";
import { useForm } from "antd/es/form/Form";

export default function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();
  const check = localStorage.getItem("isLoggedIn") === "true";
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [form] = useForm()

  useEffect(() => {
    const auth = getAuth();
    const database = getDatabase();
    const userID = auth.currentUser?.uid;
    if (!userID) {
      setTimeout(() => {
        navigate('/')
      })
    } else {
      const userRef = ref(database, `/users/${userID}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        // console.log(userData);
        if (userData) {
          setName(userData.fullname);
          setEmail(userData.email);
          setPhoneNumber(userData.phonenumber);
          setUserName(userData.username);
        } else {
          Swal.fire({
            title: "Có lỗi xảy ra",
            text: "Vui lòng liên hệ với bộ phận hỗ trợ",
            icon: "warning",
            timer: 3000,
            confirmButtonColor: "#1677ff",
          });
        }
      });
    }
  }, [navigate]);
  if (!check) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
    Swal.fire({
      title: "Bạn chưa đăng nhập",
      text: "Vui lòng đăng nhập để truy cập trang này",
      icon: "warning",
      showConfirmButton: false,
      confirmButtonColor: "#1677ff",
      timer: 3000,
    });
  } else {
    const handleUpdate = async (values) => {
      try {
        const auth = getAuth();
        const user = auth.currentUser
        const credential = EmailAuthProvider.credential(email, oldPassword)
        await signInWithCredential(auth, credential)
        const token = await user.getIdTokenResult()
        await updatePassword(user, values.password)
        localStorage.setItem('userToken', token.token)
        // await localStorage.setItem('isLoggedIn', false)
        await form.resetFields()
        // await signInWithCredential(auth, credential)
        Swal.fire({
          title: "Cập nhật mật khẩu thành công",
          text: "Vui lòng ghi nhớ mật khẩu mới để truy cập",
          icon: "success",
          confirmButtonColor: "#1677ff",
        });
      } catch (error) {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          Swal.fire({
            title: 'Mật khẩu hiện tại không đúng',
            text: 'Vui lòng thử lại',
            icon: "error",
            confirmButtonColor: "#1677ff",
          });
        } else {
          
          Swal.fire({
            title: 'Có lỗi nào đó xảy ra',
            text: 'Vui lòng liên hệ với bộ phận hỗ trợ',
            confirmButtonColor: '#1677ff',
            timer: 3000
          })
          console.log(error.message);
        }
      }
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 90px",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#1677ff" }}>Tài khoản của tôi</h3>
        <Form onFinish={handleUpdate} form={form}>
          <FormItem label="Họ tên" labelAlign="left">
            <Input disabled={true} value={name} style={{ width: 220 }} />
          </FormItem>
          <FormItem label="Tên người dùng" labelAlign="left">
            <Input disabled={true} value={userName} style={{ width: 220 }} />
          </FormItem>
          <FormItem label="Email" labelAlign="left">
            <Input disabled={true} value={email} style={{ width: 220 }} className="email_change"/>
          </FormItem>
          <FormItem label="Số điện thoại" labelAlign="left">
            <Input disabled={true} value={phoneNumber} style={{ width: 220 }} />
          </FormItem>
          <FormItem
            label="Mật khẩu cũ"
            name="oldpassword"
            labelAlign="left"
            rules={[
              {
                message: "Vui lòng nhập mật khẩu cũ",
                required: true,
              },
              {
                pattern: /^\S+$/,
                message: "Mật khẩu cũ không được chứa khoảng trắng",
              },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu cũ"
              onChange={(event) => setOldPassword(event.target.value)}
              style={{ width: 220 }}
            />
          </FormItem>
          <FormItem
            label="Mật khẩu mới"
            name="password"
            labelAlign="left"
            rules={[
              {
                message: "Vui lòng nhập mật khẩu mới",
                required: true,
              },
              {
                pattern: /^\S+$/,
                message: "Mật khẩu không được chứa khoảng trắng",
              },
              {
                min: 6,
                message: "Mật khẩu phải chứa ít nhất 6 kí tự",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("oldpassword") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới không được trùng mật khẩu cũ")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              style={{ width: 220 }}
            />
          </FormItem>
          <FormItem
            label="Xác nhận mật khẩu mới"
            name="confirm_password"
            labelAlign="left"
            rules={[
              {
                message: "Vui lòng nhập mật khẩu xác nhận",
                required: true,
              },
              {
                pattern: /^\S+$/,
                message: "Mật khẩu xác nhận không được chứa khoảng trắng",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Mật khẩu xác nhận không trùng với mật khẩu đã đặt"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu xác nhận"
              style={{ width: 220 }}
            />
          </FormItem>
          {/* {error && <div style={{color: 'red', textAlign: 'center'}}>{error} </div>} */}
          <FormItem style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
