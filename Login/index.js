Parse.initialize("eflWwBpbKNwr03iTm7wMFOzuT6zLfv1SIbZ1knrv", "EYbQr4Vs4dMOx9PSaLisR3h6HVoL57YbC7QlXmGJ"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

if (Parse.User.current()) {
    alert("Logged in");
} else {
    alert("Please log in")
}

$("#login-btn").click(function () {
    let username = $("#login-username").val();
    let password = $("#login-password").val();
    // Create a new instance of the user class
    var user = Parse.User
        .logIn(username, password).then(function(user) {
           alert('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
    }).catch(function(error){
        alert("Error: " + error.code + " " + error.message);
    });
})