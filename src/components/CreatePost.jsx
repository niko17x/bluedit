import React, { useContext, useState } from "react";
import { DataContext } from "../App";

const CreatePost = () => {
  const { handlePostCreation, username } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const resetInputs = () => {
    setTitle("");
    setPost("");
  };

  return (
    <div className="create_post--overlay">
      <div className="create_post--container">
        <div className="header">
          <div>Create a post</div>
          <button>DRAFTS 0</button>
        </div>
        <div className="divider"></div>
        <div className="type_selector">
          <button>📝 Post</button>
          <button>📸 Image & Video</button>
          <button>🔗 Link</button>
        </div>
        <form
          className="create_post--form"
          onSubmit={(e) => {
            e.preventDefault();
            handlePostCreation(title, post, e.target);
            resetInputs();
          }}
        >
          <div className="title">
            <label htmlFor="title"></label>
            <textarea
              id="title"
              name="title"
              placeholder="Title"
              maxLength={300}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="textarea">
            <label htmlFor="textarea"></label>
            <textarea
              id="content"
              name="content"
              placeholder="What's on your mind today?"
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <div className="divider"></div>
          <div className="button_group">
            <button type="button">Save Draft</button>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
