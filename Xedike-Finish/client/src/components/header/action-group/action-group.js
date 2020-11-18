import React from "react";

export default function ActionGroup() {
  return (
    <div style={{ display: "flex" }}>
      <a
        href="/"
        data-toggle="modal"
        data-target="#modalLogin"
        data-dismiss="modal"
        aria-label="Close"
        className="nav-link toogleModalLogin"
      >
        Đăng nhập
      </a>
      <a data-toggle="modal" data-target="#modalRegister" className="nav-link">
        Đăng ký
      </a>
    </div>
  );
}
