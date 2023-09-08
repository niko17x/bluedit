import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Change function name to "fetchCommentsOrPostsRef" since it is referencing a collection:
export const fetchCommentsOrPosts = async (collectionRef) => {
  try {
    const que = query(
      collection(db, collectionRef),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(que);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(
      `Error: ${error} - check fetchCommentsOrPostsRef
      function in fetchDataUtils.js`
    );
    throw error;
  }
};

export const fetchVotes = async () => {
  try {
    const que = query(collection(db, "users"));
    const querySnapshot = await getDocs(que);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(`Error: ${error} - 
    check fetchVotes in fetchDataUtils.js`);
    throw error;
  }
};
