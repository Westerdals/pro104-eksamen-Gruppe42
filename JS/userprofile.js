function renderUsername(){
    let usernameEL = document.getElementById("username");
    let myUser = JSON.parse(window.localStorage.getItem("loggedInUser")) || []
    usernameEL.innerHTML =""

    const {username} = myUser;
    // sets the innerhtml to be the username and password.
    usernameEL.innerHTML = username;
}

renderUsername();