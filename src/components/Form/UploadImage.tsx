import React, { useEffect, useState } from "react";
import { Row, Col, Upload, Tooltip } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { beforeUploadImage, getBase64 } from "src/utils/commonHelpers";

const { Dragger } = Upload;

const UploadImage = ({ onChange, images }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [imgFile, setImgFile] = useState<any>("");

  const uploadButton = (
    <div>
      <Tooltip title="Upload Images">
        <UploadOutlined /> Upload images
      </Tooltip>
    </div>
  );

  useEffect(() => {
    if (imgUrl) {
      onChange((prevState) => [
        ...prevState,
        {
          file: imgFile,
          imageUrl: imgUrl,
        },
      ]);
    }
    return () => {
      setImgUrl("");
    };
  }, [imgFile, imgUrl, onChange, images]);

  return (
    <div
      className="upload-button"
      style={{ pointerEvents: images.length < 8 ? "auto" : "none" }}
    >
      <Row
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        justify="start"
        gutter={12}
      >
        <Dragger
          name="file"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUploadImage}
          customRequest={(f) => {
            setImgFile(f.file);
            getBase64(f.file, (url) => {
              setImgUrl(url);
            });
          }}
        >
          {uploadButton}
        </Dragger>
      </Row>
    </div>
  );
};

export default UploadImage;
