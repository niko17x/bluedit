import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { db } from "../../lib/firebase";
import postVoteHandler from "../utils/postVoteHandler";
import { DataContext } from "../../App";

const usePostVoteActions = () => {
  const { setForceRender } = useContext(DataContext);

  const updateVoteStatus = async (ref, value) => {
    await updateDoc(ref, { voteStatus: increment(value) });
  };
  const updateVoteValue = async (ref, value) => {
    await updateDoc(ref, { voteValue: increment(value) });
  };

  const postVoteActions = async (post, vote, e) => {
    const auth = getAuth();
    const loggedUserId = auth.currentUser?.uid;

    let voteExists = null;
    const postVotesRef = collection(db, `users/${loggedUserId}/postVotes`);
    const querySnapshot = await getDocs(postVotesRef);
    querySnapshot.forEach((doc) => {
      doc.id === post.id ? (voteExists = doc.data()) : null;
    });

    const userPostIdRef = doc(
      db,
      "users",
      `${loggedUserId}/postVotes`,
      post.id
    );
    const voteStatusRef = doc(db, "posts", `${post.id}`);

    if (!voteExists) {
      postVoteHandler(post, vote);
      await updateVoteStatus(voteStatusRef, vote);
    } else {
      const userVoteValueData = (await getDoc(userPostIdRef)).data().voteValue;
      if (userVoteValueData === null) {
        return;
      }

      const targetName = e.target.name;

      if (userVoteValueData === 1) {
        if (targetName === "up_vote") {
          await deleteDoc(userPostIdRef);
          await updateVoteStatus(voteStatusRef, -1);
        } else if (targetName === "down_vote") {
          await updateVoteStatus(voteStatusRef, -2);
          await updateVoteValue(userPostIdRef, -2);
        }
      } else if (userVoteValueData === -1) {
        if (targetName === "up_vote") {
          await updateVoteStatus(voteStatusRef, 2);
          await updateVoteValue(userPostIdRef, 2);
        } else if (targetName === "down_vote") {
          await deleteDoc(userPostIdRef);
          await updateVoteStatus(voteStatusRef, 1);
        }
      }
    }

    setForceRender((prev) => prev + 1);
  };

  return postVoteActions;
};

export default usePostVoteActions;

// TODO: Using cloud functions, can you store all the user voteValue to a resusable variable to simplify code further? // simplify the functions - make it more "pure" // Are there ways to move some functions to the "utils" folder?
