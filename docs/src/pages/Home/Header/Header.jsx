import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/')
    localStorage.setItem("isLoggedIn", 'false');
    window.location.reload();
  };
  const items_left = [
    {
      label: <Link to="/"></Link>,
      key: "logo",
      icon: (
        <img
          src="https://img.freepik.com/premium-vector/car-parking-sign-parking-space-icon-parking-lot-car-parking-flat-style-vector-illustration-web-element_435184-1157.jpg"
          alt="logo"
          style={{ maxWidth: '60px', maxHeight: '100px' }}
        />
      ),
    },
    {
      label: <Link to="/reservation">Quản lý đặt chỗ</Link>,
      key: "booking",
    },
    {
      label: <Link to="/about">Về chúng tôi</Link>,
      key: "about",
    },
  ];
  const items_right_notLoggedIn = [
    {
      key: "Search",
      label: (
        <Input
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
        />
      ),
    },
    {
      key: "Account",
      icon: <UserOutlined />,
      children: [
        { label: <Link to="/signin">Đăng nhập</Link> },
        { label: <Link to="/signup">Đăng kí</Link> },
      ],
    },
  ];
  const items_right_LoggedIn = [
    {
      key: "Search",
      label: (
        <Input
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          style={{maxWidth: 300}}
        />
      ),
    },
    {
      key: "Account",
      icon: <UserOutlined />,
      children: [
        { label: <Link to='/profile'>Quản lý tài khoản</Link> },
        {
          label: <Link onClick={handleLogout}>Đăng xuất</Link>,
        },
      ],
    },
  ];
  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", padding: "10px 90px", justifyContent: 'space-between' }}>
        <Menu
          mode="horizontal"
          items={items_left}
          style={{
            display: "flex",
            alignItems: "center",
            padding: 5,
            width: "70%",
            border: "none",
          }}
        />
        <Menu
          inline
          items={items_right_notLoggedIn}
          mode="horizontal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            width: "30%",
            border: "none",
            flex: "auto",
          }}
        />
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", padding: "10px 90px" }}>
        <Menu
          mode="horizontal"
          items={items_left}
          style={{
            display: "flex",
            alignItems: "center",
            padding: 5,
            width: "70%",
            border: "none",
          }}
        />
        <Menu
          inline
          items={items_right_LoggedIn}
          mode="horizontal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            width: "30%",
            border: "none",
          }}
        />
      </div>
    );
  }
}
