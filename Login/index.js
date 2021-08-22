Parse.initialize(config.APP_ID, config.JAVASCRIPT_KEY); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = config.SERVER_URL 

if (Parse.User.current()) {
    window.location.href = config.NOTES_PATH;
}

$("#login-btn").click(function () {
    let username = $("#login-username").val();
    let password = $("#login-password").val();
    // Create a new instance of the user class
    var user = Parse.User
        .logIn(username, password).then(function(user) {
            window.location.href = config.NOTES_PATH;
    }).catch(function(error){
        alert("Error: " + error.code + " " + error.message);
    });
})