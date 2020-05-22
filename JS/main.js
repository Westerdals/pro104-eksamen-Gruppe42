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

renderQuote();
renderUserList();


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
  renderMyUser();
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
        <div class="circleTxt">${username}</div>
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
    const taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
    taskList.push(task);
    window.localStorage.setItem("taskList",JSON.stringify(taskList));
    
}
renderToDo();
function renderToDo(){
    let tasksEL = document.getElementById("toDoColumn");
    let taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
    tasksEL.innerHTML = "";

    for(const task of taskList){
        const taskEL = document.createElement("div");
        taskEL.draggable = true;
        taskEL.addEventListener("dragstart",event =>{
            data= task;
            console.log(data);
            event.currentTarget.style.border = "dashed";
            console.log(event.target.getAttribute("data-json"));
            event.dataTransfer.setData("text/plain",event.target.id);   
        })
        const {taskName,taskDescription,assignMember} = task;
        
/*        ondragstart="dragstart_handler(event);" draggable="true"
        data-json='{"taskName:${taskName}, "TaskDescription: 
        ${taskDescription}, Assigned Member:  ${assignMember}"'*/
        taskEL.innerHTML =  `
        <div class="objectDiv" 
        >
          <h4>Task</h4>
          <div>
            <strong>Task:</strong> ${taskName}
            <br>
            <strong>Description:</strong> ${taskDescription}
          </div>
          <strong>Team: ${assignMember}</strong>
          <br>
          <br>
        </div>`;
        tasksEL.appendChild(taskEL);
        
    }

    }


    function dragstart_handler(event){
      console.log("dragstart");
      event.
    }

    function dragover_handler(event){
        console.log("dragging over");
        event.preventDefault();
        
    }

    function drop_handler(event){
        event.preventDefault();
        console.log(data);
        const movedEL = document.createElement("div");
        movedEL.draggable = true;
        movedEL.addEventListener("dragstart",event =>{
            event.currentTarget.style.border = "dashed";
            event.dataTransfer.setData("text/plain",event.target.id);   
          });

        movedEL.innerHTML =  `
        <div class="objectDiv" 
        >
          <div>
            <strong>Task:</strong> ${data.taskName}
            <br>
            <strong>Description:</strong> ${data.taskDescription}
          </div>
          <strong>Team: ${data.assignMember}</strong>
          <br>
          <br>
        </div>`;
        event.target.appendChild(movedEL);
        event.dataTransfer.clearData();
        
    }

  /*------------------------CREATE USER FRA ARBEIDSKRAVET BELOW----------------------


function addTask(){
  taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
  document.getElementById('myTasks').innerHTML = "";
  for(const task of taskList){
    console.log(taskList);
      localStorage.getItem(taskList.name) ;
      document.getElementById('myTasks').innerHTML +=  "<option value=>" + task.taskName + "</option>";
  }
  taskList = [];
}

function renderTaskList() {
  let tasksEl = document.getElementById("outputDiv");
  let taskList = JSON.parse(window.localStorage.getItem("taskList")) || [];
   tasksEl.innerHTML ="";
  for(const task of taskList){
    
    const taskEl = document.createElement("div");
    const {taskName,description} = task;
    taskEl.innerHTML =  `
    <div class="objectDiv">
      <h4>Task</h4>
      <div>
        <strong>Task:</strong> ${taskName}
        <br>
        <strong>Description:</strong> ${description}
      </div>
      <br>
      <br>
      <br>
      <br>
    </div>`;
    tasksEl.appendChild(taskEl);
  }
  taskList = [];
}
*/
