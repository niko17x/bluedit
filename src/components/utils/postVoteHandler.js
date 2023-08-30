import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { getAuth } from "firebase/auth";

const postVoteHandler = async (post, vote) => {
  const authenticate = getAuth();
  try {
    const userUid = authenticate.currentUser?.uid;
    if (!userUid) {
      throw new Error("User is not authenticated");
    }

    // Create a document reference with a custom ID (post.id)
    const customDocRef = doc(db, `users/${userUid}/postVotes/${post.id}`);

    // Set the data for the custom document ID
    await setDoc(customDocRef, {
      postId: post.id,
      voteValue: vote,
    });

    // const updatedVotes = await fetchVotes();
    // setVotes(updatedVotes);
    console.log("Vote rendered.");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default postVoteHandler;
