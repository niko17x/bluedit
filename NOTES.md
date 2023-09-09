### Todo:

[*] : Trying to implement "log in" and "register" user through form and firebase. Currently "log in" seems to be submitting the form for a new user registeration.
[*] : The log in modal is opening by default even before the log in button is clicked on. Also, the "close modal" is not working after pressing 'x' on the modal.
[*] : Allow user to register new account by submitting new email and password (store inside state) and pass data to Firebase.
[*] : Working on "create your username and password" modal to register a new user. Currently not doing anything after clicking "continue".
[*] : Form validation error. Getting the error code received by Firebase and using the code to display to user. ie: input email to sign in doesn't exist so let user know that email does not exist in database and to try submitting the form again.
[*] : "signinUser" modal error codes foundation set. Work on the "registerUser" modal with the same logic for displaying error codes using setTimeout and also "userCred" modal.
[*] : Add user "username" to the database for rendering to post.
[*] : Add the actual username to the post that is being created instead of the demo username.
[*] : Clicking on a post takes user to post page.
[*] : Allow post to be deleted by the author.
[*] : Deleting a post by the author should re-route the page to the homepage.
[*] : After post creation by author, page should be redirected to the "detailed post page".
[*] : Vote number on Homepage.jsx should show "Vote" if there are not votes as a default value.
[*] : On AllPosts.jsx component, how can I have the vote section refresh the updated vote count without having to refresh the entire page?
[*] : Make votes work on the "DisplayDetailedPost.jsx" component.
[*] : Create a comment box in DisplayDetailedPost.jsx directly below the main post.
[*] : Author of comments can delete the comment or edit the comment. Show deltee option only for author.
[*] : Clicking on delete should remove data/comment from fb and useState.
[*] : Once user has typed in the comment box, comment submission button should be highlighted.
[*] : Create function for comment submission.
[*] : Submitting the comment should show below the comment box.
[*] : Delete comment when post gets deleted.
[*] : Work on voting for individual comments.
[ ] : Fix voting on comments. There's a bug that does not calculate the voting correctly for comments.

### Todo (after 90% completion):

[] : Use Firebase cloud functions to automatically delete/remove users/accounts when deleted.
[] : Handle the multiple replications of console logs during page initiation.
[] : Every time component renders, 'isAuthorLoggedIn' is invoked potentially making it expensive. Given that you've already fetched the post with 'showPost', you could also determine if the author is logged in outside of the function and store that as a constant in 'DisplayedDetailedPost.jsx'.
[] : Move the modal functions to its own separate file from the App.jsx file.
[] : React router dom "useNavigate" is being used in multiple components. Can the DRY principle be applied here?
[] : Instead of "Delete Post" during Post Creation, give the option to "Save Draft" instead.
[] : Using Firebase cloud actions to store all the user votes in posts/comments to a state variable for reuse.
[] : Create separate util functions that simply deal with get/add FB docs.
[] : Update error handling for all components/utils for enhanced user experience.

### What I've Learned:

• Async and await are used to resolve a promise. Basically saying surrounding code should temporarily halt until the Promise has been resolved.
• "try...catch" blocks aren't always necessary but does allow you to keep code more organized and better error handling. Controlling the flow of the code is also improved. If an error is the result, then you can handle that part of the code.
• "?" is the optional chaining operator in JS. When you place it before a property or method, it will only attempt to access that property or method if the object before the "?" is not 'null' or 'undefined', it will short-circuit the expression and return 'undefined'. ie: console.log(user?.address?.street) => if 'user' and 'address' is not null/undefined, the output will be valid.
• In Firebase, you can use "batch" to make bulk changes to the database instead of changing one thing at a time. This allows data read/write to be more efficient and safe. Safe b/c batch will not write data if something fails ensuring either all the changes are made together or none until resolved.
• Components and functions are much more manageable and easier to debug when they are purposed for one thing only.
• When dealing with multiple related functions (ie: voteActionsUtil.js), the benefits of keeping them together include: cohesion, ease of import, easier to maintain, function relations are easier to read, code reusability
• React `useEffect` can not be invoked within an async function.
