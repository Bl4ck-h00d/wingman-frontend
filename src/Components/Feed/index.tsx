import React, { useEffect, useState } from "react";
import axios from "src/Utils/axiosConfig";
import FeedCard from "./FeedCard";
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { setPostsList, setShowSearchFeed } from "src/Redux/postModal";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const loaderIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
);
const FeedContainer = () => {
  const dispatch = useAppDispatch();
  //STATE DEFINITIONS
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, token } = useAppSelector((state) => state.authModal);
  const { postsList, showSearchFeed } = useAppSelector(
    (state) => state.postModal
  );

  //API CALLS
  const getFeed = async () => {
    const response = await axios.get("/api/get-posts", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    //CHECK FOR POSTS CURRENT USER HAS RATED/SAVED
    let tempFeed = [];

    if (isLoggedIn) {
      const postSavedData = response.data.pop();
      const postRatingData = response.data.pop();

      for (let i = 0; i < data.length; i++) {
        let tempPost = data[i];
        tempPost["userRating"] = 0;
        for (let j = 0; j < postRatingData?.postsLiked.length; j++) {
          if (tempPost.id === postRatingData.postsLiked[j].postid) {
            tempPost["userRating"] = Number(
              postRatingData.postsLiked[j].rating
            );
            break;
          }
        }
        tempPost["saved"] = false;
        for (let j = 0; j < postSavedData.postsSaved.length; j++) {
          if (tempPost.id === postSavedData.postsSaved[j].postid) {
            tempPost["saved"] = true;
            break;
          }
        }
        tempFeed.push(tempPost);
      }
    } else {
      tempFeed = data;
    }
    setLoading(false);
    dispatch(setPostsList(tempFeed));
  };

  useEffect(() => {
    setLoading(true);
    if (!showSearchFeed) {
      getFeed();
    }
  }, [isLoggedIn, showSearchFeed]);

  return (
    <>
      <div className="feed-container">
        {loading && <Spin className="loader" indicator={loaderIcon} />}
        {!loading &&
          postsList.length > 0 &&
          postsList.map((post, _) => (
            <FeedCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              author={post.username}
              media={post.media}
              ratings={post.ratings}
              userRating={post.userRating}
              comments={post.comments}
              tags={post.tags}
              saved={post.saved}
              timestamp={post.timestamp}
              edited={post.edited}
            />
          ))}
        {!loading && postsList.length === 0 && (
          <div className="no-post">No Posts &#128542;</div>
        )}
      </div>
    </>
  );
};

export default FeedContainer;
