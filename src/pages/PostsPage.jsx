import React, { useContext } from "react";
import Comments from "../components/Comments";
import Divider from "../components/Divider";
import { DataContext } from "../App";

const PostsPage = () => {
  const { posts } = useContext(DataContext);
  return (
    <>
      {posts.map((post) => {
        return (
          <div className="posts_page--container" key={post.id}>
            <div className="user_id">by DemoUser28</div>
            <div className="post_title">Insert Post Title Here.</div>
            <div className="engagement_panel">
              <div className="user_votes">
                <button className="up_vote" type="button">
                  ⬆
                </button>
                <div className="vote_count">4.7k</div>
                <button className="down_vote" type="button">
                  ⬇
                </button>
              </div>
              <div className="user_comments">
                <div>💬</div>
                <div className="comment_count">6.5k</div>
              </div>
              <div className="share_content">
                <div>⌲</div>
                <div>Share</div>
              </div>
            </div>
            <Divider />
            <Comments />
          </div>
        );
      })}
    </>
  );
};

export default PostsPage;
