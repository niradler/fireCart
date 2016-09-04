/**
    * Handles the sign up button press.
    */
   function handleSignUp() {
      var loginform = $('#SignupForm');
     var email = loginform[0][1].value;
     var password = loginform[0][2].value;
     if (email.length < 4) {
       alert('Please enter an email address.');
       return;
     }
     if (password.length < 4) {
       alert('Please enter a password.');
       return;
     }
     // Sign in with email and pass.
     // [START createwithemail]
     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // [START_EXCLUDE]
       if (errorCode == 'auth/weak-password') {
         alert('The password is too weak.');
       } else {
         alert(errorMessage);
       }
       console.log(error);
       // [END_EXCLUDE]
     });
     // [END createwithemail]
   }
   $('body').on('click', '#signSubmit', handleSignUp);
