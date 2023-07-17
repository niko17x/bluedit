import React from "react";
import { Link } from "react-router-dom";

const CreatePostInput = () => {
  return (
    <div className="create_post_input--container">
      <div className="create_post_input--overlay">
        <div className="background_circle">
          <img src="assets/corgi.png" alt="profile image" />
        </div>
        <Link to="/create-post">
          <input type="text" placeholder="Create Post"></input>
        </Link>
        <img src="assets/image.png" alt="select picture media" />
        <img src="assets/link.png" alt="link" />
      </div>
    </div>
  );
};

export default CreatePostInput;
