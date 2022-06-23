import React from "react";
import Search from "./Search/index";
import { Button } from "antd";
import  Logo  from "../assets/img/logo.png";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <span className="header-logo">
          <img src={Logo} alt="Wingman chat" width="140px" height="40px" />
        </span>
        <Search />
        <Button className="btn-bg-gradient signup-btn" type="primary">
          SignUp
        </Button>
      </div>
    </>
  );
};

export default Header;
