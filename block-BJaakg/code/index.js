let main = document.querySelector(".main");
let secondary = document.querySelector(".secondary");
let h1 = document.querySelector("h1");
let bookDataArr;

function handleSpinner(trufal) {
  if (trufal) {
    secondary.innerHTML = `<div class="donut"></div>`;
  }
}

function createUi(data) {
  data.forEach((elem) => {
    let card = document.createElement("div");
    card.classList.add("card");
    let h2 = document.createElement("h2");
    h2.innerText = elem.name;
    let p = document.createElement("p");
    p.innerText = elem.authors;
    let button = document.createElement("button");
    button.innerText = "Show character";
    let span = document.createElement("span");
    span.innerText = `(${elem.numberOfPages})`;
    button.append(span);
    card.append(h2, p, button);
    main.append(card);
  });
}

// function createSecUi(data) {
//   handleSpinner(true);
//   h1.classList.add("hidden");
//   let crossBtn = document.createElement("button");
//   crossBtn.innerText = "❌";
//   let h3 = document.createElement("h3");
//   h3.innerText = "Character List";

//   secondary.append(crossBtn, h3);
//   data.characters.forEach((elem) => {
//     fetch(elem)
//       .then((res) => {
//         return res.json();
//       })
//       .then((chrac) => {
//         let p = document.createElement("p");
//         p.innerText = `${chrac.name} :(${chrac.titles}) `;
//         secondary.append(p);
//         handleSpinner(false);
//       });
//   });
// }

function createSecUi(data) {
  handleSpinner(true);
  h1.classList.add("hidden");
  let crossBtn = document.createElement("button");
  crossBtn.innerText = "❌";
  let h3 = document.createElement("h3");
  h3.innerText = "Character List";

  secondary.append(crossBtn, h3);

  const fetchPromises = data.characters.map((elem) => {
    return fetch(elem)
      .then((res) => res.json())
      .then((chrac) => {
        let p = document.createElement("p");
        p.innerText = `${chrac.name} :(${chrac.titles}) `;
        secondary.append(p);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  });

  // Wait for all fetch promises to complete
  Promise.all(fetchPromises)
    .then(() => {
      // All fetch requests are complete; hide the spinner
      handleSpinner(false);
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch requests
      console.error("Error fetching data:", error);
    });
}

let Book = fetch("https://www.anapioficeandfire.com/api/books")
  .then((res) => {
    return res.json();
  })
  .then((bookData) => {
    createUi(bookData);
    bookDataArr = bookData;
  })
  .catch((err) => {
    console.log(err);
  });

main.addEventListener("click", function (e) {
  if (e.target && e.target.tagName === "BUTTON") {
    const button = e.target;
    const card = button.closest(".card");
    const h2 = card.querySelector("h2");

    let clickedBook = bookDataArr.find(
      (obj) => obj.name.toLowerCase() === "A Clash of Kings".toLowerCase()
    );
    main.classList.add("hidden");
    h1.classList.add("hidden");
    secondary.classList.remove("hidden");
    createSecUi(clickedBook);
  }
});

secondary.addEventListener("click", function (e) {
  if (e.target && e.target.tagName === "BUTTON") {
    main.classList.remove("hidden");
    h1.classList.remove("hidden");

    secondary.classList.add("hidden");
  }
});
