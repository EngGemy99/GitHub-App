//All Variable
let getUser = document.querySelector(".Get-User");
let inputText = document.querySelector(".input-text");
let btsLanguage = document.querySelector(".bts-language");
let searchItem = document.querySelector(".search-item");
let reposContainer = document.querySelector(".repos-container");

// data from localStorage
let localStorageData = localStorage.getItem("repoData")
  ? JSON.parse(localStorage.getItem("repoData"))
  : [];
// Events
getUser.addEventListener("click", formSubmitHandler);
btsLanguage.addEventListener("click", handelClick);

// to return data and display it from localStorage
if (localStorageData.length > 0) {
  displayRepos(localStorageData);
}
// Functions

function handelClick(e) {
  if (e.target.dataset.lang) {
    reposContainer.innerHTML = "";
    getLangRepos(e.target.dataset.lang);
  }
}
function getLangRepos(lang) {
  fetch(`https://api.github.com/search/repositories?q=${lang}`)
    .then((res) => res.json())
    .then((data) => displayRepos(data.items, lang))
    .catch((err) => console.log(err));
}
async function formSubmitHandler() {
  let user = inputText.value.trim();
  if (user) {
    reposContainer.innerHTML = "";
    fetchRepos(user);
  } else {
    inputText.focus();
  }
}
function fetchRepos(user) {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("repoData", JSON.stringify(data));
      displayRepos(data, user);
    })
    .catch((err) => console.log(err));
}

function displayRepos(data, search_trem = "gemy") {
  console.log();
  if (data.length === 0 || data.message == "Not Found") {
    searchItem.innerHTML = "";
    reposContainer.innerHTML = "No Item To Show...";
    return;
  }
  searchItem.innerHTML = search_trem;
  data.forEach((rep) => {
    reposContainer.innerHTML += `
            <a class="alert alert-primary form-control mb-3  d-flex justify-content-between" href="./reposIssues.html?repo=${
              rep.owner.login
            }/${rep.name}" role="alert">
                <span>${rep.owner.login}/${rep.name}</span>
                <span>${
                  rep.open_issues_count
                    ? "<i class='fa-regular fa-rectangle-xmark'></i>" +
                      `${rep.open_issues_count}`
                    : "<i class='fa-sharp fa-solid fa-square-check'></i>"
                }</span>
            </a>
        `;
  });
}
