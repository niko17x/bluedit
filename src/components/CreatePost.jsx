import React, { useContext } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import DeletePostModal from "./DeletePostModal";
import useUnsavedChangesWarning from "./hooks/useUnsavedChangesWarning";

const CreatePost = () => {
  const {
    handlePostCreation,
    title,
    setTitle,
    body,
    setBody,
    setDeletePostMod,
    deletePostMod,
  } = useContext(DataContext);
  const navigate = useNavigate();

  useUnsavedChangesWarning(title || body);

  const resetInputs = () => {
    setTitle("");
    setBody("");
  };

  const onCreate = async (title, post, form) => {
    await handlePostCreation(title, post, form);
    navigate("/");
  };

  const deletePostWarning = (e) => {
    title || body ? setDeletePostMod(true) : null;
  };

  const hasUnsavedChanges = Boolean(title || body);
  useUnsavedChangesWarning(hasUnsavedChanges);

  return (
    <div className="create_post--overlay">
      <div>{deletePostMod && <DeletePostModal />}</div>
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
            onCreate(title, body, e.target);
            // console.log("title:", title, "body:", body);
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
              id="body"
              name="body"
              placeholder="What's on your mind today?"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="divider"></div>
          <div className="button_group">
            <button type="button" onClick={(e) => deletePostWarning(e)}>
              Delete Post
            </button>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
