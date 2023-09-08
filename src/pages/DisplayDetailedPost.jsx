import React, { useContext } from "react";
import Comments from "../components/Comments";
import Divider from "../components/Divider";
import { DataContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import CommentEditor from "../components/CommentEditor";
import useVoteActions from "../components/hooks/useVoteActions";

const DisplayDetailedPost = () => {
  const { posts, user, handlePostDeletion } = useContext(DataContext);
  const { pageId } = useParams();
  const navigate = useNavigate();
  const getPost = posts ? posts.find((post) => post.id === pageId) : null;
  const authorIsLoggedIn = getPost && user && getPost.userId === user.uid;
  const voteActions = useVoteActions(); // React custom hooks placed on top-level.

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

  const handleVote = async (e, vote) => {
    voteActions(pageId, vote, e, "postVotes");
  };

  return (
    <div className="display_detailed_post--container" key={getPost.id}>
      <div className="user_votes">
        <button
          className="up_vote"
          name="up_vote post"
          type="button"
          onClick={(e) => handleVote(e, 1)}
        >
          ⬆
        </button>
        <div className="vote_count">{getPost.voteStatus}</div>
        <button
          className="down_vote"
          name="down_vote post"
          type="button"
          onClick={(e) => handleVote(e, -1)}
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
        {/* go through comment and find where postId === pageId: */}
        <Comments />
      </div>
    </div>
  );
};

export default DisplayDetailedPost;
