import React, { useContext } from "react";
import { DataContext } from "../App";

const CreatePost = () => {
  const { handlePostCreation } = useContext(DataContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const postTitle = form.elements.title.value;
    const postContent = form.elements.content.value;
    handlePostCreation(postTitle, postContent, form);
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
        <form className="create_post--form" onSubmit={handleSubmit}>
          <div className="title">
            <label htmlFor="title"></label>
            <textarea
              id="title"
              name="title"
              placeholder="Title"
              maxLength={300}
            />
          </div>
          <div className="textarea">
            <label htmlFor="textarea"></label>
            <textarea
              id="content"
              name="content"
              placeholder="What's on your mind today?"
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
