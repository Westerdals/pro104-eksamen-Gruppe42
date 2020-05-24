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
    "A flower does not think of competing with the flower next to it, it just blossoms."
];
let quoteDiv = document.getElementById("quoteDiv");
let randomNr = Math.floor(Math.random()* quoteArray.length);

function renderQuote() {
    quoteDiv.innerHTML = `<i><q>${quoteArray[randomNr]}</q></i>`;
}

function openForm(index){

  switch(index){
    case 1:
      document.getElementById("editBtn").innerHTML ="Edit";
      document.getElementById("title").innerHTML ="Edit Task";
    break;
    default:
      document.getElementById("editBtn").innerHTML ="Create task";
      document.getElementById("title").innerHTML ="New task";


  }
    if(document.getElementById("form").style.display === "block"){
        document.getElementById("form").style.display = "none";
    }else{
        document.getElementById("form").style.display = "block";
    }

  }    
  function renderUserList() {
    // Link to a div in the html file.
    let usersEl = document.getElementById("circleOverview");
    // get users from local storage or if its null an empty array.
    let users = JSON.parse(window.localStorage.getItem("users")) || [];
    // gets the select vale in create task
    let memberOption = document.getElementById("selectMember");
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
      
      memberOption.innerHTML += `<option value ="${username}">${username}</option>`
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
console.log(document.getElementById("title").innerHTML);
  if(document.getElementById("title").innerHTML === "New task"){
      //resets the value when you create a task.
      document.getElementById("taskName").value;
      document.getElementById("taskDescription").value;
      document.getElementById("selectMember").value;
      document.getElementById("form").style.display = "none";
      
      const taskName = document.querySelector("[name = 'taskName']").value;
      const taskDescription = document.querySelector("[name = 'taskDescription']").value;
      const assignMember = document.querySelector("[name = 'assignMember']").value;

      const task = {taskName,taskDescription,assignMember}
      const taskList = JSON.parse(window.localStorage.getItem("toDoColumn")) || [];
      taskList.push(task);
      window.localStorage.setItem("toDoColumn",JSON.stringify(taskList));  
      feedSwitch = 1; 
      renderAll();
  }else{ // this is the edit version. 
      document.getElementById("form").style.display = "none";
      const taskName = document.querySelector("[name = 'taskName']").value;
      const taskDescription = document.querySelector("[name = 'taskDescription']").value;
      const assignMember = document.querySelector("[name = 'assignMember']").value;
      const task = {taskName,taskDescription,assignMember};

      let tempTaskName = tempTask.taskName;
      let tempTaskDescription = tempTask.taskDescription;

      const taskList = JSON.parse(window.localStorage.getItem(editTaskId)) || [];
      let index = taskList.findIndex(preEdit=> {
        if(preEdit.taskName === tempTaskName && preEdit.taskDescription === tempTaskDescription){
          return true;
        }
        return false;
      });
      // do not remove this console.log it both shows and applies the .splice. 
      console.log("Task deleted:", taskList.splice(index, 1));
      taskList.push(task);
      window.localStorage.setItem(editTaskId,JSON.stringify(taskList));  
      feedSwitch = 1; 
      renderAll();

  }
  
}
//adds two eventlisters to new tasks so you can drag and drop + edit the value. 
function addEventListeners(task,tasksEl,taskEL){

  taskEL.addEventListener("dragstart",event =>{
    data= task;
    // store the values to check them against the array to find position
   
    // gets the list from localstorage- uses "event.currentarget." to be able to use it in all 3 columns. since we store the value with that tag.
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
  taskEL.addEventListener("click", function(){
    document.getElementById("taskName").value = task.taskName;
    document.getElementById("taskDescription").value = task.taskDescription;
    document.getElementById("selectMember").value = task.assignMember;
    editTaskId = this.parentElement.id
    tempTask = task;
    openForm(1);
  });
}
function renderColumns(){
     lists = document.querySelectorAll(".progressColumns");
     lists.forEach(element => {
       let tasksEl = document.getElementById(element.id);
       tasksEl.innerHTML = "";
       let tasksList = JSON.parse(window.localStorage.getItem(element.id)) || [];
       for(const task of tasksList){

         const taskEl = document.createElement("div");
         taskEl.draggable = true;
         addEventListeners(task,tasksEl,taskEl);
         const {taskName,taskDescription,assignMember} = task;
         taskEl.innerHTML =  `
         <div class="objectDiv">
         <div>
           <strong>Task:</strong> ${taskName}
           <br>
           <strong>Description:</strong> <br><p>${taskDescription}</p>
         </div>
         <br><strong>Responsibility:</strong> <i> ${assignMember}</i>
         <br>
         <button type ="button" class ="editButton">Edit</button>
       </div>`;
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
  feedDiv = document.getElementById("feedDiv");

  switch(feedSwitch) {
    default:
      newFeedEl = document.createElement("div");
      feedDiv.appendChild(newFeedEl);
      newFeedEl.innerHTML= " this is the default value you idiot";
      break;
      case 1: 
      newFeedEl = document.createElement("div");
      feedDiv.appendChild(newFeedEl);
      newFeedEl.innerHTML = `${JSON.parse(localStorage.getItem("loggedInUser")).username} have been assigned to a new task`
      break;
      case 2: 
      newFeedEl = document.createElement("div");
      feedDiv.appendChild(newFeedEl);
      if(feedColumn === "toDoColumn"){
        feedColumn = "To Do"
        newFeedEl.innerHTML += `${JSON.parse(localStorage.getItem("loggedInUser")).username} have just moved ${feedValues} 
        into ${feedColumn} `
      }else{
        if(feedColumn === "inProgressColumn"){
          feedColumn = "In Progress";
          newFeedEl.innerHTML += `${JSON.parse(localStorage.getItem("loggedInUser")).username} Started working on ${feedValues}`
        }else{
          feedColumn = "Completed";
          newFeedEl.innerHTML += `${JSON.parse(localStorage.getItem("loggedInUser")).username} have just Completed ${feedValues}`
        }
      }
     
  }
}
/*
// not in use currently. 
function renderYourAssignedTasks(){
  toDoFeedEl = document.getElementById("toDoFeed")
  let loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  toDoFeedEl.innerHTML = "";
  let toDoList = JSON.parse(localStorage.getItem("toDoColumn"));
  let inProgList = JSON.parse(localStorage.getItem("inProgressColumn"));


let userTasks = toDoList.filter(function(e){
  return e.assignMember == loggedUser.username;})
  for(const userTask of userTasks){
    toDoFeedEl.innerHTML += userTask.taskName + userTask.taskDescription;
  }

  let progLists = inProgList.filter(function(f){
    return f.assignMember == loggedUser.username;})
  
  let inProgDiv = document.getElementById("inProgFeed");
  inProgDiv.innerHTML = "";
  for(const progList of progLists){
    inProgDiv.innerHTML += progList.taskName + progList.taskDescription;
  }
  let compDiv = document.getElementById("compFeed");
  compDiv.innerHTML="";
  let compTaskList = JSON.parse(localStorage.getItem("completedColumn"));
  let compLists = compTaskList.filter(function(r){
    return r.assignMember == loggedUser.username;})
  for(const compList of compLists){
    compDiv.innerHTML = compList.taskName + compList.taskDescription;
  }
}

*/
function editTask(){
  event.preventDefault();
  document.getElementById("form").style.display = "none";
  console.log(event.currentTarget.id);
  const taskName = document.querySelector("[name = 'taskNameEdit']").value;
  const taskDescription = document.querySelector("[name = 'taskDescriptionEdit']").value;
  const assignMember = document.querySelector("[name = 'assignMemberEdit']").value;

  const task = {taskName,taskDescription,assignMember}
  const taskList = JSON.parse(window.localStorage.getItem("toDoColumn"/*change this to event.currenttarget?*/)) || [];
  taskList.push(task);/*and here*/
  window.localStorage.setItem("toDoColumn",JSON.stringify(taskList));  /*same here ^^*/
  feedSwitch = 0; 
  renderAll();
}
renderAll();

// added function to render everytask so its easier than to call  functions. / or make a system to loop through different variants.
function renderAll() {
  renderColumns();
  renderMyUser();
  renderQuote();
  renderUserList();
  renderFeed();
}
