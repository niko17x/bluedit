// Comment editor in detailed posts where use can type and submit their comments for that specific post.

import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import handleCommentCreation from "./utils/handleCommentCreation";
import { useParams } from "react-router-dom";

const CommentEditor = () => {
  const { user, setComments } = useContext(DataContext);
  const { pageId } = useParams();
  const { username } = useContext(DataContext);
  const [textArea, setTextArea] = useState("");

  return (
    <div className="co-ed">
      <p>
        Comment as
        <span> {username}</span>
      </p>
      <form
        className="textarea-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCommentCreation(
            pageId,
            user.uid,
            textArea,
            setComments,
            e.target,
            username
          );
        }}
      >
        <textarea
          placeholder="What are your thoughts?"
          spellCheck="true"
          name="textarea"
          onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
        <div className="textarea-footer-bg">
          <button className={textArea ? "button highlight" : "button"}>
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentEditor;
