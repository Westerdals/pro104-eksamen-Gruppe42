function loginUser(event) {
    const username = document.querySelector("[name = 'usernameLogin']").value;
    const password = document.querySelector("[name = 'passwordLogin']").value;

    const users = JSON.parse(window.localStorage.getItem("users"));

    function redirectToMain() {
        location.href = "main.html";
    }

    for(const user of users){
        if(username === user.username) {
            if(password === user.password){
                alert("login succeeded");
                redirectToMain();
            }else{
                alert("incorrect username or password, please try again.");
            }

        }else {
            console.log("couldnt find username. ");
        }
    }

}