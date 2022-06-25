import { Tabs, Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = ({ visible , setVisible}) => {
  useEffect(() => {
    setIsModalVisible(visible);
    setVisible(visible);
  }, [visible]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setVisible(false);
  };
  const { TabPane } = Tabs;

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Login" key="1">
          <Login />
        </TabPane>
        <TabPane tab="Signup" key="2">
          <Signup />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;