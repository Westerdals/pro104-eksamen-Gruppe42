var quoteArray = [
    "To plant a garden is to believe in tomorrow. - Audrey Hepburn",
    "Watching something grow is good for morale. It helps us believe in life. - Myron S. Kaufman",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
];
var quoteDiv = document.getElementById("quoteDiv");
var randomNr = Math.floor(Math.random()* quoteArray.length);

function renderQuote() {
    quoteDiv.innerHTML = `<i><q>${quoteArray[randomNr]}</q></i>`;
}


renderQuote();