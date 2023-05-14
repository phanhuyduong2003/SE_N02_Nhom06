import React from "react";

export default function About() {
  return (
    <div style={{ padding: "0 90px" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="https://live-production.wcms.abc-cdn.net.au/d09e614357764f045db8da8fd59e7088"
          alt=""
          style={{ width: 862, height: 575 }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            // left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            maxWidth: "600px",
            textAlign: "justify",
            color: "#1677ff",
          }}
        >
          <p>
            Kinh tế ngày càng phát triển, số lượng phương tiện cá nhân ngày càng
            tăng. Đi kèm với đó là khó khăn trong việc đáp ứng bãi đỗ xe.
          </p>
        </div>
      </div>
    </div>
  );
}
