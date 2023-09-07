import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { getAuth } from "firebase/auth";

const voteHandler = async (post, vote, voteCategory) => {
  const authenticate = getAuth();

  try {
    const userUid = authenticate.currentUser?.uid;
    if (!userUid) {
      throw new Error("User is not authenticated");
    }

    // voteCategory is a param that is either postVotes or commentVotes.
    const customDocRef = doc(db, `users/${userUid}/${voteCategory}/${post}`);

    await setDoc(customDocRef, {
      postId: post,
      voteValue: vote,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default voteHandler;
