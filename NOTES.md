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
[] : Add the actual username to the post that is being created instead of the demo username.
• Bug => The username is only attached to the first post created. If creating another post with the same user/username, the username is just an empty string.

### Todo (after 90% completion):

[] : Use Firebase cloud functions to automatically delete/remove users/accounts when deleted.
[] : Handle the multiple replications of console logs during page initiation.
