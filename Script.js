const API_KEY = "705d77d459e0422594f6b00a5c86919f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
    fetchNews("India");
});

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(`fetching news for ${query}\n`, data);
    bindData(data.articles);

    let newsHeading = document.querySelector("#news-heading");
    newsHeading.innerHTML = `${query.toUpperCase()} - IG News`;
}

function bindData(articles) {
    const cardContainer = document.querySelector("#cards-container");
    const newsCardTemplate = document.querySelector("#template-news-card");

    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillCardData(cardClone, article);
        cardContainer.appendChild(cardClone);   
    });
    // for (let i = 0; i < 50; i++) 
}

function fillCardData(cardClone, article) {

    const newsImg = cardClone.getElementById("news-img");
    const newsTitle = cardClone.getElementById("news-title");
    const newsSource = cardClone.getElementById("news-source");
    const newsDesc = cardClone.getElementById("news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })

}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

function searchQuery() {
    const query = searchInput.value.trim();
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}

searchButton.addEventListener("click", searchQuery)
searchInput.addEventListener("keyup", (e)=>{
    if (e.key == "Enter") searchQuery();
    else return;
})



// Hamburger-Menu handling
function showSideBar() {
    const sideBar = document.querySelector("#side-bar");
    sideBar.style.right = "0px"
}

function hideSideBar() {
    const sideBar = document.querySelector("#side-bar");
    sideBar.style.right = "-300px"
}

function searchNews() {
    const searchInput = document.querySelector("#search-input");
    searchInput.focus();
    hideSideBar();
}