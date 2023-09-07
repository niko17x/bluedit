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

  const postVoteActions = async (post, vote, e, voteCategory, comment) => {
    const isCommentVote = e.target.name.includes("comment");

    const auth = getAuth();
    const loggedUserId = auth.currentUser?.uid;
    const voteCat = isCommentVote ? COMMENT_VOTES : POST_VOTES;

    const docPath = isCommentVote ? `comments/${comment}` : `posts/${post}`;
    const voteStatusRef = doc(db, docPath);

    const userPostIdRef = doc(db, "users", `${loggedUserId}/${voteCat}`, post);
    const targetClassName = e.target.className;

    const voteExists = await checkVoteExists(post, loggedUserId, e);

    if (!voteExists) {
      await handleNewVote(post, vote, voteStatusRef, voteCategory);
    } else {
      await handleExistingVote(userPostIdRef, voteStatusRef, targetClassName);
    }

    setForceRender((prev) => prev + 1);
  };

  return postVoteActions;
};

export default useVoteActions;
