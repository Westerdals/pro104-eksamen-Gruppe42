

function createNewUser(event) {
    //prevents the page from refreshing and a couple of other things. 
    event.preventDefault();
  
    //gets the name and password value from the input field
    const username = document.querySelector("[name = 'username']").value;
    const password = document.querySelector("[name = 'psw']").value;
    const password_2 = document.querySelector("[name = 'password_2']").value;
    generateRandomColor();
    // creates a teamMember from the information.
    const user = { username,password,randomColor};
    
    const users = JSON.parse(window.localStorage.getItem("users")) || [];
    for(user1 of users){
        if(username === user1.username) {
          alert("username is taken");
          return;
        }else {
            console.log("username is available ");
        }
    }

    if(password != password_2) {
        alert("passwords does not match")
    }else{
      
      /*
    console.log("this is")
    // Passord må inneholde (?)
    var passw =   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(password.match(passw)) { 
      console.log("congratz");
    }
    else { 
        alert('Wrong...!');
        return;
    }
*/

        //Pushes the new users into the array so it doesnt erase the previous one. 
        users.push(user);
        window.localStorage.setItem("users", JSON.stringify(users));
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
  

  function generateRandomColor() {
    var r = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    randomColor =  `rgb(${r}, ${b}, ${g})`;

  }