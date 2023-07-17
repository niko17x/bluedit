import React, { useContext } from "react";
import { DataContext } from "../App";

export const Post = () => {
  const { posts } = useContext(DataContext);
  return (
    <>
      {posts.map((post) => {
        return (
          <div className="post--container" key={post.id}>
            <div className="vote_buttons">
              <button className="up_vote">⬆</button>
              <div className="vote_count">{post.upVotes - post.downVotes}</div>
              <button className="down_vote">⬇</button>
            </div>
            <div className="main">
              <div className="post_data">
                <div className="user_id_post">
                  <span>Posted by u/DemoUser3819 </span>
                </div>
                <button type="button">Join</button>
              </div>
              <div className="render_post_title">
                <h3>{post.postTitle}</h3>
              </div>
              <div className="post_action_buttons">
                <div className="comments">💬 4.7k comments</div>
                <div className="share">↪ Share</div>
                <div className="save">✎ Save</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
