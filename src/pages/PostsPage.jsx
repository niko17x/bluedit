import React, { useContext } from "react";
import Comments from "../components/Comments";
import Divider from "../components/Divider";
import { DataContext } from "../App";
import { useParams } from "react-router-dom";

const PostsPage = () => {
  const { posts } = useContext(DataContext);
  const { postId } = useParams();
  const showPost = posts.find((post) => post.id === postId);

  if (!showPost) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <div className="posts_page--container" key={showPost.id}>
        <div className="user_votes">
          <button className="up_vote" type="button">
            ⬆
          </button>
          <div className="vote_count">
            {showPost.upVotes - showPost.downVotes}
          </div>
          <button className="down_vote" type="button">
            ⬇
          </button>
        </div>
        <div className="body">
          <div className="user_id">by {showPost.username}</div>
          <div className="post_title">{showPost.postTitle}</div>
          <div className="engagement_panel">
            <div className="user_comments">
              <div>💬</div>
              <div>
                {showPost.comments === 1 ? (
                  <span>{showPost.comments} comment</span>
                ) : (
                  <span>{showPost.comments} comments</span>
                )}
              </div>
            </div>
            <div className="share_content">
              <div>⌲</div>
              <div>Share</div>
            </div>
          </div>
          <Divider />
          <Comments />
        </div>
      </div>
    </>
  );
};

export default PostsPage;
