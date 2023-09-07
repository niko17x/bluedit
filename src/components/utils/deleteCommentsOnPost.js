import { db } from "../../lib/firebase";
import {
  collection,
  deleteDoc,
  where,
  query,
  getDocs,
  doc,
} from "firebase/firestore";

const deleteCommentsOnPost = async (id) => {
  try {
    const q = query(collection(db, "comments"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(db, "comments", docSnapshot.id));
    });
  } catch (error) {
    console.log(`Error coming from deleteCommentsOnPost.js: ${error}`);
  }
};

export default deleteCommentsOnPost;

/** Deleting all comments related to deleted post:
 * Get reference to all comments.
 * Use forEach to go through each document
 * Find all matching document field with "postId" to the deleted postId
 * Finally, delete all comments.
 *
 * comments > doc id > doc field: postId.
 */
