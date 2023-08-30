### Todo:

[*] : Trying to implement "log in" and "register" user through form and firebase. Currently "log in" seems to be submitting the form for a new user registeration.
[*] : The log in modal is opening by default even before the log in button is clicked on. Also, the "close modal" is not working after pressing 'x' on the modal.
[*] : Allow user to register new account by submitting new email and password (store inside state) and pass data to Firebase.
[*] : Working on "create your username and password" modal to register a new user. Currently not doing anything after clicking "continue".
[*] : Form validation error. Getting the error code received by Firebase and using the code to display to user. ie: input email to sign in doesn't exist so let user know that email does not exist in database and to try submitting the form again.
[*] : "signinUser" modal error codes foundation set. Work on the "registerUser" modal with the same logic for displaying error codes using setTimeout and also "userCred" modal.
[*] : Add user "username" to the database for rendering to post.
• "Post Page" can only be invoked when a user is signed in.
• If user is not valid, render a modal that tells user "you must be signed in first in order to post.".
[*] : Add the actual username to the post that is being created instead of the demo username.
• Bug => The username is only attached to the first post created. If creating another post with the same user/username, the username is just an empty string.
[*] : Clicking on a post takes user to post page.
• User click on a post and is taken to the corresponding page with that specific post.
• Use the post id for unique page identifier.
[*] : Allow post to be deleted by the author.
• Add a trash can to symbolize option delete post if author is signed in.
[*] : Deleting a post by the author should re-route the page to the homepage.
• Display "Post has been deleted" message after post deletion => re-route homepage.
[*] : After post creation by author, page should be redirected to the "detailed post page".
[*] : Vote number on Homepage.jsx should show "Vote" if there are not votes as a default value.
[] : On AllPosts.jsx component, how can I have the vote section refresh the updated vote count without having to refresh the entire page?
[] : Work on post comments.
• Create subcollection under users in FB to document which posts the user has voted on.
• Under posts in FB there should be a field in the current collection called "voteStatus" that tracks the number of votes for that particular post.
• If a user is signed in, they should be able to comment.
• If no user is signed in and "comment" button is clicked on, a modal should appear asking to sign in first.

### Todo (after 90% completion):

[] : Use Firebase cloud functions to automatically delete/remove users/accounts when deleted.
[] : Handle the multiple replications of console logs during page initiation.
[] : Every time component renders, 'isAuthorLoggedIn' is invoked potentially making it expensive. Given that you've already fetched the post with 'showPost', you could also determine if the author is logged in outside of the function and store that as a constant in 'DisplayedDetailedPost.jsx'.
[] : Move the modal functions to its own separate file from the App.jsx file.
[] : React router dom "useNavigate" is being used in multiple components. Can the DRY principle be applied here?
[] : Instead of "Delete Post" during Post Creation, give the option to "Save Draft" instead.

### What I've Learned:

• Async and await are used to resolve a promise. Basically saying surrounding code should temporarily halt until the Promise has been resolved.
• "try...catch" blocks aren't always necessary but does allow you to keep code more organized and better error handling. Controlling the flow of the code is also improved. If an error is the result, then you can handle that part of the code.
• "?" is the optional chaining operator in JS. When you place it before a property or method, it will only attempt to access that property or method if the object before the "?" is not 'null' or 'undefined', it will short-circuit the expression and return 'undefined'. ie: console.log(user?.address?.street) => if 'user' and 'address' is not null/undefined, the output will be valid.
