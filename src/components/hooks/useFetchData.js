// Fetch data from FB for "posts" or "comments" and update React states with fetched data:
import { useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc, getDocs, query } from "firebase/firestore";
import { fetchCommentsOrPosts } from "../utils/fetchDataUtils";

export const useFetchData = (setData, forceRender, collection) => {
  useEffect(() => {
    const fetchData = async () => {
      const collectionData = await fetchCommentsOrPosts(collection);
      setData(collectionData);
    };
    fetchData();
  }, [forceRender]);
};

export const useFetchUserDoc = async (user, setUsername) => {
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUsername(docSnap.data().username);
    } else {
      console.log(
        "Issue fetching user. Check FB authentication users. Username may have been deleted from database."
      );
    }
  } catch (error) {
    console.error(
      `Error fetching user document: ${error} Error derived from App.js`
    );
  }
};
