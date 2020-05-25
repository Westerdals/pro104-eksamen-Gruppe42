function renderUsername(){
    let usernameEL = document.getElementById("username");
    let myUser = JSON.parse(window.localStorage.getItem("loggedInUser")) || []
    usernameEL.innerHTML =""

    const {username} = myUser;
    usernameEL.innerHTML = username;
}

renderUsername();