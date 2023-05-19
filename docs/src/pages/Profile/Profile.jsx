import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { FormItem } from "./ProfileStyle";
import Swal from "sweetalert2";
import { redirect, useNavigate } from "react-router-dom";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { auth } from "../../firebase";

export default function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();
  const check = localStorage.getItem("isLoggedIn") === "true";
  const data = JSON.parse(localStorage.getItem("formData"));
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const database = getDatabase();
    const userID = auth.currentUser.uid;
    if (!userID) {
      redirect("/");
    } else {
      const userRef = ref(database, `/users/${userID}`);
      onValue(userRef, snapshot => {
        const userData = snapshot.val()
        console.log(userData);
        if (userData) {
          setName(userData.fullname)
          setEmail(userData.email)
          setPhoneNumber(userData.phonenumber)
          setUserName(userData.username)
      } else {
          Swal.fire({
            title: 'Có lỗi xảy ra',
            text: 'Vui lòng liên hệ với bộ phận hỗ trợ',
            icon: 'warning',
            timer: 3000,
            confirmButtonColor: '#1677ff'
        });
      }
    });
  }
  }, []);
  if (!check) {
    setTimeout(() => {
      navigate('/')
    }, 1000)
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
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, oldPassword)
        await reauthenticateWithCredential(user, credential)
        await updatePassword(user, values.oldpassword)
        Swal.fire({
          title: 'Cập nhật mật khẩu thành công',
          text: 'Vui lòng ghi nhớ mật khẩu mới để truy cập',
          icon: 'success',
          confirmButtonColor: '#1677ff'
        })
      } catch (error) {
        Swal.fire({
          title: error.message,
          icon: 'error',
          confirmButtonColor: '#1677ff'
        })
      }
      // if (oldPassword === data.password) {
      //   localStorage.setItem(
      //     "formData",
      //     JSON.stringify({ ...data, password: values.password })
      //   );
      // } else {
      //   Swal.fire({
      //     title: "Old password is incorrect",
      //     text: "Please try again",
      //     icon: "error",
      //     confirmButtonColor: "#1677ff",
      //   });
      // }
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
        <h3 style={{ textAlign: "center", color: "#1677ff" }}>My Profile</h3>
        <Form onFinish={handleUpdate}>
          <FormItem label="Full name" labelAlign="left">
            <Input disabled={true} value={name} style={{ width: 220 }} />
          </FormItem>
          <FormItem label="User name" labelAlign="left">
            <Input disabled={true} value={userName} style={{ width: 220 }} />
          </FormItem>
          <FormItem label="Email" labelAlign="left">
            <Input disabled={true} value={email} style={{ width: 220 }} />
          </FormItem>
          <FormItem label="Phone number" labelAlign="left">
            <Input disabled={true} value={phoneNumber} style={{ width: 220 }} />
          </FormItem>
          <FormItem
            label="Old password"
            name="oldpassword"
            labelAlign="left"
            rules={[
              {
                message: "Please enter your password!",
                required: true,
              },
              {
                pattern: /^\S+$/,
                message: "Password cannot contain whitespace",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your old password"
              onChange={(event) => setOldPassword(event.target.value)}
              style={{ width: 220 }}
            />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            labelAlign="left"
            rules={[
              {
                message: "Please enter your password!",
                required: true,
              },
              {
                pattern: /^\S+$/,
                message: "Password cannot contain whitespace",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("old-password") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "New password cannot be the same as your old password"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              style={{ width: 220 }}
            />
          </FormItem>
          <FormItem
            label="Confirm pasword"
            name="confirm_password"
            labelAlign="left"
            rules={[
              {
                message: "Please enter your confirm password!",
                required: true,
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
              placeholder="Enter your confirm password"
              style={{ width: 220 }}
            />
          </FormItem>
          {/* {error && <div style={{color: 'red', textAlign: 'center'}}>{error} </div>} */}
          <FormItem style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
