let h2 = document.querySelector("h2");
let p = document.querySelector("p");
let image = document.querySelector("img");
let input = document.querySelector("input");
let followerUl = document.querySelector("div.followers ul");
let followingUl = document.querySelector("div.following ul");
let secImage = document.querySelector("section.secondary-section img");
let secButton = document.querySelector("section.secondary-section button");

// Function to get a random integer between min and max (inclusive)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get 5 random elements  from an array;

function fiveRandomElementFromArr(arr) {
  let selectedElements = []; // Array to store the selected random elements

  arr.forEach(function (element) {
    // Check if we have selected 5 random elements already
    if (selectedElements.length < 5) {
      var randomIndex = getRandomInt(0, arr.length - 1);
      var randomElement = arr[randomIndex];

      // Check if the random element is not already in the selectedElements array
      if (!selectedElements.includes(randomElement)) {
        selectedElements.push(randomElement);
      }
    }
  });
  return selectedElements;
}

function createUI(data) {
  //               MainUI

  function createMainUi(data) {
    console.log(data.avatar_url);
    image.src = data.avatar_url;
    h2.innerText = data.name;
    p.innerText = data.login;
    input.value = "";
  }

  //               FollowersUi

  function createFollowersUi(frData) {
    followerUl.innerHTML = "";
    let theFivefollowers = fiveRandomElementFromArr(frData);
    theFivefollowers.forEach(function (elem) {
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.src = elem.avatar_url;
      img.classList.add("avtar");
      li.append(img);
      followerUl.append(li);
    });
  }

  //               FollowingUi

  function createFollowingUi(fgData) {
    followingUl.innerHTML = "";
    let theFivefollowings = fiveRandomElementFromArr(fgData);
    theFivefollowings.forEach(function (elem) {
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.src = elem.avatar_url;
      img.classList.add("avtar");
      li.append(img);
      followingUl.append(li);
    });
  }
  //                 calling createMainUi
  createMainUi(data);

  // Fetching data(for displaying followers Avatar) of the followers of the entered github User

  let xhr2 = new XMLHttpRequest();
  xhr2.open("GET", `${data.followers_url}`);
  xhr2.onload = function () {
    let followersData = JSON.parse(xhr2.response);
    createFollowersUi(followersData);
  };
  xhr2.send();

  // Fetching data(for displaying followers Avatar) of the followings of the entered github User

  //Provided  url of the following of eneterd Github user is not accessible, so this program is  to make the url accessible by trimming the unwanted stuff from it.

  const url = data.following_url;
  const trimmedUrl = url.substring(
    0,
    url.indexOf("following") + "following".length
  );
  console.log(trimmedUrl);

  let xhr3 = new XMLHttpRequest();
  xhr3.open("GET", trimmedUrl);
  xhr3.onload = function () {
    let followingData = JSON.parse(xhr3.response);
    createFollowingUi(followingData);
  };
  xhr3.send();
}

function handleChange(e) {
  if (e.keyCode === 13) {
    let userName = e.target.value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${userName}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      createUI(userData);
    };
    xhr.send();
  }
}

function handleImage() {
  let xhr4 = new XMLHttpRequest();
  xhr4.open(
    "GET",
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`
  );
  xhr4.onload = function () {
    let imageData = JSON.parse(xhr4.response);
    console.log(imageData);
    secImage.src = `${imageData[0].url}`;
  };
  xhr4.send();
}

input.addEventListener("keyup", handleChange);
secButton.addEventListener("click", handleImage);
