import React, { useEffect, useState } from "react";
import { Divider, Tooltip, Modal, Typography } from "antd";
import { API_URL } from "src/Utils/constants";
import anonymousIcon from "src/Assets/img/anonymous.png";
import { ReactComponent as DownvoteIcon } from "../../Assets/img/downvote.svg";
import { ReactComponent as UpvoteIcon } from "../../Assets/img/upvote.svg";
import { ReactComponent as UpvoteIconColored } from "../../Assets/img/arrow-up.svg";
import { ReactComponent as DownvoteIconColored } from "../../Assets/img/arrow-down.svg";
import { ReactComponent as SaveIconColored } from "../../Assets/img/bookmark.svg";
import { ReactComponent as SaveIcon } from "../../Assets/img/save.svg";
import { CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import axios from "src/Utils/axiosConfig";
import { useAppSelector } from "src/Redux/hooks";
import Notification from "../Utils/Notification";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostCard = ({id, title, description, author, media, tags, comments, ratings, timestamp, edited}) => {
    const [timeDifference, setTimeDifference] = useState({
        days: null,
        hours: null,
        minutes: null,
      });
    const navigate = useNavigate();

      const getPost = () => {
        navigate(`/post/${id}`);
      };
  return (
    <>
      <div className="feed-card-container">
        <div className="feed-header">
          <div>
            <div className="feed-author">
              {author !== null ? (
                <>
                  <div className="feed-author-avtaar">
                    <span>{author!==null && author!==undefined && author.charAt(0)}</span>
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
              <div className="separator-dot"></div>
              <div className="post-timestamp">
                {timeDifference.days !== null && timeDifference.days > 0 && (
                  <>
                    {timeDifference.days} day
                    {timeDifference.days > 1 ? "s" : ""} ago
                  </>
                )}
                {timeDifference.days !== null &&
                  timeDifference.days <= 0 &&
                  timeDifference.hours > 0 && (
                    <>
                      {timeDifference.hours} hour
                      {timeDifference.hours > 1 ? "s" : ""} ago
                    </>
                  )}
                {timeDifference.days !== null &&
                  timeDifference.days <= 0 &&
                  timeDifference.hours <= 0 &&
                  timeDifference.minutes > 0 && (
                    <>
                      {timeDifference.minutes} minute
                      {timeDifference.minutes > 1 ? "s" : ""} ago
                    </>
                  )}
                {timeDifference.days !== null &&
                  timeDifference.days <= 0 &&
                  timeDifference.hours <= 0 &&
                  timeDifference.minutes <= 0 && <>a few seconds ago</>}
              </div>
              {edited && <div> (edited)</div>}
            </div>
            <div className="feed-title" onClick={getPost}>
              {title}
            </div>
            {tags.length > 0 &&tags[0]!=="" && (
              <div className="feed-tags" onClick={getPost}>
                {tags.length > 0 &&
                  tags
                    .filter((tag, _) => tag.trim() !== "")
                    .map((tag, index) => <span key={"" + index}>{tag}</span>)}
              </div>
            )}
          </div>
        </div>
        <div onClick={getPost}>
          {media.length > 0 ? (
            <div className="media">
              <img src={API_URL + media[0]} alt="media" />
            </div>
          ) : (
            <div className="feed-description">{description}</div>
          )}
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <div className="feed-footer">
          <Tooltip placement="top" title="Comments">
            <div className="comments" onClick={getPost}>
              <CommentOutlined
                style={{
                  fontSize: "20px",
                  marginRight: "5px",
                }}
              />{" "}
              {comments} Comments
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Votes">
            <div className="votes" onClick={getPost}>
              <CommentOutlined
                style={{
                  fontSize: "20px",
                  marginRight: "5px",
                }}
              />{" "}
              {ratings} Votes
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export default PostCard