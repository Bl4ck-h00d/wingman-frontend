import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "src/utils/axiosConfig";
import { useAppSelector } from "src/redux/hooks";
import { Tooltip, Divider, Spin } from "antd";
import { API_URL } from "src/utils/constants";
import Notification from "../Utils/Notification";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";
import anonymousIcon from "src/assets/img/anonymous.png";
import moment from "moment";
import { ReactComponent as DownvoteIcon } from "../../assets/img/downvote.svg";
import { ReactComponent as UpvoteIcon } from "../../assets/img/upvote.svg";
import { ReactComponent as UpvoteIconColored } from "../../assets/img/upvote-colored.svg";
import { ReactComponent as DownvoteIconColored } from "../../assets/img/downvote-colored.svg";
import { ReactComponent as SaveIcon } from "../../assets/img/save.svg";
import { ReactComponent as SaveIconColored } from "../../assets/img/save-colored.svg";
import {
  CommentOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const LoadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const PostSection = () => {
  const { id } = useParams();
  const { token, isLoggedIn } = useAppSelector((state) => state.authModal);
  const [loading, setLoading] = useState(true);
  const { editComment } = useAppSelector((state) => state.commentModal);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (editComment) {
      scrollRef.current.scrollIntoView();
    }
  }, [editComment]);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [post, setPost] = useState({
    id: null,
    title: null,
    description: null,
    author: null,
    media: null,
    ratings: 0,
    userRating: 0,
    comments: null,
    tags: null,
  });
  const [userVote, setUserVote] = useState(0);
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLiked, setCommentsLiked] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [timeDifference, setTimeDifference] = useState({
    days: null,
    hours: null,
    minutes: null,
  });
  const [isSavedPost, setIsSavedPost] = useState(false);

  const getPostById = async () => {
    const response = await axios.get(`/api/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    setPost({ ...data[0]["post"][0] });
    setUserVote(Number(data[1]["userRating"]));
    setCommentsLiked(data[2]["comments"].pop()["commentsLiked"]);
    setCommentsData(data[2]["comments"]);
    setTimestamp(data[0]["post"][0]["timestamp"]);
  };

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

  useEffect(() => {
    getPostById();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setRatingsCount(Number(post.ratings));
    if (timestamp !== "") {
      const postTime = moment(
        moment.utc(timestamp).format("DD-MMM-YYYY HH:mm")
      );
      const currentTime = moment(moment.utc().format("DD-MMM-YYYY HH:mm"));
      const duration = moment.duration(currentTime.diff(postTime));

      var days = duration.asDays();
      var hours = duration.hours();
      var minutes = duration.minutes();

      setTimeDifference({
        days: Math.floor(days),
        hours: hours,
        minutes: minutes,
      });
    }
  }, [post, timestamp]);

  const loginCheck = () => {
    if (!isLoggedIn) {
      Notification("warning", "Warning", "Please Login before creating a post");
      return false;
    }
    return true;
  };

  const handleSavePost = () => {
    if (!loginCheck()) {
      return;
    }
    setIsSavedPost((prevState) => !prevState);
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
    setRatingsCount((prevState) => prevState + newUserVote);

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
    setRatingsCount((prevState) => prevState + newUserVote);

    updateRatings(newUserVote);
  };

  return (
    <>
      {loading && <Spin className="loader" indicator={LoadingIcon} />}
      {!loading && (
        <div className="post-container-parent">
          <div className="post-container">
            <div className="post-header">
              <div className="post-ratings">
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
                <div className="post-author">
                  {post.author !== null ? (
                    <>
                      <div className="post-author-avtaar">
                        <span>{post.author.charAt(0)}</span>
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
                  {post.author !== null ? (
                    <>
                      Posted by{" "}
                      <span className="author-name">{post.author}</span>
                    </>
                  ) : (
                    <>Anonymous</>
                  )}
                  <div className="post-timestamp">
                    {timeDifference.days !== null &&
                      timeDifference.days > 0 && (
                        <>{timeDifference.days} days go</>
                      )}
                    {timeDifference.days !== null &&
                      timeDifference.days <= 0 &&
                      timeDifference.hours > 0 && (
                        <>{timeDifference.hours} hours ago</>
                      )}
                    {timeDifference.days !== null &&
                      timeDifference.days <= 0 &&
                      timeDifference.hours <= 0 &&
                      timeDifference.minutes > 0 && (
                        <>{timeDifference.minutes} minutes ago</>
                      )}
                    {timeDifference.days !== null &&
                      timeDifference.days <= 0 &&
                      timeDifference.minutes <= 0 && <>a few seconds ago</>}
                  </div>
                  <div className="header-menu" style={{ marginLeft: "55%" }}>
                    <EllipsisOutlined
                      style={{ fontSize: "20px", cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="post-title">{post.title}</div>
                <div className="post-tags">
                  {post.tags &&
                    post.tags.length > 0 &&
                    post.tags
                      .filter((tag, _) => tag.trim() !== "")
                      .map((tag, index) => <span key={"" + index}>{tag}</span>)}
                </div>
              </div>
            </div>

            <div className="post-description">{post.description}</div>
            <div className="post-media">
              {post.media &&
                post.media.map((image, _) => {
                  return (
                    <div className="post-image-container">
                      <img src={API_URL + image} alt="media" />
                    </div>
                  );
                })}
            </div>
            <div ref={scrollRef}></div>
            <Divider style={{ margin: "10px 0" }} />
            <div className="post-footer">
              <div className="comments">
                <CommentOutlined
                  style={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />{" "}
                {commentsData.length} Comments
              </div>
              <Tooltip placement="top" title="Save Post">
                <div className="save" onClick={handleSavePost}>
                  {isSavedPost === true ? (
                    <SaveIconColored
                      style={{
                        width: "21px",
                        height: "21px",
                        marginRight: "5px",
                      }}
                    />
                  ) : (
                    <SaveIcon
                      style={{
                        width: "21px",
                        height: "21px",
                        marginRight: "5px",
                      }}
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
                  />
                  Share
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="post-comments-container">
            <CommentEditor postId={id} addComment={setCommentsData} />
            {commentsData.length > 0 && (
              <CommentList
                commentsData={commentsData}
                commentsLiked={commentsLiked}
                postId={id}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostSection;
