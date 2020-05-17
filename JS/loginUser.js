function loginUser(event) {
    const username = document.querySelector("[name = 'usernameLogin']").value;
    const password = document.querySelector("[name = 'passwordLogin']").value;

    const userInfo = JSON.parse(window.localStorage.getItem("users")) || [];

    for(const user of users){
        if(username === userInfo.name && password === userInfo.password) {
            alert("login succeeded");
        }else {
            alert("incorrect username or password, please try again.");
        }
    }

}