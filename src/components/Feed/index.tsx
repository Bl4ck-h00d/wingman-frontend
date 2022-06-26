import React, { useEffect, useState } from "react";
import axios from "src/utils/axiosConfig";
import FeedCard from "./FeedCard";
import { useAppSelector } from "src/redux/hooks";

const FeedContainer = () => {
  const [feed, setFeed] = useState([]);
  const [postRatings, setPostRatings] = useState([]);
  const { isLoggedIn, token } = useAppSelector((state) => state.authModal);

  const getFeed = async () => {
    const response = await axios.get("/api/get-posts", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const postRatingData = response.data.pop();
    const data = response.data;

    setPostRatings([...postRatingData.postsLiked]);

    let tempFeed = [];
    for (let post = 0; post < data.length; post++) {
      let tempPost = data[post];
      tempPost["userRating"] = 0;
      for (let rated = 0; rated < postRatingData.postsLiked.length; rated++) {
        if (tempPost.id === postRatingData.postsLiked[rated].postid) {
          tempPost["userRating"] = Number(
            postRatingData.postsLiked[rated].rating
          );
          break;
        }
      }
      tempFeed.push(tempPost);
    }
    setFeed((prevState) => tempFeed);
  };
  useEffect(() => {
    getFeed();
  }, [isLoggedIn]);

  return (
    <>
      <div className="feed-container">
        {feed.map((post, _) => (
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
          />
        ))}
      </div>
    </>
  );
};

export default FeedContainer;
