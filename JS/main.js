var quoteArray = [
    "To plant a garden is to believe in tomorrow. - Audrey Hepburn",
    "Watching something grow is good for morale. It helps us believe in life. - Myron S. Kaufman",
    "Don't judge each day by the harvest you reap, but the seeds that you plant. - Robert Lewis Stevenson",
    "We don't grow when things are easy.",
    "The greatest threat to our planet is the belief that someone else will save it. - Robert Swan",
    "Faith plants the seed. Love makes it grow.",
    "Plant your own garden and decorate your own soul instead of waiting for someone to bring you flowers.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Keep going, keep growing",
    "A flower does not think of competing with the flower next to it, it just blossoms."
];
let quoteDiv = document.getElementById("quoteDiv");
let randomNr = Math.floor(Math.random()* quoteArray.length);
let randomColor;

function renderQuote() {
    quoteDiv.innerHTML = `<i><q>${quoteArray[randomNr]}</q></i>`;
}

function openForm(){
    if(document.getElementById("form").style.display === "none"){
        document.getElementById("form").style.display = "block";
    }else{
        document.getElementById("form").style.display = "none";
    }
    
}


  // the function that gets the users on the page. 
  function renderUserList() {
    // Link to a div in the html file.
    let usersEl = document.getElementById("circleOverview");
    // get users from local storage or if its null an empty array.
    let users = JSON.parse(window.localStorage.getItem("users")) || [];
    usersEl.innerHTML ="";
    // usersEl.innerHTML="<span>Show group members</span>";
    for(const user of users){
      // creates a new div element

      const {username} = user;
      const randomColor = user.randomColor;
      // sets the innerhtml to be the username and password.
      usersEl.innerHTML += ` <div class="circleDiv">
      <div class="headerCircles" Style="border: 2px solid ${randomColor};
      ">
      </div>
        <div class="circleTxt">${username}</div>
            </div>`;
    }
    users = [];
  }
// Render user in top right corner 

  function renderMyUser(){
      let myEL = document.getElementById("myPlantDiv");
      let myUser = JSON.parse(window.localStorage.getItem("loggedInUser")) || []
      myEL.innerHTML =""

      const {username} = myUser;
      const randomColor = myUser.randomColor;
      // sets the innerhtml to be the username and password.
      myEL.innerHTML += ` <div class="circleDiv">
      <div class="headerCircles" Style="border: 2px solid ${randomColor};
      ">
      </div>
        <div class="circleTxt">My profile</div>
            </div>`;

  }
function createTask(){
  
    event.preventDefault();
    document.getElementById("form").style.display = "none";
    const taskName = document.querySelector("[name = 'taskName']").value;
    const taskDescription = document.querySelector("[name = 'taskDescription']").value;
    const assignMember = document.querySelector("[name = 'assignMember']").value;
    console.log(taskName,taskDescription,assignMember);

    const task = {taskName,taskDescription,assignMember}
    const taskList = JSON.parse(window.localStorage.getItem("toDoColumn")) || [];
    taskList.push(task);
    window.localStorage.setItem("toDoColumn",JSON.stringify(taskList));   
}
function renderToDo(){
    let tasksEL = document.getElementById("toDoColumn");
    let taskList = JSON.parse(window.localStorage.getItem("toDoColumn")) || [];
    tasksEL.innerHTML = "";
    for(const task of taskList){
      
        const taskEL = document.createElement("div");
        taskEL.draggable = true;
        taskEL.addEventListener("dragstart",event =>{
            data= task;
            // store the values to check them against the array to find position
            let tempTaskName = data.taskName;
            let tempTaskDescription = data.taskDescription;
            // gets the list from localstorage- uses "event.currentarget." to be able to use it in all 3 columns. since we store the value with that tag.
            let storedValues =  JSON.parse(localStorage.getItem(event.currentTarget.parentElement.id))
            // loops through the array and finds the first value that fit both taskname and taskdescription, can also add teammember
            // but since its more likely you have a taskname that is common and taskdescription is different teammember becomes redundant. 
            let index = storedValues.findIndex(storedValue=> {
              if(storedValue.taskName === tempTaskName && storedValue.taskDescription === tempTaskDescription){
                return true;
              }
              return false;
            });
            // do not remove this console.log it both shows and applies the .splice. 
            console.log("Task deleted:", storedValues.splice(index, 1));
            // stores the list back into localstorage with the element removed. 
            localStorage.setItem(event.currentTarget.parentElement.id, JSON.stringify(storedValues));
            event.dataTransfer.setData("text/plain",event.target.id);  
        });
        
  
        const {taskName,taskDescription,assignMember} = task;
        taskEL.innerHTML =  `
        <div class="objectDiv" 
      >
        <div>
          <strong>Task:</strong> ${taskName}
          <br>
          <strong>Description:</strong> <br><p>${taskDescription}</p>
        </div>
        <br><strong>Responsibility:</strong> <i> ${assignMember}</i>
        <br>
      </div>`;
        tasksEL.appendChild(taskEL);
        
    }

}

function renderInProgress(){
  let tasksEL = document.getElementById("inProgressColumn");
  let inProgressList = JSON.parse(window.localStorage.getItem("inProgressColumn")) || [];
  tasksEL.innerHTML = "";

  for(const task of inProgressList){
           
    const taskEL = document.createElement("div");
    taskEL.draggable = true;
    taskEL.addEventListener("dragstart",event =>{
        data= task;
        // store the values to check them against the array to find position
        let tempTaskName = data.taskName;
        let tempTaskDescription = data.taskDescription;
        // gets the list from localstorage- uses "event.currentarget." to be able to use it in all 3 columns. since we store the value with that tag.
        let storedValues =  JSON.parse(localStorage.getItem(event.currentTarget.parentElement.id))
        // loops through the array and finds the first value that fit both taskname and taskdescription, can also add teammember
        // but since its more likely you have a taskname that is common and taskdescription is different teammember becomes redundant. 
        let index = storedValues.findIndex(storedValue=> {
          if(storedValue.taskName === tempTaskName && storedValue.taskDescription === tempTaskDescription){
            return true;
          }
          return false;
        });
        // do not remove this console.log it both shows and applies the .splice. 
        console.log("Task deleted:", storedValues.splice(index, 1));
        // stores the list back into localstorage with the element removed. 
        localStorage.setItem(event.currentTarget.parentElement.id, JSON.stringify(storedValues));
        event.dataTransfer.setData("text/plain",event.target.id);
        
    });
    tasksEL.appendChild(taskEL);
      const {taskName,taskDescription,assignMember} = task;
      taskEL.innerHTML =  `
      <div class="objectDiv" 
      >
        <div>
          <strong>Task:</strong> ${taskName}
          <br>
          <strong>Description:</strong> <br><p>${taskDescription}</p>
        </div>
        <br><strong>Responsibility:</strong> <i> ${assignMember}</i>
        <br>
      </div>`;
      
      
  }
}

function renderCompleted(){
  let tasksEL = document.getElementById("completedColumn");
  let inProgressList = JSON.parse(window.localStorage.getItem("completedColumn")) || [];
  tasksEL.innerHTML = "";
let index = 0;
  for(const task of inProgressList){
      const taskEL = document.createElement("div");
      taskEL.draggable = true;
     taskEL.addEventListener("dragstart",event =>{
      data= task;
      // store the values to check them against the array to find position
      let tempTaskName = data.taskName;
      let tempTaskDescription = data.taskDescription;
      // gets the list from localstorage- uses "event.currentarget." to be able to use it in all 3 columns. since we store the value with that tag.
      let storedValues =  JSON.parse(localStorage.getItem(event.currentTarget.parentElement.id))
      // loops through the array and finds the first value that fit both taskname and taskdescription, can also add teammember
      // but since its more likely you have a taskname that is common and taskdescription is different teammember becomes redundant. 
      let index = storedValues.findIndex(storedValue=> {
        if(storedValue.taskName === tempTaskName && storedValue.taskDescription === tempTaskDescription){
          return true;
        }
        return false;
      });
      // do not remove this console.log it both shows and applies the .splice. 
      console.log("Task deleted:", storedValues.splice(index, 1));
      // stores the list back into localstorage with the element removed. 
      localStorage.setItem(event.currentTarget.parentElement.id, JSON.stringify(storedValues));
      event.dataTransfer.setData("text/plain",event.target.id);
      
  });
        
      const {taskName,taskDescription,assignMember} = task;
      taskEL.innerHTML =  `
      <div class="objectDiv" 
      >
        <div>
          <strong>Task:</strong> ${taskName}
          <br>
          <strong>Description:</strong> <br><p>${taskDescription}</p>
        </div>
        <br><strong>Responsibility:</strong> <i> ${assignMember}</i>
        <br>
      </div>`;
      tasksEL.appendChild(taskEL);
      
  }

}
    function dragstart_handler(event){
      
    }

    function dragover_handler(event){
        event.preventDefault();
        
    }

    function drop_handler(event){
        event.preventDefault();
        let taskName = data.taskName;
        let taskDescription = data.taskDescription;
        let assignMember = data.assignMember
        const task = {taskName,taskDescription,assignMember}
        const taskList = JSON.parse(window.localStorage.getItem(event.currentTarget.id)) || [];
        taskList.push(task);
        window.localStorage.setItem(event.currentTarget.id,JSON.stringify(taskList));
        renderAll();
    }


renderAll();
// added function to render everytask so its easier than to call  functions. / or make a system to loop through different variants.
function renderAll() {
  renderInProgress();
  renderToDo();
  renderCompleted();
  renderQuote();  
  renderUserList();
  renderMyUser();

}