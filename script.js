const APIKEY = "810c4291511b4d90846059962bf8e670";
const url = "https://newsapi.org/v2/everything?q=";

//jab window load ho tab callback chalega
window.addEventListener("load", function () {
  console.log("load");
  //   fetchNews("India");
  fetchNews("IPL");
});

async function fetchNews(query) {
  const res = await fetch(
    `${url}${query}&apiKey=${APIKEY}`
  ); /*fetch is an async operation and async operation returns promise so you need to write await*/
  const data = await res.json();
  console.log("data", data);
  bindData(data.articles);
}

function bindData(articles) {
  console.log("articles", articles);
  //jitne articles hai utne he baar apne ko template banane hai aur us template ko banake crads-conatiner mai append karna hai
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  console.log("newsCardTemplate", newsCardTemplate);
  cardsContainer.innerHTML = ""; //setting it to empty

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = newsCardTemplate.content.cloneNode(true); //to make deep clone and we have to append this clone in cards-container
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} . ${date}`;

  //logic to redirect to news when user clicks on news image
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currentSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currentSelectedNav?.classList?.remove("active");
  currentSelectedNav = navItem;
  currentSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  console.log("click");
  const query = searchText.value;
  console.log("query", query);
  if (!query) return;
  fetchNews(query);
  currentSelectedNav?.classList?.remove("active");
  currentSelectedNav = null;
});

function reload() {
  window.location.reload(); //on clicking of image go back to home page
}
