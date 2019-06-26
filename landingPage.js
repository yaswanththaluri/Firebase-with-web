$(document).ready( function () {

    $("#logIn").click( function () {

        $("#signInForm").show();

    });

    $("#signUp").click( function () {

        $("#signUpForm").show();

    });

    $("#closeSiginIn").click( function () {

        $("#signInForm").hide();

    });

    $("#closeSignUp").click( function () {

        $("#signUpForm").hide();

    });


    $("#signUpSubmit").click( function () {
        var emailId = document.getElementById("siginUpEmailAddress").value;
        var password = document.getElementById("signUpPassword").value;
        var cnfPassword = document.getElementById("cnfSignUpPassword").value;
        var name = document.getElementById("nameSignUp").value;
        if (emailId.length !== 0 && password.length!==0 && name.length !== 0 && password === cnfPassword)
        {
            $("#loading").show();
            disableScreen();
            createUserInFirebase(name, emailId, password);
        }
        else
        {
            $("#myAlert").show();
        }
    });

    $("#sigInSubmit").click( function () {

        var emailId = document.getElementById("siginInEmailAddress").value;
        var password = document.getElementById("signInPassword").value;
        if (emailId.length !== 0 && password.length!==0)
        {
            $("#loading").show();
            disableScreen();
            sigInUser(emailId, password);
        }
        else
        {
            $("#myAlert").show();
        }

    });

    $("#myAlertClose").click(function () {

        $("#myAlert").hide();

    })

    
    

});



function createUserInFirebase(name, email, pswd) {

    firebase.auth().createUserWithEmailAndPassword(email, pswd).then(
        function () {
            enableScreen();
            $("#loading").hide();
            $("#signUpForm").hide();
            alert("user created successfully");
        }
    );

}

function sigInUser(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password).then(
        function () {
            enableScreen();
            $("#loading").hide();
            $("#signInForm").hide();
            alert("user signed in successfully");
        }
    ).catch(
        function (error) {
            enableScreen();
            $("#loading").hide();
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
        }
    );
    
}

function disableScreen() {
    // creates <div class="overlay"></div> and
    // adds it to the DOM
    var div= document.createElement("div");
    div.id += "overlay";
    document.body.appendChild(div);
}

function enableScreen() {
    var element = document.getElementById("overlay");
    element.parentNode.removeChild(element);
}

function clearDetails() {
    document.getElementById("siginInEmailAddress").value = "";
    document.getElementById("signInPassword").value = "";
    document.getElementById("siginUpEmailAddress").value = "";
    document.getElementById("signUpPassword").value = "";
    document.getElementById("cnfSignUpPassword").value = "";
    document.getElementById("nameSignUp").value = "";
}