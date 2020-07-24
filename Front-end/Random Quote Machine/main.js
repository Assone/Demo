var colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const response = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  );
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status <= 300) {
        resolve(xhr.response);
      } else if (xhr.status >= 400) {
        reject(xhr.response);
      }
    }
  };
  xhr.send();
});

function getRandomQuote() {
  response.then((data) => {
    const result = JSON.parse(data).quotes;
    const randomIndex = Math.floor(Math.random() * result.length);
    const content = result[randomIndex];

    quoteContent.textContent = content.quote;
    authorContent.textContent = `- ${content.author}`;
    shareTwitter.setAttribute(
      "href",
      `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
        '"' + content.quote + '" ' + content.author
      )}`
    );
    shareTumblr.setAttribute(
      "href",
      `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
        content.author
      )}&content=${encodeURIComponent(
        content.quote
      )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
    );

    const color = colors[Math.floor(Math.random() * colors.length)];
    body.style.backgroundColor = color;
    shareTwitter.style.backgroundColor = color;
    shareTumblr.style.backgroundColor = color;
    nextButton.style.backgroundColor = color;
    quoteArea.style.color = color;
  });
}

const body = document.querySelector("body");

const quoteArea = document.querySelector("#content");
const quoteContent = document.querySelector("#quote-content");
const authorContent = document.querySelector("#author");

const shareTwitter = document.querySelector("#tweet-quote");
const shareTumblr = document.querySelector("#tumblr-quote");
const nextButton = document.querySelector("#new-quote");
getRandomQuote();

nextButton.addEventListener("click", getRandomQuote);
