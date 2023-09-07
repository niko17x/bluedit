// Create and export all firebase references in one file (here):
import { db } from "../../lib/firebase";
import { collection, getDoc, deleteDoc, addDoc } from "firebase/firestore";

export const commentsCollectionRef = collection(db, "comments");
