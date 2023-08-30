// * Retrieves "posts" collection data from Firebase Firestore.
import { db } from "../../lib/firebase";
import { query, getDocs, collection } from "firebase/firestore";

export const fetchVotes = async () => {
  const que = query(collection(db, "users"));
  const querySnapshot = await getDocs(que);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
