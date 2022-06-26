import React, { useEffect, useState } from "react";
import { Divider, Tooltip, Modal, Typography } from "antd";
import { API_URL } from "src/utils/constants";
import anonymousIcon from "src/assets/img/anonymous.png";
import { ReactComponent as DownvoteIcon } from "../../assets/img/downvote.svg";
import { ReactComponent as UpvoteIcon } from "../../assets/img/upvote.svg";
import { ReactComponent as UpvoteIconColored } from "../../assets/img/upvote-colored.svg";
import { ReactComponent as DownvoteIconColored } from "../../assets/img/downvote-colored.svg";
import { ReactComponent as SaveIcon } from "../../assets/img/save.svg";
import { ReactComponent as SaveIconColored } from "../../assets/img/save-colored.svg";
import { CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import axios from "src/utils/axiosConfig";
import { useAppSelector } from "src/redux/hooks";
import Notification from "../Utils/Notification";

const { Paragraph } = Typography;

interface FeedCardInterface {
  id: string;
  title: string;
  description: string;
  author?: string | null;
  media?: string[] | null;
  ratings?: number;
  userRating?: number;
  comments?: number | null;
  tags?: string[] | null;
}

const FeedCard = ({
  id,
  title,
  description,
  author,
  media,
  ratings,
  userRating,
  comments,
  tags,
}: FeedCardInterface) => {
  const [ratingsCount, setRatingsCount] = useState(Number(ratings));
  const [userVote, setUserVote] = useState(Number(userRating)); //1,-1,0
  const [isSavedPost, setIsSavedPost] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoggedIn, token } = useAppSelector((state) => state.authModal);

  const updateRatings = async (newUserVote) => {
    const response = await axios.put(
      `/api/ratings/${id}`,
      { userVote: newUserVote },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const loginCheck = () => {
    if (!isLoggedIn) {
      Notification("warning", "Warning", "Please Login before creating a post");
      return false;
    }
    return true;
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpvote = () => {
    if (!loginCheck()) {
      return;
    }
    let newUserVote = 0;
    setRatingsCount((prevState) => prevState - userVote);
    if (userVote !== 1) {
      setUserVote(1);
      newUserVote = 1;
    } else {
      setUserVote(0);
      newUserVote = 0;
    }
    updateRatings(newUserVote);
  };

  const handleDownvote = () => {
    if (!loginCheck()) {
      return;
    }
    setRatingsCount((prevState) => prevState - userVote);
    let newUserVote = 0;
    if (userVote !== -1) {
      setUserVote(-1);
      newUserVote = -1;
    } else {
      setUserVote(0);
      newUserVote = 1;
    }
    updateRatings(newUserVote);
  };

  const handleSavePost = () => {
    if (!loginCheck()) {
      return;
    }
    setIsSavedPost((prevState) => !prevState);
  };

  return (
    <>
      <div className="feed-card-container">
        <div className="feed-header">
          <div className="feed-ratings">
            {userVote === 1 ? (
              <>
                <UpvoteIconColored
                  className="upvoteIcon"
                  style={{ width: "25px", height: "25px" }}
                  onClick={handleUpvote}
                />
              </>
            ) : (
              <>
                <UpvoteIcon
                  className="upvoteIcon"
                  style={{ width: "25px", height: "25px" }}
                  onClick={handleUpvote}
                />
              </>
            )}

            {ratingsCount}
            {userVote === -1 ? (
              <>
                <DownvoteIconColored
                  className="downvoteIcon"
                  style={{ width: "25px", height: "25px" }}
                  onClick={handleDownvote}
                />
              </>
            ) : (
              <>
                <DownvoteIcon
                  className="downvoteIcon"
                  style={{ width: "25px", height: "25px" }}
                  onClick={handleDownvote}
                />
              </>
            )}
          </div>
          <div>
            <div className="feed-author">
              {author !== null ? (
                <>
                  <div className="feed-author-avtaar">
                    <span>{author.charAt(0)}</span>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={anonymousIcon}
                    alt="avtaar"
                    width="18px"
                    height="15px"
                  />
                </>
              )}
              {author !== null ? <>Posted by {author}</> : <>Anonymous</>}
            </div>
            <div className="feed-title">{title}</div>
            <div className="feed-tags">
              {tags.length > 0 &&
                tags
                  .filter((tag, _) => tag.trim() !== "")
                  .map((tag, index) => <span key={"" + index}>{tag}</span>)}
            </div>
          </div>
        </div>
        {media.length > 0 ? (
          <div className="media">
            <img src={API_URL + media[0]} alt="media" />
          </div>
        ) : (
          <div className="feed-description">{description}</div>
        )}
        <Divider style={{ margin: "10px 0" }} />
        <div className="feed-footer">
          <Tooltip placement="top" title="Comments">
            <div className="comments">
              <CommentOutlined
                style={{
                  fontSize: "20px",
                  marginRight: "5px",
                }}
              />{" "}
              {comments} Comments
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Save Post">
            <div className="save">
              {isSavedPost === true ? (
                <SaveIconColored
                  style={{ width: "21px", height: "21px", marginRight: "5px" }}
                  onClick={handleSavePost}
                />
              ) : (
                <SaveIcon
                  style={{ width: "21px", height: "21px", marginRight: "5px" }}
                  onClick={handleSavePost}
                />
              )}
              Save
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Share Post">
            <div className="share">
              <ShareAltOutlined
                style={{
                  fontSize: "20px",
                  marginRight: "5px",
                }}
                onClick={showModal}
              />
              Share
            </div>
          </Tooltip>
        </div>
      </div>
      <Modal
        title="Share"
        visible={isModalVisible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="share-input-container">
          <Paragraph copyable>{}</Paragraph>
        </div>
      </Modal>
    </>
  );
};

export default FeedCard;
