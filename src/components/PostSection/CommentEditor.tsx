import React, { useState } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import { useAppSelector } from "src/redux/hooks";
import { ReactComponent as AnonymousIcon } from "../../assets/img/people.svg";
import { ReactComponent as AnonymousIconColored } from "../../assets/img/avatar.svg";
import Notification from "../Utils/Notification";
import axios from "src/utils/axiosConfig";

const { TextArea } = Input;

const CommentEditor = ({ postId, addComment }) => {
  const { token, isLoggedIn, username } = useAppSelector(
    (state) => state.authModal
  );

  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [anonymousComment, setAnonymousComment] = useState(false);

  const postComment = async (values) => {
    try {
      const result = await axios.post("/api/comments", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error); //donot remove (debugging purpose)
      Notification("error", "Error", "An Error occurred");
    }
  };

  const loginCheck = () => {
    if (!isLoggedIn) {
      Notification("warning", "Warning", "Please Login before creating a post");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!loginCheck()) {
      return;
    }
    if (!newComment || newComment.trim() === "") return;

    setSubmitting(true);

    setNewComment("");

    const values = {
      author: username,
      postId: postId,
      comment: newComment,
      anonymous: anonymousComment,
    };

    postComment(values);

    addComment((prevState) => [...prevState, values]);
  };

  const handleChange = (e) => {
    setNewComment((prevState) => e.target.value);
  };

  return (
    <div className="comment-input-container">
      <Form.Item>
        <TextArea
          className="comment-textarea"
          placeholder="Comment on the post..."
          rows={4}
          onChange={handleChange}
          value={newComment}
        />
        <Tooltip placement="top" title="Comment Anonymously">
          <div
            className="comment-anonymous"
            onClick={() => setAnonymousComment((prevState) => !prevState)}
          >
            {anonymousComment ? <AnonymousIconColored /> : <AnonymousIcon />}
          </div>
        </Tooltip>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={handleSubmit}
          type="primary"
          className="comment-btn"
        >
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
};

export default CommentEditor;
