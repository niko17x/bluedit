import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import postVoteHandler from "../utils/postVoteHandler";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";

const usePostVoteActions = () => {
  const { setForceRender, setPosts } = useContext(DataContext);

  const postVoteActions = async (post, vote) => {
    const batch = writeBatch(db);
    const authenticate = getAuth();
    const loggedUserId = authenticate.currentUser?.uid;
    const postIdRef = doc(db, "users", `${loggedUserId}/postVotes`, post.id);
    let voteExists = null;

    // get postVotes data:
    const postVotesRef = collection(
      doc(db, "users", `${loggedUserId}`),
      "postVotes"
    );
    const querySnapshot = await getDocs(postVotesRef);
    querySnapshot.forEach((doc) => {
      if (doc.id === post?.id) {
        voteExists = doc.data();
      }
    });

    const newVote = {
      postId: post.id,
      voteValue: vote,
    };

    let getVoteStatusData;
    const voteStatusRef = doc(db, "posts", `${post.id}`);
    const voteStatusSnapshot = await getDoc(voteStatusRef);
    getVoteStatusData ? voteStatusSnapshot.data().voteStatus : null;

    if (!voteExists) {
      await postVoteHandler(post, vote);
    } else {
      await updateDoc(voteStatusRef, { voteStatus: increment(vote) });
      await updateDoc(postIdRef, newVote);
    }
    setForceRender((prev) => prev + vote);
  };
  return postVoteActions;
};

export default usePostVoteActions;
// batch.set(postIdRef, newVote);
// await batch.commit();
