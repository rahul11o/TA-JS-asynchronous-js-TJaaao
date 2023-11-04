const promiseOne = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 2000);
});

const promiseThree = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(30);
  }, 3000);
});

const promiseFour = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(40);
  }, 4000);
});

// 2

Promise.all([promiseOne, promiseTwo, promiseThree, promiseFour])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });

let userNames = ["jopoepl", "ravi11o", "afxal", "mindvalley", "nnnkit"];
let userData = Promise.all(
  userNames.map((user) =>
    fetch(`https://api.github.com/users/${user}`).then((res) => res.json())
  )
).then((res) => {
  res.forEach((user) => {
    console.log(user.followers);
  });
});

// 3

let promiseFive = fetch("https://random.dog/woof.json");
let promiseSix = fetch("https://aws.random.cat/meow");

Promise.race([promiseFive, promiseSix])
  .then((res) => res.json())
  .then((data) => console.log(`The first api to resolve was : ${data.url} `))
  .catch((error) => {
    console.log(error);
  });

//4

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Arya"), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Whoops!")), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve("John"), 3000)
);

Promise.allSettled([one, two, three])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log("error");
  });

//5

["Arya", "Sam", { name: "John" }];
// a little more than a second or so
