let myForm = document.querySelector("#myForm");
let mainDiv = document.querySelector(".mainDiv");

function uniqueNewsSite(arr) {
  let newArr = [];
  let uniqueSite = new Set();
  for (let obj of arr) {
    let newsSite = obj.newsSite;
    if (!uniqueSite.has(newsSite)) {
      uniqueSite.add(newsSite);
      newArr.push(obj);
    }
  }
  return newArr;
}
function getRandomElementsFromArray(arr, numElements) {
  if (numElements <= 0 || numElements > arr.length) {
    throw new Error("Invalid number of elements requested");
  }

  const randomElements = [];
  const arrCopy = [...arr]; // Create a copy of the original array to avoid modifying it

  for (let i = 0; i < numElements; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    const randomElement = arrCopy.splice(randomIndex, 1)[0]; // Fix here
    randomElements.push(randomElement);
  }

  return randomElements;
}

function createUi(data) {
  let randomthings = getRandomElementsFromArray(data, 7);
  console.log(randomthings);
  let selectElem = document.createElement("select");
  let optionTag = document.createElement("option");
  optionTag.innerText = "Select a News source";
  selectElem.append(optionTag);

  let ArrOfUnqNewsSite = uniqueNewsSite(data);
  function searchBoxUi(miniData) {
    ArrOfUnqNewsSite.forEach(function (elem) {
      let optionTag = document.createElement("option");
      optionTag.innerText = elem.newsSite;
      selectElem.append(optionTag);
    });
    myForm.append(selectElem);
  }
  function subNewsBoxUi(obj) {
    let newsDiv = document.createElement("div");
    newsDiv.classList.add("newsDiv");
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");
    let img = document.createElement("img");
    img.src = obj.imageUrl;
    img.style.width = "100%";
    imgContainer.append(img);
    let lastDiv = document.createElement("div");
    lastDiv.classList.add("lastDiv");
    let h2 = document.createElement("h2");
    h2.innerText = obj.newsSite;
    let p = document.createElement("p");
    p.innerText = obj.title;
    let anchorTag = document.createElement("a");
    anchorTag.innerText = "Read more";
    anchorTag.setAttribute("href", obj.url);
    lastDiv.append(h2, p, anchorTag);
    newsDiv.append(imgContainer, lastDiv);
    mainDiv.append(newsDiv);
  }

  function newsBoxUi(minidata) {
    function handleChange(e) {
      mainDiv.innerHTML = "";
      let selectedOption = e.target.value;
      console.log(selectedOption);
      data.forEach(function (elem) {
        if (elem.newsSite === selectedOption) {
          subNewsBoxUi(elem);
        } else if (selectedOption === "Select a News source") {
          mainDiv.innerHTML = "";
          randomthings.forEach((elements) => subNewsBoxUi(elements));
        }
      });
    }

    selectElem.addEventListener("change", handleChange);
  }
  randomthings.forEach((elem) => subNewsBoxUi(elem));
  searchBoxUi(data);
  newsBoxUi(data);
}

let myData = fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=30");
myData
  .then(function (data) {
    return data.json();
  })
  .then(function (usersArr) {
    createUi(usersArr);
  });
