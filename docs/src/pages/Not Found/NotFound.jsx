import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        maxHeight: '100vh'
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
                  alignItems: "center",
          padding: '30px 0'
        }}
      >
        <img
          src="https://cdn.dribbble.com/users/458522/screenshots/2835756/media/1b8ff55dd6b77360ae10d9a074c0129f.jpg"
          alt=""
          style={{ height: 400 }}
        />
        <h1 style={{ color: "#1677ff" }}>Ôi hỏng!</h1>
        <span>Trang bạn đang cố truy cập không tồn tại</span>
      </div>
      <Link to="/">
        <Button type="primary">TRỞ VỀ TRANG CHỦ</Button>
      </Link>
    </div>
  );
}
