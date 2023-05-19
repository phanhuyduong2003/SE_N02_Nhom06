import { Button, DatePicker, Form, Input, Select } from "antd";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { H11, H12 } from "./ContentStyle";
import { useForm } from "antd/es/form/Form";
const { RangePicker } = DatePicker;

export default function Content() {
  const check = localStorage.getItem("isLoggedIn") === "true";
  const [form] = useForm();
  const handleCheckout = async (data) => {
    if (check) {
      try {
        const database = getFirestore();
        const reservation = collection(database, "reservations");
        const reservationData = {
          name: data.name,
          license: data.license,
          parking: data["car-parking"],
          start: data.date[0].format("DD/MM/YYYY HH:mm"),
          end: data.date[1].format("DD/MM/YYYY HH:mm"),
        };
        await addDoc(reservation, reservationData);
        console.log(reservation);
        
        Swal.fire({
          title: "Đặt chỗ thành công",
          text: "Bạn có thể kiểm tra thông tin tại trang Quản lý đặt chỗ",
          icon: 'success',
          confirmButtonColor: "#1677ff",
          timer: 2000,
        });
        form.resetFields();
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để đặt chỗ",
        timer: 3000,
        confirmButtonColor: "#1677ff",
        icon: "error",
      });
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
        minHeight: "90vh",
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
          backgroundColor: "rgb(255, 255, 255)",
          transform: "translate(-50%, -50%)",
          left: "25%",
          top: "50%",
          padding: 20,
          borderRadius: 6,
          width: 500,
        }}
      >
        <h1 style={{ color: "#1677ff" }}>Đặt Chỗ Đỗ Xe</h1>
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
          form={form}
        >
          <Form.Item
            name="name"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên",
              },
            ]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng nhập biển số xe",
              },
            ]}
            name="license"
          >
            <Input placeholder="Nhập biển số xe. Ví dụ: 30K16828" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng lựa chọn bãi đỗ xe",
              },
            ]}
            name="car-parking"
          >
            <Select placeholder="Chọn bãi đỗ xe">
              <Select.Option value="Phenikaa University">
                Trường Đại học Phenikaa
              </Select.Option>
              <Select.Option value="Duong Noi Apartment Building">
                Chung cư Dương Nội
              </Select.Option>
              <Select.Option value="Xuan Mai Spark Tower">
                Chung cư Xuân Mai
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày và giờ",
              },
            ]}
            name="date"
          >
            <RangePicker
              showTime
              showSecond={false}
              format="DD/MM/YYYY HH:mm"
              placeholder={["Chọn thời gian gửi xe", "Chọn thời gian lấy xe"]}
              ref={""}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Đặt chỗ
            </Button>
          </Form.Item>
        </Form>
      </div>
      <H11 className="fast">Nhanh chóng</H11>
      <H12 className="convenient"
      >
        Thuận tiện
      </H12>
    </div>
  );
}
