function createNewMember(event) {
    //prevents the page from refreshing and a couple of other things. 
    event.preventDefault();
  
    //gets the name and age value from the input field
    const name = document.querySelector("[name = 'name']").value;
    const age = document.querySelector("[name = 'age']").value;
  
    // creates a teamMember from the information.
    const teamMember = { name,age};
    const teamMembers = JSON.parse(window.localStorage.getItem("teamMembers")) || [];
      
    //Pushes the new teamMember into the array so it doesnt erase the previous one. 
    teamMembers.push(teamMember);
    window.localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    renderMemberList();
    addMember();
    // add members into the option field of assignmember. 
    // resets the input field so the values is default.
    event.target.reset();
  }
  
  function addMember(event){
    let teamMembers = JSON.parse(window.localStorage.getItem("teamMembers")) || [];
    document.getElementById('myWorkers').innerHTML = "";
    for(const teamMember of teamMembers){
        localStorage.getItem(teamMember.name);
        document.getElementById('myWorkers').innerHTML += "<option value=>" + teamMember.name + "</option>";
      }
      teamMembers = [];
  }
  
  // the function that gets the members on the page. 
  function renderMemberList() {
    // Link to a div in the html file.
    let teamMembersEl = document.getElementById("outputDiv");
    // get teammembers from local storage or if its null an empty array.
    let teamMembers = JSON.parse(window.localStorage.getItem("teamMembers")) || [];
    teamMembersEl.innerHTML ="";
    // teamMembersEl.innerHTML="<span>Show group members</span>";
    for(const teamMember of teamMembers){
      // creates a new div element
      const memberEl = document.createElement("div");
      const {name,age} = teamMember;
      // sets the innerhtml to be the name and age.
      memberEl.innerHTML = `
      <div class="objectDiv">
        <h4>Group member</h4>
        <div>
          <strong>Name:</strong> ${name}
          <br>
          <strong>Age:</strong> ${age}
        </div>
        <br>
        <br>
        <br>
        <br>
      </div>`;
      teamMembersEl.appendChild(memberEl);
    }
    teamMembers = [];
  }
