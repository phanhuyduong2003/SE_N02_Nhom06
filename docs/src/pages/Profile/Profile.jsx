import { Button, Form, Input} from "antd";
import React from "react";
import { FormItem } from "./ProfileStyle";

export default function Profile() {
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
      <Form>
        <FormItem label="Username" labelAlign="left">
          <Input
            disabled={true}
            value="phanhuyduong2003"
            style={{ width: 220 }}
          />
        </FormItem>
        <FormItem label="Email" labelAlign="left">
          <Input
            disabled={true}
            value="huyduongphan8@gmail.com"
            style={{ width: 220 }}
          />
        </FormItem>
        <FormItem label="Phone number" labelAlign="left">
          <Input disabled={true} value="0398774605" style={{ width: 220 }} />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          labelAlign="left"
          rules={[
            {
              message: "Please enter your password!",
            },
            {
              pattern: /^\S+$/,
              message: "Password cannot contain whitespace",
            },
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
              message: "Please InputField your confirm password!",
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
        <FormItem style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
