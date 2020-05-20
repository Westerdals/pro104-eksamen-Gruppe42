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
var quoteDiv = document.getElementById("quoteDiv");
var randomNr = Math.floor(Math.random()* quoteArray.length);
var randomColor;

function renderQuote() {
    quoteDiv.innerHTML = `<i><q>${quoteArray[randomNr]}</q></i>`;
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
      //generates random color
      generateRandomColor();
      // creates a new div element

      const {username} = user;
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

  function generateRandomColor() {
    var r = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    randomColor =  `rgb(${r}, ${b}, ${g})`;

    
  }

  renderQuote();
  renderUserList();