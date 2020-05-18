function loginUser(event) {
    const username = document.querySelector("[name = 'usernameLogin']").value;
    const password = document.querySelector("[name = 'passwordLogin']").value;

    const user = JSON.parse(window.localStorage.getItem("users")) || [];

    for(const user of users){
        if(username === user.username && password === user.password) {
            alert("login succeeded");
        }else {
            alert("incorrect username or password, please try again.");
        }
    }

}