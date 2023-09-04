import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";
// import foo from "./hooks/usePostVoteActions";
import usePostVoteActions from "./hooks/usePostVoteActions";

export const AllPosts = () => {
  const { posts } = useContext(DataContext);
  const postVoteActions = usePostVoteActions(); // As per rules, declaring custom react hook at top level.

  return (
    <>
      {posts.map((post) => {
        return (
          <div className="post--container" key={post.id}>
            <div className="vote_buttons">
              <button
                className="up_vote"
                name="up_vote"
                type="button"
                onClick={async (e) => {
                  await postVoteActions(post.id, 1, e);
                }}
              >
                ⬆
              </button>
              <div className="vote_count">
                {!post.voteStatus ? "Vote" : post.voteStatus}
              </div>
              <button
                className="down_vote"
                name="down_vote"
                type="button"
                onClick={async (e) => {
                  await postVoteActions(post.id, -1, e);
                }}
              >
                ⬇
              </button>
            </div>
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="main">
                <div className="post_data">
                  <div className="user_id_post">
                    <span>Posted by u/{post.username}</span>
                  </div>
                  <button type="button">Join</button>
                </div>
                <div className="render_post_title">
                  <h3>{post.title}</h3>
                </div>
                <h3>{post.body}</h3>
                <div className="post_action_buttons">
                  <div className="comments">💬 4.7k comments</div>
                  <div className="share">↪ Share</div>
                  <div className="save">✎ Save</div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};
