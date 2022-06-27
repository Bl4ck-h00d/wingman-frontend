import React, { useState } from "react";
import moment from "moment";
import { Comment, List, Tooltip, Avatar } from "antd";
import Notification from "../Utils/Notification";
import axios from "src/utils/axiosConfig";
import { useAppSelector } from "src/redux/hooks";
import { ReactComponent as DownvoteIcon } from "../../assets/img/downvote.svg";
import { ReactComponent as UpvoteIcon } from "../../assets/img/upvote.svg";
import { ReactComponent as UpvoteIconColored } from "../../assets/img/upvote-colored.svg";
import { ReactComponent as DownvoteIconColored } from "../../assets/img/downvote-colored.svg";

//Utility Stuff
const randomColor = [
  { backgroundColor: "#fde3cf", color: "#f56a00" },
  { backgroundColor: "#f4c2de", color: "rgb(237 48 211)" },
  { backgroundColor: "#c2dff4", color: "rgb(7 168 213)" },
  { backgroundColor: "#d6f4c2", color: "rgb(9 181 3)" },
  { backgroundColor: "#f1f0b3", color: "rgb(198 170 0)" },
  { backgroundColor: "#f6bdbd", color: "rgb(198 0 24)" },
];

const getTimeDifference = (timestamp) => {
  if (timestamp !== "") {
    const postTime = moment(moment.utc(timestamp).format("DD-MMM-YYYY HH:mm"));
    const currentTime = moment(moment.utc().format("DD-MMM-YYYY HH:mm"));
    const duration = moment.duration(currentTime.diff(postTime));

    var days = duration.asDays();
    var hours = duration.hours();
    var minutes = duration.minutes();

    return {
      days: Math.floor(days),
      hours: hours,
      minutes: minutes,
    };
  }
};

const CommentComponent = ({ comment, ratings, vote, postId }) => {
  const randIndex = Number(comment.id) % randomColor.length;

  const { token, isLoggedIn, username } = useAppSelector(
    (state) => state.authModal
  );

  const [ratingsCount, setRatingsCount] = useState(Number(comment.ratings));
  const [userVote, setUserVote] = useState(Number(vote));

  const loginCheck = () => {
    if (!isLoggedIn) {
      Notification("warning", "Warning", "Please Login before creating a post");
      return false;
    }
    return true;
  };

  const updateRatings = async (newUserVote, id) => {
    const response = await axios.put(
      `/api/comments/ratings/${id}`,
      { userVote: newUserVote, postId: postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

    updateRatings(newUserVote, comment.id);
  };

  const handleDownvote = () => {
    if (!loginCheck()) {
      return;
    }
    let newUserVote = 0;
    setRatingsCount((prevState) => prevState - userVote);
    if (userVote !== -1) {
      setUserVote(-1);
      newUserVote = -1;
    } else {
      setUserVote(0);
      newUserVote = 0;
    }
    setRatingsCount((prevState) => prevState + newUserVote);

    updateRatings(newUserVote, comment.id);
  };

  const renderAction = [
    <div className="comment-ratings">
      {userVote === 1 ? (
        <>
          <UpvoteIconColored
            className="upvoteIcon"
            style={{ width: "17px", height: "17px" }}
            onClick={handleUpvote}
          />
        </>
      ) : (
        <>
          <UpvoteIcon
            className="upvoteIcon"
            style={{ width: "17px", height: "17px" }}
            onClick={handleUpvote}
          />
        </>
      )}

      {ratingsCount}
      {userVote === -1 ? (
        <>
          <DownvoteIconColored
            className="downvoteIcon"
            style={{ width: "17px", height: "17px" }}
            onClick={handleDownvote}
          />
        </>
      ) : (
        <>
          <DownvoteIcon
            className="downvoteIcon"
            style={{ width: "17px", height: "17px" }}
            onClick={handleDownvote}
          />
        </>
      )}
    </div>,
  ];

  const renderTimestamp = (timestamp) => {
    const timeDifference = getTimeDifference(timestamp);
    return (
      <>
        {" "}
        <div>
          {timeDifference.days !== null && timeDifference.days > 0 && (
            <>{timeDifference.days} days go</>
          )}
          {timeDifference.days !== null &&
            timeDifference.days <= 0 &&
            timeDifference.minutes > 0 && (
              <>{timeDifference.minutes} minutes ago</>
            )}
          {timeDifference.days !== null &&
            timeDifference.days <= 0 &&
            timeDifference.minutes <= 0 && <>a few seconds ago</>}
        </div>
      </>
    );
  };

  return (
    <>
      <Comment
        author={comment["author"]}
        actions={renderAction}
        avatar={
          <Avatar
            style={{
              color: randomColor[randIndex].color,
              backgroundColor: randomColor[randIndex].backgroundColor,
              textTransform: "capitalize",
            }}
          >
            {comment["author"].charAt(0)}
          </Avatar>
        }
        content={comment["comment"]}
        datetime={renderTimestamp(comment["timestamp"])}
      />
    </>
  );
};

export default CommentComponent;
