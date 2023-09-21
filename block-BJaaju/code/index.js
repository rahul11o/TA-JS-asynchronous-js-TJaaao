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
for (let index = 0; index < 10; index++) {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.unsplash.com/photos/random/?client_id=crK-h8rpGefQoKoiW5YuqAKwATEvgZ9WpEc33wLYaV8"
  );
  xhr.onload = function () {
    let randomImgData = JSON.parse(xhr.response);
    createOnloadUi(randomImgData);
  };
  xhr.send();
}

function handleChange(e) {
  if (e.keyCode === 13) {
    let imgsearch = e.target.value;
    imgContainer.innerHTML = "";
    for (let index = 0; index < 10; index++) {
      let xhr2 = new XMLHttpRequest();
      xhr2.open(
        "GET",
        `https://api.unsplash.com/photos/random/?client_id=crK-h8rpGefQoKoiW5YuqAKwATEvgZ9WpEc33wLYaV8&query=${imgsearch}`
      );
      xhr2.onload = function () {
        let searchImgData = JSON.parse(xhr2.response);
        createOnloadUi(searchImgData);
      };
      xhr2.send();
    }
  }
}

input.addEventListener("keyup", handleChange);
