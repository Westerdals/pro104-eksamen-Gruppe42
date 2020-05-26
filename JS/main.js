let feedValues;
let feedSwitch = 0;
let feedColumn;
let editTaskID;
let tempTask;

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
    "A flower does not think of competing with the flower next to it, it just blossoms.",
    "The best view comes after the hardest climb.",
    "Deep in their roots, all the flowers keep the light",
    "Nature is pleased with simplicity",
    "To be the best, you must be able to handle the worst",
    "",
    "",
    
];
let quoteDiv = document.getElementById("quoteDiv");
let randomNr = Math.floor(Math.random()* quoteArray.length);

function renderQuote() {
    quoteDiv.innerHTML = `<i><q>${quoteArray[randomNr]}</q></i>`;
}

function openMemberTask(){
  if(document.getElementById("memberForm").style.display === "block"){
    document.getElementById("memberForm").style.display = "none";
}else{
    document.getElementById("memberForm").style.display = "block";
}
}
  function newMember(){
    generateRandomColor();
    username = document.getElementById("memberName").value;
    let users = JSON.parse(window.localStorage.getItem("users")) || [];
    const user = { username,randomColor};
    users.push(user);
    window.localStorage.setItem("users", JSON.stringify(users));
    
    function generateRandomColor() {
      var r = Math.floor(Math.random()*256);
      var b = Math.floor(Math.random()*256);
      var g = Math.floor(Math.random()*256);
      randomColor =  `rgb(${r}, ${b}, ${g})`;
    }
    renderAll();
    openMemberTask();
  }
  function renderUserList() {
    // Link to a div in the html file.
    let usersEl = document.getElementById("circleOverview");
    // get users from local storage or if its null an empty array.
    let users = JSON.parse(window.localStorage.getItem("users")) || [];
    // gets the select vale in create task
    let memberOption = document.getElementById("selectMember");
    memberOption.innerHTML = "";
    usersEl.innerHTML ="";
    // usersEl.innerHTML="<span>Show group members</span>";
    for(const user of users){
      // creates a new div element

      const {username} = user;
      const randomColor = user.randomColor;
      // sets the innerhtml to be the username and password.

      circleDiv = document.createElement("div")
      circleDiv.className= "circleDiv"
      usersEl.appendChild(circleDiv);
      circleDiv.innerHTML += `     
         <div class="headerCircles" Style=" background-image:url('images/Monstera.png');""
        Style = "background-size: 80;"
         Style="border: 2px solid ${randomColor};">`
      circleTxt = document.createElement("div");
      circleTxt.innerHTML = username;
      circleTxt.className ="circleTxt";
      circleDiv.appendChild(circleTxt);

      deleteMemberBtn = document.createElement("img");
      deleteMemberBtn.className ="deleteMemberBtn";
      deleteMemberBtn.src = "images/deleteBtn.png"

      circleDiv.appendChild(deleteMemberBtn);
      circleDiv.addEventListener("click",function(){
       

        toDoFeedEl = document.getElementById("toDoColumn")
        let selectedUser = username;
        toDoFeedEl.innerHTML = "";
          
  lists = document.querySelectorAll(".progressColumns");
  lists.forEach(element => {
    let tasksEl = document.getElementById(element.id);
    tasksEl.innerHTML = "";
    let tasksList = JSON.parse(window.localStorage.getItem(element.id)) || [];
        let userTasks = tasksList.filter(function(e){
          return e.assignMember == selectedUser;})
    for(const task of userTasks){
      const taskEl = document.createElement("div");
      taskEl.draggable = true;
      addEventListeners(task,tasksEl,taskEl);
      const {taskName,taskDescription,assignMember} = task;
      let objectDiv = document.createElement("div");
      taskEl.appendChild(objectDiv);
      objectDiv.className = "objectDiv";
      objectDiv.innerHTML =  `
      <div>
        <strong>Task:</strong> ${taskName}
        <br>
        <strong>Description:</strong> <br><p>${taskDescription}</p>
      </div>
      <br><strong>Responsibility:</strong> <i> ${assignMember}</i>
      <br>
      `;
      let edit = document.createElement("button");
      edit.type = "button";
      objectDiv.appendChild(edit);
      edit.innerHTML = "Edit";
      edit.addEventListener("click", function(){
        document.getElementById("taskName").value = task.taskName;
        document.getElementById("taskDescription").value = task.taskDescription;
        document.getElementById("selectMember").value = task.assignMember;
        editTaskId = this.parentElement.parentElement.parentElement.id;
        tempTask = task;
        openForm(1);

  });

  let deleted = document.createElement("button");
  deleted.type = "button";
  objectDiv.appendChild(deleted);
  deleted.innerHTML ="Delete";
  deleted.addEventListener("click", function(){
    
    let tempTaskName = task.taskName;
    let tempTaskDescription = task.taskDescription;
    const taskList = JSON.parse(window.localStorage.getItem(element.id)) || [];
    // finds the previous value and removes it from localstorage. 
    let index = taskList.findIndex(preEdit=> {
      if(tempTaskName === preEdit.taskName && tempTaskDescription === preEdit.taskDescription){
        return true;
      }
      return false;
    });
          // do not remove this console.log it both shows and applies the .splice. 
    console.log("Task deleted:", taskList.splice(index, 1));
    window.localStorage.setItem(element.id,JSON.stringify(taskList));  
    feedValues = task.taskName;
    feedSwitch = 3;
    taskEl.remove();
    renderAll();
});

  objectDiv.insertAdjacentElement("beforeend",edit)
      tasksEl.appendChild(taskEl);
    }
  });
  
      });
  deleteMemberBtn.addEventListener("click",function(){
        let usersList = JSON.parse(localStorage.getItem("users"));
        let index = usersList.findIndex(member=> {
          if(username === member.username){
            console.log("it works ");
            return true;
          }
          return false;
        });
        
      let confirmed = confirm("Are you sure want do delete " + username + "?");
      if(confirmed === true){
        console.log("Task deleted:", usersList.splice(index, 1));
        window.localStorage.setItem("users",JSON.stringify(usersList)); 
        renderAll();
      }
  });


      memberOption.innerHTML += `<option value ="${username}">${username}</option>`
    }
    users = [];

  }
// Render user in top right corner 
  function renderMyUser(){
      let myEl = document.getElementById("myPlantDiv");
      let myUser = JSON.parse(window.localStorage.getItem("loggedInUser")) || []
      myEl.innerHTML =""

      const {username} = myUser;
      const randomColor = myUser.randomColor;
      // sets the innerhtml to be the username and password.
      myEl.innerHTML += ` <div class="circleDiv">
      <div class="headerCircles" Style="border: 2px solid ${randomColor};
      ">
      </div>
        <div class="circleTxt">My profile</div>
            </div>`;
  }

  function openForm(index){
    switch(index){
      case 1:
        document.getElementById("editBtn").innerHTML ="Save";
        document.getElementById("title").innerHTML ="Edit Task";
      break;
      default:
        document.getElementById("editBtn").innerHTML ="Create task";
        document.getElementById("title").innerHTML ="New task";
        document.getElementById("taskName").value = null;
        document.getElementById("taskDescription").value = null;
      break;
  
    }
      if(document.getElementById("form").style.display === "block"){
          document.getElementById("form").style.display = "none";
      }else{
          document.getElementById("form").style.display = "block";
      }
  
    }  
function createTask(){

  if(document.getElementById("title").innerHTML === "New task"){
      //resets the value when you create a task.
      event.preventDefault();
      const taskName = document.querySelector("[name = 'taskName']").value;
      const taskDescription = document.querySelector("[name = 'taskDescription']").value;
      const assignMember = document.querySelector("[name = 'assignMember']").value;
      const task = {taskName,taskDescription,assignMember}

      document.getElementById("form").style.display = "none";
      const taskList = JSON.parse(window.localStorage.getItem("toDoColumn")) || [];
      taskList.push(task);
      window.localStorage.setItem("toDoColumn",JSON.stringify(taskList));  
      feedValues = assignMember;
 
  }else{ // this is the edit version. 
    event.preventDefault();
    const taskName = document.querySelector("[name = 'taskName']").value;
    const taskDescription = document.querySelector("[name = 'taskDescription']").value;
    const assignMember = document.querySelector("[name = 'assignMember']").value;
    const task = {taskName,taskDescription,assignMember}
    //stores the value before you edit it. 
    let tempName = tempTask.taskName;
    let tempDesc = tempTask.taskDescription;
      const taskList = JSON.parse(window.localStorage.getItem(editTaskId)) || [];
      // finds the previous value and removes it from localstorage. 
      let index = taskList.findIndex(preEdit=> {
        if(tempName === preEdit.taskName  && tempDesc === preEdit.taskDescription){
          return true;
        }
        return false;
      });
      // do not remove this console.log it both shows and applies the .splice. 
      console.log("Task deleted:", taskList.splice(index, 1));
      taskList.push(task);
      window.localStorage.setItem(editTaskId,JSON.stringify(taskList)); 
      openForm();
  }
  feedSwitch = 1; 
  renderAll();
}


//adds two eventlisters to new tasks so you can drag and drop
function addEventListeners(task,tasksEl,taskEl){
taskEl.addEventListener("dragstart",event =>{
    data= task;
    // store the values to check them against the array to find position
    // gets the list from localstorage- uses "event.currentarget.id" to be able to use it in all 3 columns. since we store the value with that tag.
    //so we can use it in multiple places and scale it. 
    let storedValues =  JSON.parse(localStorage.getItem(event.currentTarget.parentElement.id))
    // loops through the array and finds the first value that fit both taskname and taskdescription, can also add teammember
    // but since its more likely you have a taskname that is common and taskdescription is different teammember becomes redundant. 
   
    let tempTaskName = data.taskName;
    let tempTaskDescription = data.taskDescription;
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
}

function renderColumns(){
  lists = document.querySelectorAll(".progressColumns");
  //for each column runs through the localstorage and creates a div for each task. 
  lists.forEach(element => {
    let tasksEl = document.getElementById(element.id);
    tasksEl.innerHTML = "";
    //finds the column in localstorage and creates a list.
    let tasksList = JSON.parse(window.localStorage.getItem(element.id)) || [];
    //loops through the list and creates elements for each task.
    for(const task of tasksList){

      const taskEl = document.createElement("div");
      taskEl.draggable = true;

      addEventListeners(task,tasksEl,taskEl);
      const {taskName,taskDescription,assignMember} = task;
      let objectDiv = document.createElement("div");
      taskEl.appendChild(objectDiv);
      objectDiv.className = "objectDiv";
      objectDiv.innerHTML =  `
      <div>
        <strong>Task:</strong> ${taskName}
        <br>
        <strong>Description:</strong> <br><p>${taskDescription}</p>
      </div>
      <br><strong>Responsibility:</strong> <i> ${assignMember}</i>
      <br>
      `;
     // created the buttons this way so it could be found and added eventlisteners individually. 
      let edit = document.createElement("button");
      edit.type = "button";
      objectDiv.appendChild(edit);
      edit.innerHTML = "Edit";
      edit.addEventListener("click", function(){
        document.getElementById("taskName").value = task.taskName;
        document.getElementById("taskDescription").value = task.taskDescription;
        document.getElementById("selectMember").value = task.assignMember;
        editTaskId = this.parentElement.parentElement.parentElement.id;
        tempTask = task;
        openForm(1);

  });

  let deleted = document.createElement("button");
  deleted.type = "button";
  objectDiv.appendChild(deleted);
  deleted.innerHTML ="Delete";
  deleted.addEventListener("click", function(){
    
    let tempTaskName = task.taskName;
    let tempTaskDescription = task.taskDescription;
    const taskList = JSON.parse(window.localStorage.getItem(element.id)) || [];
    // finds the previous value and removes it from localstorage. 
      let index = taskList.findIndex(preEdit=> {
        if(tempTaskName === preEdit.taskName && tempTaskDescription === preEdit.taskDescription){
          return true;
        }
         return false;
      });
          // do not remove this console.log it both shows and applies the .splice. 
    console.log("Task deleted:", taskList.splice(index, 1));
    window.localStorage.setItem(element.id,JSON.stringify(taskList));  
    feedValues = task.taskName;
    feedSwitch = 3;
    taskEl.remove();
    renderAll();
});

  objectDiv.insertAdjacentElement("beforeend",edit)
      tasksEl.appendChild(taskEl);
    }
  });
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
    feedValues = taskName;
    feedSwitch = 2;
    feedColumn = event.currentTarget.id;
    renderAll();
  }

   
/*-------------------------------Feed --------------------------------------------*/

function renderFeed(){
  feedList = JSON.parse(localStorage.getItem("newFeed")) || [];
  feedLength = feedList.length;
  let newFeed;
  let addFeed = false;

  feedDiv = document.getElementById("feedDiv");
  feedDiv.innerHTML = "";
  switch(feedSwitch) {
    default:
      break;
      case 1: 
      newFeed = `${feedValues} have been assigned to a new task`
      addFeed = true;
      break;
      case 2: 
        if(feedColumn === "toDoColumn"){
          newFeed = `${JSON.parse(localStorage.getItem("loggedInUser")).username} moved ${feedValues}into ${feedColumn}`
          addFeed = true;
        }else{
          if(feedColumn === "inProgressColumn"){
            newFeed = `${JSON.parse(localStorage.getItem("loggedInUser")).username} started working on ${feedValues}`
            addFeed = true;
          }else{
            addFeed = true;
            newFeed = `${JSON.parse(localStorage.getItem("loggedInUser")).username} completed ${feedValues}`;
          }
        } 
        break;
      case 3:
        addFeed = true;
        newFeed = `${JSON.parse(localStorage.getItem("loggedInUser")).username} deleted "${feedValues}"`
        addFeed = true;
        break;
  }
  if(addFeed === true){
    feedLength = feedList.length
  if(feedLength => 9){
    feedList.splice(9,1)
    feedList.unshift(newFeed);
    localStorage.setItem("newFeed",JSON.stringify(feedList))
  }else{
    feedList.unshift(newFeed)
    feedList.length;
    localStorage.setItem("newFeed",JSON.stringify(feedList))
    }
  }
  addFeed = false;
  
  for(i = 0;i < feedList.length;i++){
    newFeedEl = document.createElement("div");
    feedDiv.insertAdjacentElement("afterbegin",newFeedEl)
    feedDiv.appendChild(newFeedEl);
    feedEl = document.createElement("div");
    feedEl.className = "feedEl"
    feedDiv.appendChild(feedEl);
    feedEl.innerHTML =feedList[i]
  }

}


renderAll();

// added function to render everytask so its easier than to call functions. / or make a system to loop through different variants.
function renderAll() {
  renderColumns();
  renderMyUser();
  renderQuote();
  renderUserList();
  renderFeed();
}