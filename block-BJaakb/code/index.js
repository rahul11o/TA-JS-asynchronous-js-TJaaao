function fetch(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      resolve(JSON.parse(xhr.response));
    };
    xhr.onerror = function () {
      reject("something went wrong");
    };
    xhr.send();
  });
}

// console.log(fetch("https://api.github.com/users/ravi11o"));

let input = document.querySelector("input");
let imgContainer = document.querySelector("div.image-container");

function createOnloadUi(data) {
  let ul = document.createElement("ul");
  let li = document.createElement("li");
  let image = document.createElement("img");
  image.src = data.urls.small;
  li.append(image);
  ul.append(li);
  imgContainer.append(ul);
}
for (let index = 0; index < 2; index++) {
  fetch(
    "https://api.unsplash.com/photos/random/?client_id=3kIXY65yTC1PMjpUqxV5xfxoDPRVK3hRp-dlaAPrjZ8"
  ).then(function (value) {
    createOnloadUi(value);
  });
}

function handleChange(e) {
  if (e.keyCode === 13) {
    let imgsearch = e.target.value;
    imgContainer.innerHTML = "";
    for (let index = 0; index < 2; index++) {
      fetch(
        `https://api.unsplash.com/photos/random/?client_id=3kIXY65yTC1PMjpUqxV5xfxoDPRVK3hRp-dlaAPrjZ8&query=${imgsearch}`
      ).then(function (value) {
        createOnloadUi(value);
      });
    }
  }
}

input.addEventListener("keyup", handleChange);
