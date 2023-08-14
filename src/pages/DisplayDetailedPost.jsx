import React, { useContext } from "react";
import Comments from "../components/Comments";
import Divider from "../components/Divider";
import { DataContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

const DisplayDetailedPost = () => {
  const { posts, user, handlePostDeletion } = useContext(DataContext);
  const { postId } = useParams();
  const getPost = posts.find((post) => post.id === postId);
  const authorIsLoggedIn = user && getPost.userId === user.uid;
  const navigate = useNavigate();

  if (!getPost) {
    return <div>Post not found</div>;
  }

  const onDelete = async (id) => {
    await handlePostDeletion(id);
    navigate("/");
  };

  return (
    <div className="posts_page--container" key={getPost.id}>
      <div className="user_votes">
        <button className="up_vote" type="button">
          ⬆
        </button>
        <div className="vote_count">{getPost.upVotes - getPost.downVotes}</div>
        <button className="down_vote" type="button">
          ⬇
        </button>
      </div>
      <div className="body">
        <div className="user_id">by {getPost.username}</div>
        <div className="post_title">{getPost.postTitle}</div>
        <div className="engagement_panel">
          <div className="user_comments">
            <div>💬</div>
            <div>
              {getPost.comments === 1 ? (
                <span>{getPost.comments} comment</span>
              ) : (
                <span>{getPost.comments} comments</span>
              )}
            </div>
          </div>
          <div className="share_content">
            <div>⌲</div>
            <div>Share</div>
          </div>
          {authorIsLoggedIn ? (
            <div>
              <button type="button" onClick={(e) => onDelete(postId)}>
                🗑️ <span>Delete</span>
              </button>
            </div>
          ) : null}
        </div>
        <Divider />
        <Comments />
      </div>
    </div>
  );
};

export default DisplayDetailedPost;
