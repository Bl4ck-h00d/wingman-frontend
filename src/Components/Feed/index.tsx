import React, { useEffect, useState } from "react";
import axios from "src/Utils/axiosConfig";
import FeedCard from "./FeedCard";
import { useAppSelector } from "src/Redux/hooks";

const FeedContainer = () => {

  //STATE DEFINITIONS
  const [feed, setFeed] = useState([]);
  const [postRatings, setPostRatings] = useState([]);
  const [postSaved, setPostSaved] = useState([]);
  const { isLoggedIn, token } = useAppSelector((state) => state.authModal);

  //API CALLS
  const getFeed = async () => {
    const response = await axios.get("/api/get-posts", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const postSavedData = response.data.pop();
    const postRatingData = response.data.pop();

    const data = response.data;
    setPostRatings([...postRatingData.postsLiked]);
    setPostSaved([...postSavedData.postsSaved]);

    //CHECK FOR POSTS CURRENT USER HAS RATED/SAVED
    let tempFeed = [];
    for (let i = 0; i < data.length; i++) {
      let tempPost = data[i];
      tempPost["userRating"] = 0;
      for (let j = 0; j < postRatingData.postsLiked.length; j++) {
        if (tempPost.id === postRatingData.postsLiked[j].postid) {
          tempPost["userRating"] = Number(postRatingData.postsLiked[j].rating);
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
            saved={post.saved}
          />
        ))}
      </div>
    </>
  );
};

export default FeedContainer;
