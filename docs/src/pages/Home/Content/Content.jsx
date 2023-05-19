import { Button, DatePicker, Form, Input, Select } from "antd";
import { getAuth } from "firebase/auth";
import { child, getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
const { RangePicker } = DatePicker;

export default function Content() {
  const check = localStorage.getItem('isLoggedIn') === 'true'
  const handleCheckout = async (data) => {
    if (check) {
      
      try {
        const database = getFirestore()
      const reservation = collection(database, 'reservations')
      const reservationData = {
        name: data.name,
        license: data.license,
        parking: data["car-parking"],
        start: data.date[0].format("DD/MM/YYYY HH:mm"),
        end: data.date[1].format("DD/MM/YYYY HH:mm"),
      };
      await addDoc(reservation, reservationData)
      console.log(reservation);
    } catch (error) {
      console.log(error);
    }
  } else {
      Swal.fire({
        title: 'Bạn chưa đăng nhập',
        text: 'Vui lòng đăng nhập để đặt chỗ',
        timer: 3000,
        confirmButtonColor: '#1677ff',
        icon: 'error',
      })
  }
  };
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
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(136, 136, 136, 0.793)",
          padding: 20,
          borderRadius: 6,
          width: 500,
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
            maxWidth: 1000,
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
            name="license"
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
                message: "Please choose date and time",
              },
            ]}
            name="date"
          >
            <RangePicker
              showTime
              showSecond={false}
              format="DD/MM/YYYY HH:mm"
              placeholder={[
                "Choose date and time start",
                "Choose date and time end",
              ]}
              ref={""}
              style={{ width: "100%" }}
            />
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
