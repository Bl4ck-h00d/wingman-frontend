import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button, Switch, Form, Input, Divider, Spin, Modal } from "antd";
import {
  LoadingOutlined,
  WarningTwoTone,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import TagField from "./TagFormField";
import UploadImage from "./UploadImage";
import ImageEditor from "../Editor";
const { TextArea } = Input;

const CreatePost = () => {
  const [submitLoader, setSubmitLoader] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [postAnonymously, setPostAnonymously] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tool, setTool] = useState("move");
  const [currentImage, setCurrentImage] = useState({
    index: 0,
    image: {
      imageUrl: "",
      file: {},
      uri: null,
    },
  });

  const saveEditImage = (file, index) => {
    const newImageList = images;
    newImageList[index] = file;
    setImages(newImageList);
  };

  const showModal = (image, index) => {
    setCurrentImage({ index: index, image: image });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (submitLoader) {
      setTimeout(() => {
        setSubmitLoader(false);
      }, 3000);
    }
  }, [submitLoader]);

  const handleDelete = (id) => {
    const newImageList = images.filter((image, index) => {
      if (index !== id) return true;
      return false;
    });

    setImages((prevState) => newImageList);
  };

  const onFinish = (values: any) => {
    values = {
      ...values,
      tags: tags,
      anonymous: postAnonymously,
      images: images,
    };
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
        <WarningTwoTone twoToneColor="red" style={{ marginRight: "8px" }} />{" "}
        Please make sure you respect the privacy of the others and blur the
        names and images.
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
            maxLength={500}
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

        <Form.Item label="Add Images" name="images">
          <>
            <UploadImage onChange={setImages} images={images} />
            <div className="image-list">
              {images.length > 0 &&
                images.map((image, index) => {
                  return (
                    <div key={"" + image.imageUrl} className="image-container">
                      <img src={image.uri || image.imageUrl} alt="" />
                      <span className="edit-btn">
                        <EditOutlined
                          style={{ fontSize: "25px", cursor: "pointer" }}
                          onClick={() => showModal(image, index)}
                        />
                        <DeleteOutlined
                          style={{ fontSize: "25px", cursor: "pointer" }}
                          onClick={() => handleDelete(index)}
                        />
                      </span>
                    </div>
                  );
                })}
            </div>
          </>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            className="btn-bg-gradient submit-btn"
            htmlType="submit"
            onClick={() => setSubmitLoader(true)}
          >
            {submitLoader ? <Spin indicator={loaderIcon} /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Edit Image"
        visible={isModalVisible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ overflow: tool === "move" ? "hidden" : "auto" }}
      >
        <ImageEditor
          uri={currentImage.image?.uri || currentImage.image?.imageUrl}
          editScreen={saveEditImage}
          index={currentImage.index}
          setIsModalVisible={setIsModalVisible}
          setSelectedTool={setTool}
        />
      </Modal>
    </motion.div>
  );
};

export default CreatePost;
