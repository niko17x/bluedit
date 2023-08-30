import React, { useContext, useEffect } from "react";
import { DataContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const DeletePostModal = () => {
  const { setDeletePostMod, setTitle, setBody } = useContext(DataContext);
  const navigate = useNavigate();

  const handleDiscardPost = () => {
    navigate(-1);
    setDeletePostMod(false);
    setTitle("");
    setBody("");
  };

  return (
    <div className="delete_post_modal">
      <div className="header">
        <div>Delete Draft</div>
        <button
          className="close"
          type="button"
          onClick={() => setDeletePostMod(false)}
        >
          &times;
        </button>
      </div>
      <div className="divider"></div>
      <div>Do you want to delete your post?</div>
      <div className="engagement_buttons">
        <button type="button" onClick={() => handleDiscardPost()}>
          Discard Post
        </button>
        <button type="button" onClick={() => setDeletePostMod(false)}>
          Continue Post
        </button>
      </div>
    </div>
  );
};

export default DeletePostModal;
