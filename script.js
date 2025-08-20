const proxyUrl = "https://api.allorigins.win/raw?url=";
const loadingIcon = '<i class="fa-solid fa-rotate-right fa-spin"></i>';

const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("quote-author");

let currentQuote;
let currentQuoteAuthor;
let data = [];

function showLoadingIcon() {
  quoteText.innerHTML = loadingIcon;
}

function filterQuotes() {
  //Filter out those quotes where quote or author field is empty or does not exist
  data = data.filter(function (quote) {
    return "q" in quote && "a" in quote && quote["q"] != "" && quote["a"] != "";
  });
}

async function getQuotes() {
  const apiURL = "https://fir-8f166-default-rtdb.firebaseio.com/.json";
  // const alternateApiURL = "https://zenquotes.io/api/quotes";
  showLoadingIcon();
  //Loading Icon automatically removed when displaying initial random quote

  try {
    const response = await fetch(apiURL);
    data = await response.json();

    filterQuotes();
    setRandomQuote();

  } catch (error) {
    // alert("Something Went Wrong");
    quoteText.textContent = "Error";
    authorText.textContent = "Something Went Wrong"
  }
}

function setRandomQuote() {

  showLoadingIcon();

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomQuote = data[randomIndex];

  //If length of quote is very large (>100), then change to smaller font size
  if (randomQuote["q"].length > 100) {
    quoteText.classList.add("quote-text-small");
    quoteText.classList.remove("quote-text-large");
  } else {
    quoteText.classList.add("quote-text-large");
    quoteText.classList.remove("quote-text-small");
  }

  currentQuote = randomQuote["q"];
  currentQuoteAuthor = randomQuote["a"];

  quoteText.textContent = '"' + currentQuote + '"';
  authorText.textContent = currentQuoteAuthor;
}

function openLinkedinPostComposer() {
  const linkedinWindowSize = 500;
  const linkedinShareURL =
    "https://www.linkedin.com/sharing/share-offsite/?text=" +
    '"' +
    currentQuote +
    '"' +
    "%0A%0A" +
    currentQuoteAuthor;

  window.open(linkedinShareURL, "_blank", `width=${linkedinWindowSize},height=${linkedinWindowSize}`);
  // setTimeout(() => {
  //   console.log("Hello World");
  //   linkedinWindow.document.querySelector(".ql-editor p").textContent =
  //     "Hi World";
  // }, 6000);
}

/* For setting initial random quote */
getQuotes();

// ctrl + backtick = new terminal
// ctrl + tab shift btween open FileS
// alt + arrow - copy upwards
// alt + mouse click = multiple cursors
// ctrl + h = finda and replace
// shift alt f = fpormat
