import React, { useState } from "react";
import Search from "./Search/index";
import { Button, Menu, Dropdown } from "antd";
import Logo from "../Assets/img/logo.png";
import AuthModal from "./Authentication/AuthModal";
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { setLogout } from "src/Redux/auth";
import { ReactComponent as LogoIcon } from "src/Assets/img/angel.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoggedIn, username } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(setLogout());
  }
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to={"/profile/" + username}>View Profile</Link>,
        },
        {
          key: "2",
          label: <div onClick={handleLogOut}>Log Out</div>,
        },
      ]}
    />
  );

  return (
    <>
      <div className="header-container">
        <a href="http://localhost:3000/">
          <span className="header-logo">
            <LogoIcon />
            <span>WingMan</span>
          </span>
        </a>
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
          <>
            <Dropdown
              overlay={menu}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <div className="profile-avatar">
                <span>{username !== null && username.charAt(0)}</span>
              </div>
            </Dropdown>
          </>
        )}
      </div>
      <AuthModal visible={isModalVisible} setVisible={setIsModalVisible} />
    </>
  );
};

export default Header;
