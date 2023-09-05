// * Retrieves "posts" collection data from Firebase Firestore.
import { db } from "../../lib/firebase";
import { query, orderBy, getDocs, collection } from "firebase/firestore";

export const fetchComments = async () => {
  const que = query(collection(db, "comments"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(que);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
