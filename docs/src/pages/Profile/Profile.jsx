import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { FormItem } from "./ProfileStyle";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();
  const check = localStorage.getItem("isLoggedIn") === 'true';
  const data = JSON.parse(localStorage.getItem("formData"));
  const username = data.username;
  const email = data.email;
  const phonenumber = data.phonenumber;
  if (!check) {
    setTimeout(() => {
      
      navigate("/");
    }, 3000)
    Swal.fire({
      title: 'You are not logged in',
      text: 'Please loggin to access this page',
      icon: 'warning',
      showConfirmButton: false,
      confirmButtonColor: '#1677ff',
      timer: 3000
   })
  }else {
    const handleUpdate = (values) => {
      if (oldPassword === data.password) {
        localStorage.setItem(
          "formData",
          JSON.stringify({ ...data, password: values.password })
        );
      } else {
        // setError('Old password is incorrect')
        Swal.fire({
          title: "Old password is incorrect",
          text: "Please try again",
          icon: "error",
          confirmButtonColor: "#1677ff",
        });
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
        <h3 style={{ textAlign: "center", color: "#1677ff" }}>My Profile</h3>
        <Form onFinish={handleUpdate}>
          <FormItem label="Username" labelAlign="left">
            <Input disabled={true} value={username} style={{ width: 220 }} />
          </FormItem>
          <FormItem label="Email" labelAlign="left">
            <Input disabled={true} value={email} style={{ width: 220 }} />
          </FormItem>
          <FormItem label="Phone number" labelAlign="left">
            <Input disabled={true} value={phonenumber} style={{ width: 220 }} />
          </FormItem>
          <FormItem
            label="Old password"
            name="old-password"
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
