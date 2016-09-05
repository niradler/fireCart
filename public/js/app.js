$(document).ready(function() {

    function pageInit() {
        $('#body').html('');
    }
    var loggedIn = false;

    function route() {
        if (!loggedIn) {
            $('#main').load('views/signup.html');
            pageInit();
        } else {
            $('#main').load('views/myCarts.html');
        }
    }
window.storeItem = function(name,value,isObject){
    if(isObject){
            localStorage.setItem(name, JSON.stringify(value));
    }else{
        localStorage.setItem(name, value);
    }
}
window.getItem = function(name,isObject){
    if(isObject){
            return JSON.parse(localStorage.getItem(name));
    }else{
        return localStorage.getItem(name);
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
                loggedIn = user;
                storeItem('loggedIn',user,1);
                console.log("user",user);
                route();
                $('#footer').load('views/footerNav.html',function(){
                    $('#footerMenu').slideUp("slow");
                });
            } else {
                $('#footer').load('views/footer.html');
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
        pageInit()
        if (loggedIn) {
            $('#main').load('views/myCarts.html');
        }
    });

    var foState = true;
    $('body').on('click', '#tmenu', function() {
        if(foState){
            $('#footerMenu').slideUp("slow");
            foState=false;
        }else{
            $('#footerMenu').slideDown("slow");
            foState=true;
        }

    });


});
