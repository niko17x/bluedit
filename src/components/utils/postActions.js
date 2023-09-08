import { db } from "../../lib/firebase";
import { deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import deleteCommentsOnPost from "./deleteCommentsOnPost";
import { fetchCommentsOrPosts } from "./fetchDataUtils";

export const deletePost = async (pageId, setPosts) => {
  try {
    const postRef = doc(db, "posts", pageId);
    await deleteCommentsOnPost(pageId);
    await deleteDoc(postRef);
    const updatedPosts = await fetchCommentsOrPosts("posts");
    setPosts(updatedPosts);
    console.log("Post has been successfully delete.");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserPostVotesId = async (authenticate, pageId) => {
  try {
    const postVotesIdRef = doc(
      db,
      `users/${authenticate.currentUser.uid}/postVotes/${pageId}`
    );
    await deleteDoc(postVotesIdRef);
    console.log("User postVotes ID deleted successfully.");
  } catch (error) {
    console.log(error);
  }
};

export const postCreation = async (
  postTitle,
  postBody,
  form,
  setPosts,
  username,
  user,
  addPostRef
) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await addDoc(addPostRef, {
      userDisplayText: "",
      username: username,
      userId: user.uid,
      title: postTitle,
      body: postBody,
      numberOfComments: 0,
      voteStatus: 0,
      currentUserVoteStatus: {
        id: "",
        voteValue: 0,
      },
      imageURL: "",
      postIdx: "",
      createdAt: serverTimestamp(),
      editedAt: "",
    });
    form.reset();
    const updatedPosts = await fetchCommentsOrPosts("posts");
    setPosts(updatedPosts);
    console.log("Post has been successfully created.");
  } catch (error) {
    console.log("Error: ", error);
  }
};
