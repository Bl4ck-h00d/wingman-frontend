import React, { useState, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { Divider, Tabs } from "antd";
import { useParams } from "react-router-dom";
import axios from "src/Utils/axiosConfig";
import PostCard from "./PostCard"

const { TabPane } = Tabs;

const AccountInfo = () => {
  const { token, isLoggedIn, username, email } = useAppSelector(
    (state) => state.authModal
  );
  const { profileUsername } = useParams();
  const [postList, setPostList] = useState([]);
  const [savedPostsList, setSavedPostsList] = useState([]);
  const [anonymousPostList, setAnonymousPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getData = async () => {
    const response = await axios.get(`/api/profile/${profileUsername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = response.data;
    setPostList(data[0]['posts']);
    setCommentList(data[1]['comments']);
    setSavedPostsList(data[2]['postsSaved']);

    if(username===profileUsername && isLoggedIn)
    {
      setAnonymousPostList(data[3]['anonymousPostsByUser']);
      setPostList(prevState => [...prevState, ...data[3]['anonymousPostsByUser']]);
    }

    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    getData();

  }, []);
  console.log(postList);
  console.log(commentList);
  console.log(savedPostsList);
  return (
    <section className="accountinfo-container">
      <div className="profile-picture">
        <span>{username.charAt(0)}</span>
      </div>
      <div className="profile-info">
        <h3>Username: {profileUsername}</h3>
        {profileUsername===username && isLoggedIn && (<h3>Email: {email}</h3>)}
      </div>
      <Divider />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Posts" key="1">
        {!loading &&
          postList.length > 0 &&
          postList.map((post, _) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              author={post.username}
              media={post.media}
              ratings={post.ratings}
              comments={post.comments}
              tags={post.tags}
              timestamp={post.timestamp}
              edited={post.edited}
            />
          ))}
        </TabPane>
        <TabPane tab="Saved Posts" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Comments" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </section>
  );
};

export default AccountInfo;
