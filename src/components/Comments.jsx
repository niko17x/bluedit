import React, { useContext } from "react";
import { DataContext } from "../App";
import firestoreTimestampConvert from "./utils/firestoreTimestampConvert";
import { deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { doc } from "firebase/firestore";

const Comments = () => {
  const { comments, setComments, user } = useContext(DataContext);
  const loggedUserId = user.uid;

  const deleteComments = async (docId) => {
    const commentsRef = doc(db, "comments", docId);
    try {
      await deleteDoc(commentsRef);
      const updatedComments = comments.filter(
        (comment) => comment.id !== docId
      );
      setComments(updatedComments);
      console.log("Sucessfully delete comment.");
    } catch (error) {
      console.log(error);
    }
  };

  const convertedTimeStamp = (comment) => {
    return firestoreTimestampConvert(comment);
  };

  // data below mapped to "comments" collection in Firestore:
  return (
    <>
      {comments.map((comment) => {
        return (
          <div className="comments--container" key={comment.id}>
            <div className="profile_image">
              <img src="" />
            </div>
            <div className="body">
              <div className="profile_id">
                {comment.username}
                <span> • {convertedTimeStamp(comment.createdAt)} hr. ago</span>
              </div>
              <div className="user_post">{comment.textarea}</div>
              <div className="user_engagement">
                <div className="vote_count">
                  <button className="up_vote">⬆</button>
                  <div className="number_of_votes">{comment.voteStatus}</div>
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
                {comment.userId === loggedUserId ? (
                  <div className="delete-comment">
                    <button
                      type="button"
                      name="delete-comment"
                      onClick={async (e) => {
                        await deleteComments(comment.id);
                      }}
                    >
                      🗑️ <span>Delete</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
