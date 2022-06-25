import React, { useState } from "react";
import Search from "./search/index";
import Logo from "../assets/img/logo.png";
import { Tabs, Button, Checkbox, Form, Input, Modal } from "antd";
import AuthModal from "./Authentication/AuthModal";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <div className="header-container">
        <span className="header-logo">
          <a href="http://localhost:3000/">
            <img src={Logo} alt="Wingman chat" width="140px" height="40px" />
          </a>
        </span>
        <Button
          type="primary"
          onClick={()=>setIsModalVisible(true)}
          className="btn-bg-gradient signup-btn"
        >
          Login
        </Button>
      </div>
      <AuthModal visible={isModalVisible} setVisible={setIsModalVisible}/>
    </>
  );
};

export default Header;
