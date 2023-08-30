import React from "react";

const Comments = () => {
  // Should be mapped to the FB "comments" data.
  return (
    <div className="comments--container">
      <div className="profile_image">
        <img src="assets/corgi.png" />
      </div>
      <div className="body">
        <div className="profile_id">
          DemoUser382 • <span>1 hr. ago</span>{" "}
        </div>
        <div className="user_post">
          This is an example user post fetched from Firebase.
        </div>
        <div className="user_engagement">
          <div className="vote_count">
            <button className="up_vote">⬆</button>
            <div className="number_of_votes">77</div>
            <button className="down_vote">⬇</button>
          </div>
          <div className="replies">
            <button type="button">
              💬 <span>Reply</span>
            </button>
          </div>
          <div className="share_post">
            <button type="button">
              ⌲ <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
