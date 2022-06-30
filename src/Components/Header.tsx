import React, { useState } from "react";
import Search from "./Search/index";
import { Button } from "antd";
import Logo from "../Assets/img/logo.png";
import AuthModal from "./Authentication/AuthModal";
import { useAppSelector } from "src/Redux/hooks";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.authModal);
  return (
    <>
      <div className="header-container">
        <span className="header-logo">
          <a href="http://localhost:3000/">
            <img src={Logo} alt="Wingman chat" width="140px" height="40px" />
          </a>
        </span>
        <Search />
        {!isLoggedIn ? (
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="btn-bg-gradient signup-btn"
          >
            Login
          </Button>
        ) : (
          <></>
        )}
      </div>
      <AuthModal visible={isModalVisible} setVisible={setIsModalVisible} />
    </>
  );
};

export default Header;