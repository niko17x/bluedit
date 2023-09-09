import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { getAuth } from "firebase/auth";

const voteHandler = async (voteCollectionId, vote, voteCategory, postId) => {
  const authenticate = getAuth();

  try {
    const userUid = authenticate.currentUser?.uid;
    if (!userUid) {
      throw new Error("User is not authenticated");
    }

    // voteCategory is a param that is either postVotes or commentVotes.
    const customDocRef = doc(
      db,
      `users/${userUid}/${voteCategory}/${voteCollectionId}`
    );
    // console.log("voteCategory: ", voteCategory);
    // console.log("post:", voteCollectionId);

    await setDoc(customDocRef, {
      postId: postId,
      voteValue: vote,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default voteHandler;

// ! Bug => commentVotes subcollection id must be fixed from containing the current pageId to the unique commentid.
