let ul_list = document.querySelector(".list");
let todo = document.querySelector("#todo");
let baseUrl = "https://basic-todo-api.vercel.app/api/todo";

function displayTodos(todosData) {
  let todosArr = todosData.todos;
  if (Array.isArray(todosArr)) {
    todosArr.forEach((todo) => {
      let li = document.createElement("li");
      li.classList.add("item");
      let label = document.createElement("label");
      label.classList.add("item-label");
      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      let span_tn = document.createElement("span");
      span_tn.innerText = todo.title;
      span_tn.classList.add("todo-name");
      let span_cr = document.createElement("span");
      span_cr.innerText = "❌";

      label.append(input, span_tn, span_cr);
      li.append(label);
      ul_list.append(li);
    });
  } else {
    console.log("todosArr is not an array");
  }
}

function makeFetchRequest(url, method = "GET", headers = {}, body = null) {
  const options = {
    method,
    headers,
  };
  if (!body === null) {
    options.body;
  }

  fetch(url, options)
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    })
    .then((todos) => {
      console.log(todos);
      displayTodos(todos);
    })
    .catch((err) => {
      console.log(`error while fetching todos'data:${err}`);
    });
}

todo.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    let data = {
      todo: {
        title: e.target.value,
        isCompleted: false,
      },
    };

    // let data = {
    //   title: e.target.value,
    //   isCompleted: false,
    // };

    console.log(data, "inside console");

    let requestHeaders = {
      "Access-Control-Allow-Headers": "x-requested-with, x-requested-by",
      "Content-Type": "application/json",
    };

    makeFetchRequest(baseUrl, "POST", requestHeaders, JSON.stringify(data));
  }
});

makeFetchRequest(baseUrl);
