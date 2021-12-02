// Creating ELements
const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector(".clearBtn");
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoItemContainer = document.querySelector(".todo-item__container");

// Array
let todoArray = [];

// Displaying the Todo in the DOM
const displayTodo = () => {
  const gettingUserData = localStorage.getItem("todo");
  if (!gettingUserData) todoArray = [];
  else todoArray = JSON.parse(gettingUserData);

  // Set the Inner Content of the Container to be Empty
  todoItemContainer.innerHTML = "";

  todoArray.forEach((data) => {
    const html = `
    <li class="todo-item biground">
    <div class="todo-item__content">
      <span>${data}</span>
      <div class="todo-item__actions">
        <button class="deleteBtn"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </div>
    </div>
  </li>`;

    todoItemContainer.insertAdjacentHTML("afterbegin", html);
  });
};

// On Submitting Form
const formSubmitHandler = (event) => {
  event.preventDefault();
  const todoUserData = todoInput.value;
  if (todoUserData === "") return alert("Please Fill the Form");
  todoArray.push(todoUserData);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
  todoInput.value = "";
};

// Deleting the Item from the DOM and LocalStorage API
const deleteTodo = (event) => {
  if (event.target.closest(".deleteBtn")) {
    const item = event.target
      .closest(".todo-item")
      .querySelector("span").textContent;
    const deleteIndex = todoArray.findIndex((todo) => todo === item);
    todoArray.splice(deleteIndex, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
  }
};

// Clear All the Task from LocalStorage
const clearTasks = () => {
  localStorage.removeItem("todo");
  displayTodo();
};

// Event Handlers
form.addEventListener("submit", formSubmitHandler);
clearBtn.addEventListener("click", clearTasks);
todoItemContainer.addEventListener("click", deleteTodo);

// On Load
displayTodo();
