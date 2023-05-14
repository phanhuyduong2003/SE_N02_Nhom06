import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
} from "antd";
import React from "react";

export default function Content() {
  const handleCheckout = (data) => {
    const date = data.date.toDate();
    const parking = data['car-parking']
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    // console.log(time);
    // console.log(data);
    console.log(`${time}\n ${parking}`);
  }
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        padding: "0 90px",
      }}
    >
      <img
        src="https://tfw.wales/sites/default/files/2021-05/Car%20Parking.jpeg"
        alt="car"
        style={{paddingBottom: 10}}
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(136, 136, 136, 0.793)",
          padding: 20,
          borderRadius: 6,
        }}
      >
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
          onFinish={handleCheckout}
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
            name="car-parking"
          >
            <Select placeholder="Choose car parking">
              <Select.Option value="Phenikaa University">
                Phenikaa University
              </Select.Option>
              <Select.Option value="Duong Noi Apartment Building">
                Duong Noi Apartment Building
              </Select.Option>
              <Select.Option value="Xuan Mai Spark Tower">
                Xuan Mai Spark Tower
              </Select.Option>
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
    </div>
  );
}
