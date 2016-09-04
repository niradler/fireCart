$(document).ready(function() {

    function pageInit() {}
    var loggedIn = false;

    function route() {
        if (!loggedIn) {
            $('#main').load('views/signup.html');
            pageInit();
        } else {
            $('#main').load('views/myCarts.html');
        }
    }

    function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            // [START_EXCLUDE silent]
            // [END_EXCLUDE]
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // [START_EXCLUDE silent]
                loggedIn = true;
                localStorage.setItem('loggedIn', uid);
                console.log(user);
                route();
            } else {
                localStorage.removeItem(loggedIn);
                loggedIn = false;
                route();
            }
            // [END_EXCLUDE]
        });
        // [END authstatelistener]
    }
    initApp();

    $('body').on('click', '#login', function() {
        $('#main').load('views/login.html');
        pageInit();
    });
    $('body').on('click', '#signup', function() {
        $('#main').load('views/signup.html');
        pageInit();
    });
    $('body').on('click', '#signup', function() {
        $('#main').load('views/signup.html');
        pageInit();
    });
    $('body').on('click', '#myCarts', function() {
        if (loggedIn) {
            $('#main').load('views/myCarts.html');
        }
    });
    $('body').on('click', '#newCart', function() {
        if (loggedIn) {
            $('#body').load('views/newCart.html');
        }
    });
    $('#footer').load('views/footer.html');
});
