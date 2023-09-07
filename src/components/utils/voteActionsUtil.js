import {
  increment,
  updateDoc,
  deleteDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import voteHandler from "./voteHandler";
import { db } from "../../lib/firebase";

export const updateVoteStatus = async (ref, value) => {
  await updateDoc(ref, { voteStatus: increment(value) });
};

export const updateVoteValue = async (ref, value) => {
  await updateDoc(ref, { voteValue: increment(value) });
};

export const checkVoteExists = async (post, loggedUserId, e) => {
  let voteExists = null;
  // voteType will either be postVotes or commentVotes. Check to see if either collection is actually in FB. If not, vote was never registered/invoked:
  const voteType = e.target.name.includes("comment")
    ? "commentVotes"
    : "postVotes";
  const postVotesRef = collection(db, `users/${loggedUserId}/${voteType}`);
  const querySnapshot = await getDocs(postVotesRef);
  querySnapshot.forEach((doc) => {
    doc.id === post ? (voteExists = doc.data()) : null;
  });
  return voteExists;
};

export const handleNewVote = async (
  post,
  vote,
  voteStatusRef,
  voteCategory
) => {
  voteHandler(post, vote, voteCategory);
  await updateVoteStatus(voteStatusRef, vote);
};

export const handleExistingVote = async (
  userPostIdRef,
  voteStatusRef,
  targetClassName,
  e
) => {
  const userVoteValueData = (await getDoc(userPostIdRef)).data().voteValue;
  if (userVoteValueData === 1) {
    if (targetClassName === "up_vote") {
      await deleteDoc(userPostIdRef);
      await updateVoteStatus(voteStatusRef, -1);
    } else if (targetClassName === "down_vote") {
      await updateVoteStatus(voteStatusRef, -2);
      await updateVoteValue(userPostIdRef, -2);
    }
  } else if (userVoteValueData === -1) {
    if (targetClassName === "up_vote") {
      await updateVoteStatus(voteStatusRef, 2);
      await updateVoteValue(userPostIdRef, 2);
    } else if (targetClassName === "down_vote") {
      await deleteDoc(userPostIdRef);
      await updateVoteStatus(voteStatusRef, 1);
    }
  }
};

// ! bug => voting on more than one comment is causing the vote number to behave incorrectly. Clicking on a vote of 0 should register 1 for up vote but goes to -1 instead. Possibly because code is getting voteValue data from an incorrect data source. Also, comments are being attached to every post that is created instead of the unique post id.
