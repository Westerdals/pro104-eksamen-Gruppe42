

function createNewUser(event) {
    //prevents the page from refreshing and a couple of other things. 
    event.preventDefault();
  
    //gets the name and password value from the input field
    const username = document.querySelector("[name = 'username']").value;
    const password = document.querySelector("[name = 'password']").value;
    const password_2 = document.querySelector("[name = 'password_2']").value;
   
    // creates a teamMember from the information.
    const user = { username,password};
    const users = JSON.parse(window.localStorage.getItem("users")) || [];
    for(user1 of users){
        if(username === user1.username) {
          alert("username is taken");
          return;
        }else {
            console.log("username is free ");
        }
    }

    if(password != password_2) {
        alert("passwords does not match")
    }else{
      
      
    console.log("this is")
    var passw =   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(password.match(passw)) { 
      alert("Correct, try another...");
    }
    else { 
        alert('Wrong...!')
        return;
    }


        //Pushes the new users into the array so it doesnt erase the previous one. 
        users.push(user);
        window.localStorage.setItem("users", JSON.stringify(users));
       // renderUserList();
        addUser();
        // add users into the option field of assignmember. 
        // resets the input field so the values is default.
        event.target.reset();
    }
  }
  
  function addUser(event){
    let users = JSON.parse(window.localStorage.getItem("users")) || [];
    // document.getElementById('myWorkers').innerHTML = "";
    for(const user of users){
        localStorage.getItem(user.name);
        // document.getElementById('myWorkers').innerHTML += "<option value=>" + user.name + "</option>";
      }
      users = [];
  }
  
  /*
  // the function that gets the users on the page. 
  function renderUserList() {
    // Link to a div in the html file.
    let usersEl = document.getElementById("outputDiv");
    // get users from local storage or if its null an empty array.
    
    usersEl.innerHTML ="";
    // usersEl.innerHTML="<span>Show group members</span>";
    for(const user of users){
      // creates a new div element
      const userEl = document.createElement("div");
      const {username,password} = user;
      // sets the innerhtml to be the username and password.
      userEl.innerHTML = `
      <div class="objectDiv">
        <h4>User</h4>
        <div>
          <strong>Username:</strong> ${username}
          <br>
          <strong>Password:</strong> ${password}
        </div>
        <br>
        <br>
        <br>
        <br>
      </div>`;
      usersEl.appendChild(userEl);
    }
    teamMembers = [];
*/
  
