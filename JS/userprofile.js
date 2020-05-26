function renderUsername(){
    let usernameEL = document.getElementById("username");
    let myUser = JSON.parse(window.localStorage.getItem("loggedInUser")) || []
    usernameEL.innerHTML =""

    const {username} = myUser;
    usernameEL.innerHTML = username;
}

function logOutUser(event) {
    event.preventDefault();

    function redirectToIndex() {
        window.open("index.html","_self");
    }
    localStorage.removeItem("loggedInUser");
    redirectToIndex();
}

renderUsername();