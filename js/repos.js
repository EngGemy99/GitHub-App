let reposContainer = document.querySelector(".repos-container");

function disPalyIssues() {
  //ده بجيب اي حاجه بعد كلمه
  // ?q
  console.log(document.location.search.split("=")[1]);
  // let reg = /\w+\/\w+.?(\w+)?/gi;
  // let repoIss = document.location.search.match(reg);
  let repoIss = document.location.search.split("=")[1];
  console.log(repoIss);
  if (repoIss) {
    getIssues(repoIss);
  }
}
function getIssues(repoName) {
  let apiUrl = `https://api.github.com/repos/${repoName}/issues`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => disPalyReposIssues(data))
    .catch((err) => console.log(err));
}
disPalyIssues();
function disPalyReposIssues(data) {
  data.forEach((rep) => {
    reposContainer.innerHTML += `
            <a class="alert alert-primary form-control mb-3  d-flex justify-content-between" href="${rep.html_url}" >
                <span>${rep.title}</span>
            </a>
        `;
  });
}
