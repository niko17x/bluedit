import React, { useContext } from "react";
import Comments from "../components/Comments";
import Divider from "../components/Divider";
import { DataContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import usePostVoteActions from "../components/hooks/usePostVoteActions";
import CommentEditor from "../components/CommentEditor";

const DisplayDetailedPost = () => {
  const { posts, user, handlePostDeletion } = useContext(DataContext);
  const { pageId } = useParams();
  const navigate = useNavigate();
  const getPost = posts ? posts.find((post) => post.id === pageId) : null;
  const authorIsLoggedIn = getPost && user && getPost.userId === user.uid;
  const postVoteActions = usePostVoteActions(); // React custom hooks placed on top-level.

  if (posts === undefined) {
    return <div>Loading...</div>;
  }

  if (!getPost) {
    return <div>Post not found</div>;
  }

  const onDelete = async (id, pageId) => {
    await handlePostDeletion(id, pageId);
    navigate("/");
  };

  return (
    <div className="display_detailed_post--container" key={getPost.id}>
      <div className="user_votes">
        <button
          className="up_vote"
          name="up_vote"
          type="button"
          onClick={async (e) => {
            postVoteActions(pageId, 1, e);
          }}
        >
          ⬆
        </button>
        <div className="vote_count">{getPost.voteStatus}</div>
        <button
          className="down_vote"
          name="down_vote"
          type="button"
          onClick={async (e) => {
            postVoteActions(pageId, -1, e);
          }}
        >
          ⬇
        </button>
      </div>
      <div className="body">
        <div className="user_id">by {getPost.username}</div>
        <div className="post_title">{getPost.title}</div>
        <div className="engagement_panel">
          <div className="user_comments">
            {getPost.comments === 1 ? (
              <button type="button">
                <span>💬 {getPost.comments} comment</span>
              </button>
            ) : (
              <button type="button">
                <span>💬 {getPost.comments} comments</span>
              </button>
            )}
          </div>
          <div className="share_content">
            <button type="button">
              <span>📨 Share</span>
            </button>
          </div>
          <div className="delete_post">
            {authorIsLoggedIn ? (
              <button type="button" onClick={(e) => onDelete(pageId, pageId)}>
                <span>🗑️ Delete</span>
              </button>
            ) : null}
          </div>
        </div>
        <div className="border"></div>
        <CommentEditor />
        <Divider />
        <Comments />
      </div>
    </div>
  );
};

export default DisplayDetailedPost;
