let addBtn = document.querySelector("#addBtn");
let taskInput = document.querySelector("#taskInput");
let mySelect = document.querySelector("#mySelect");
let searchInput = document.querySelector("#searchInput");

let todos = [];
if (localStorage.getItem("allToDos") !== null) {
  todos = JSON.parse(localStorage.getItem("allToDos"));
  displayData(todos);
}

addBtn.addEventListener("click", function () {
  if (taskInput.value.trim() === "") {
    document.getElementById("emptyTaskWarning").classList.remove("d-none");
    return;
  } else {
    document.getElementById("emptyTaskWarning").classList.add("d-none");
  }

  var task = {
    taskDetails: taskInput.value,
    isCompleted: false,
    id: `${Math.random() * 10000}-${Math.random() * 10000}`,
  };
  todos.push(task);
  localStorage.setItem("allToDos", JSON.stringify(todos));

  clear();
  filterTasks(mySelect.value);
});

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addBtn.click();
    clear();
    filterTasks(mySelect.value);
  }
});

function displayData(ToDo) {
  let todoList = "";
  for (let task of ToDo) {
    todoList += `
        <div class="tasks my-3 rounded text-light d-flex justify-content-between px-3 py-2 align-items-center ${
          task.isCompleted ? "bg-task" : ""
        }">
            <div class="task d-flex">
                <i class="fa-regular fa-circle-check " onclick="beCompleted('${
                  task.id
                }')"></i>
                <p class=" m-0 p-0 align-self-center ${
                  task.isCompleted ? "completed" : ""
                }">${task.taskDetails}</p>
            </div>
            <div>
                <i class="fa-solid fa-trash mx-2" onclick="deleteToDo('${
                  task.id
                }')"></i>
            </div>
        </div>`;
  }
  document.getElementById("tasks").innerHTML = todoList;
}

function clear() {
  taskInput.value = "";
  taskInput.blur();
}


function deleteToDo(id) {
  todos = todos.filter((task) => task.id !== id);
  localStorage.setItem("allToDos", JSON.stringify(todos));
  filterTasks(mySelect.value);
}

mySelect.addEventListener("change", function () {
  filterTasks(this.value);
});

searchInput.addEventListener("input", function () {
  filterTasks(mySelect.value, searchInput.value);
});

function beCompleted(id) {
  todos = todos.map((task) => {
    if (task.id === id) {
      task.isCompleted = !task.isCompleted;
    }
    return task;
  });

  localStorage.setItem("allToDos", JSON.stringify(todos));
  filterTasks(mySelect.value);
}

function filterTasks(filterType, searchQuery = "") {
  let filtered = [];

  if (filterType === "completed") {
    filtered = todos.filter((task) => task.isCompleted);
  } else if (filterType === "uncompleted") {
    filtered = todos.filter((task) => !task.isCompleted);
  } else {
    filtered = todos;
  }

  if (searchQuery.trim() !== "") {
    filtered = filtered.filter((task) =>
      task.taskDetails.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  displayData(filtered);
}
