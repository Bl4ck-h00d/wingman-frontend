import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Switch, Form, Input, Divider, Spin } from "antd";
import { LoadingOutlined, WarningTwoTone } from "@ant-design/icons";
import TagField from "./tagField";
const { TextArea } = Input;

const CreatePost = () => {
  const [submitLoader, setSubmitLoader] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [postAnonymously, setPostAnonymously] = useState<boolean>(false);

  useEffect(() => {
    if (submitLoader) {
      setTimeout(() => {
        setSubmitLoader(false);
      }, 3000);
    }
  }, [submitLoader]);

  const onFinish = (values: any) => {
    values = { ...values, tags: tags, anonymous: postAnonymously };
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loaderIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="create-post-container"
    >
      <h1 className="heading">Create a new post!</h1>
      <Divider />
      <div className="warning-text">
        <WarningTwoTone twoToneColor="red" /> Please make sure you respect the
        privacy of the others and blur the names and images.
      </div>
      <Form
        className="form-container"
        name="newPost"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input title of the post" },
          ]}
        >
          <Input
            placeholder="Title of the post"
            size="large"
            showCount
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Describe your post",
            },
          ]}
        >
          <TextArea
            placeholder="Give context of the conversation, so that people can help you better"
            rows={4}
            maxLength={6}
          />
        </Form.Item>

        <Form.Item
          label="Add Tags"
          name="tags"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TagField setTagsProp={setTags} />
        </Form.Item>

        <Form.Item label="Post Anonymously" valuePropName="anonymous">
          <Switch
            style={{ marginLeft: "10px" }}
            checked={postAnonymously}
            onChange={() => setPostAnonymously((prevState) => !prevState)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            className="btn-bg-gradient"
            htmlType="submit"
            onClick={() => setSubmitLoader(true)}
          >
            {submitLoader ? <Spin indicator={loaderIcon} /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default CreatePost;
