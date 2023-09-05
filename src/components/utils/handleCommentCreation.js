import { db } from "../../lib/firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { fetchComments } from "./fetchComments";

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
      textarea: textarea,
    });
    const updatedComments = await fetchComments();
    setComments(updatedComments);
    form.reset();
  } catch (error) {
    console.log(error);
  }
};

export default handleCommentCreation;
