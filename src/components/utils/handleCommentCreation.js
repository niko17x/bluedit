// This component handles the actual collection for "comments". Nothing to do with comment voting logic.
import { db } from "../../lib/firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { fetchCommentsOrPosts } from "./fetchDataUtils";

const handleCommentCreation = async (
  postId,
  userId,
  textarea,
  setComments,
  form,
  username
) => {
  const commentsRef = collection(db, "comments");
  try {
    await addDoc(commentsRef, {
      postId: postId,
      userId: userId,
      username: username,
      createdAt: serverTimestamp(),
      voteStatus: 0,
      numberOfVotes: 0,
      textarea: textarea,
    });
    const updatedComments = await fetchCommentsOrPosts("comments");
    setComments(updatedComments);
    form.reset();
  } catch (error) {
    console.log(error);
  }
};

export default handleCommentCreation;
