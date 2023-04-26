import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import React, { useState } from "react";

export default function Content() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        padding: '0 90px'
      }}
    >
      <img
        src="https://d1gymyavdvyjgt.cloudfront.net/drive/images/uploads/headers/ws_cropper/1_0x0_790x520_0x520_bay_parking_guide.jpg"
        alt="car" style={{width: '100%', height: '600px'}}
      />
      <h1 style={{ color: "#1677ff" }}>Booking Car Space</h1>
      <Form
        layout="horizontal"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        style={{
          width: 500,
        }}
      >
        <Form.Item
          name="name"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter license plates",
            },
          ]}
          name="license plates"
        >
          <Input placeholder="Enter license plates. Example: 30A11285" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please choose car parking",
            },
          ]}
          name="car parking"
        >
          <Select placeholder="Choose car parking">
            <Select.Option value="#1">Phenikaa University</Select.Option>
            <Select.Option value="#2">
              Duong Noi Apartment Building
            </Select.Option>
            <Select.Option value="#3">Xuan Mai Spark Tower</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please choose date",
            },
          ]}
          name="date"
        >
          <DatePicker placeholder="Choose date" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" htmlType="submit">
            Checkout
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
