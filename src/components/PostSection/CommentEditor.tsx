import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";
import { ReactComponent as AnonymousIcon } from "../../assets/img/people.svg";
import { ReactComponent as AnonymousIconColored } from "../../assets/img/avatar.svg";
import Notification from "../Utils/Notification";
import axios from "src/utils/axiosConfig";
import { setEditComment, setCommentUpdateReload } from "src/redux/commentModal";
import Emojis from "../EmojiPicker";
import { SmileOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const CommentEditor = ({ postId, addComment }) => {
  const { token, isLoggedIn, username } = useAppSelector(
    (state) => state.authModal
  );
  const { editComment, editingCommentId, editingComment, editingPostId } =
    useAppSelector((state) => state.commentModal);
  const commentRef = useRef(null);
  const dispatch = useAppDispatch();
  const [emojisVisible, setEmojisVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [anonymousComment, setAnonymousComment] = useState(false);

  useEffect(() => {
    if (editComment) {
      commentRef.current.focus();
      setNewComment(editingComment);
    } else {
      setNewComment("");
    }
  }, [editComment]);
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

  const updateComment = async (values) => {
    try {
      const result = await axios.put(
        `/api/update-comment/${editingCommentId}`,
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setSubmitting(false);
      Notification(
        "success",
        "Edited Successfully",
        "Please Refresh the page to see the changes"
      );
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
    if (!newComment || newComment.trim() === "") {
      Notification("warning", "Warning", "Comment cannot be empy!");
      return;
    }

    setSubmitting(true);

    setNewComment("");

    const values = {
      author: username,
      postId: postId,
      comment: newComment,
      anonymous: anonymousComment,
    };

    if (!editComment) {
      postComment(values);
      values["id"] = 99999;
      values["ratings"] = 0;

      addComment((prevState) => [...prevState, values]);
    } else {
      values["commentId"] = editingCommentId;
      updateComment(values);
      dispatch(setCommentUpdateReload(true));
      dispatch(setEditComment(false));
    }
  };

  const handleChange = (e) => {
    setNewComment((prevState) => e.target.value);
  };

  const showEmoji = () => {
    commentRef.current.focus();
    setEmojisVisible(!emojisVisible);
  };
  const pickEmoji = (e, { emoji }) => {
    const ref = commentRef.current.resizableTextArea.textArea;
    ref.focus();
    const start = newComment.substring(0, ref.selectionStart);
    const end = newComment.substring(ref.selectionStart);
    const text = start + emoji + end;
    setNewComment(text);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    commentRef.current.resizableTextArea.textArea.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  return (
    <div className="comment-input-container">
      <Form.Item>
        <TextArea
          ref={commentRef}
          id="comment-textarea"
          className="comment-textarea"
          placeholder="Comment on the post..."
          rows={4}
          onChange={handleChange}
          value={newComment}
        />
        {emojisVisible && (
          <div className="emoji-picker">
            <Emojis pickEmoji={pickEmoji} />
          </div>
        )}

        <div className="emoji-picker-icon" onClick={showEmoji}>
          <SmileOutlined style={{fontSize:"20px"}}/>
        </div>
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
          {editComment ? "Edit Comment" : "Add Comment"}
        </Button>
        {editComment && (
          <Button
            onClick={() => dispatch(setEditComment(false))}
            className="edit-btn"
            danger
          >
            Cancel
          </Button>
        )}
      </Form.Item>
    </div>
  );
};

export default CommentEditor;
