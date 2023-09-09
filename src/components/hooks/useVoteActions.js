import { useContext } from "react";

import { DataContext } from "../../App";
import {
  checkVoteExists,
  handleNewVote,
  handleExistingVote,
} from "../utils/voteActionsUtil";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const POST_VOTES = "postVotes";
const COMMENT_VOTES = "commentVotes";

const useVoteActions = () => {
  const { setForceRender } = useContext(DataContext);

  const postVoteActions = async (
    voteCollectionId,
    vote,
    e,
    voteCategory,
    postId
  ) => {
    const isCommentVote = e.target.name.includes("comment");

    const auth = getAuth();
    const loggedUserId = auth.currentUser?.uid;
    const voteCat = isCommentVote ? COMMENT_VOTES : POST_VOTES;

    const docPath = isCommentVote
      ? `comments/${voteCollectionId}`
      : `posts/${voteCollectionId}`;
    const voteStatusRef = doc(db, docPath);

    const userPostIdRef = doc(
      db,
      "users",
      `${loggedUserId}/${voteCat}`,
      voteCollectionId
    );
    const targetClassName = e.target.className;

    const voteExists = await checkVoteExists(voteCollectionId, loggedUserId, e);

    if (!voteExists) {
      // console.log(voteCollectionId, vote, voteStatusRef, voteCategory);
      await handleNewVote(
        voteCollectionId,
        vote,
        voteStatusRef,
        voteCategory,
        postId
      );
    } else {
      await handleExistingVote(userPostIdRef, voteStatusRef, targetClassName);
    }

    setForceRender((prev) => prev + 1);
  };

  return postVoteActions;
};

export default useVoteActions;
