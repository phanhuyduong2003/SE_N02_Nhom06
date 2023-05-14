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
        <h1 style={{ color: "#1677ff" }}>Oops!</h1>
        <span>Sorry, the page you're looking for doesn't exist</span>
      </div>
      <Link to="/">
        <Button type="primary">GO TO HOMEPAGE</Button>
      </Link>
    </div>
  );
}
