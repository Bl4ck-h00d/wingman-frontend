import React from "react";
import Search from "./search/index";
import { Button } from "antd";
import  Logo  from "../assets/img/logo.png";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <span className="header-logo">
          <a href="http://localhost:3000/"><img src={Logo} alt="Wingman chat" width="140px" height="40px" /></a>
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
