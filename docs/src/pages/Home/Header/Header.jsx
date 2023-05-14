import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate("/");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const handleLogout = () => {
    // localStorage.removeItem("isLoggedIn");
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
          style={{ height: 60, width: 160 }}
        />
      ),
    },
    {
      label: <Link to="">My Reservation</Link>,
      key: "booking",
    },
    {
      label: <Link to="/about">About</Link>,
      key: "about",
    },
  ];
  const items_right_notLoggedIn = [
    {
      key: "Search",
      label: (
        <Input
          style={{ width: 300 }}
          placeholder="Enter car parking name or address"
          prefix={<SearchOutlined />}
        />
      ),
    },
    {
      key: "Account",
      icon: <UserOutlined />,
      children: [
        { label: <Link to="/signin">Login</Link> },
        { label: <Link to="/signup">Register</Link> },
      ],
    },
  ];
  const items_right_LoggedIn = [
    {
      key: "Search",
      label: (
        <Input
          style={{ width: 300 }}
          placeholder="Enter car parking name or address"
          prefix={<SearchOutlined />}
        />
      ),
    },
    {
      key: "Account",
      icon: <UserOutlined />,
      children: [
        { label: <Link to='/profile'>Profile</Link> },
        {
          label: <Link onClick={handleLogout}>Logout</Link>,
        },
      ],
    },
  ];
  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", padding: "10px 90px" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
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
          selectedKeys={[current]}
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
  } else {
    return (
      <div style={{ display: "flex", padding: "10px 90px" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
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
          selectedKeys={[current]}
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
