let todos = [];
let editIndex = null;

// Elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const errorMessage = document.getElementById("errorMessage");
const pagination = document.getElementById("pagination");

// Pagination
const itemsPerPage = 5;
let currentPage = 1;

/* =======================
   ADD / UPDATE HANDLER
======================= */
addBtn.addEventListener("click", () => {
  const value = todoInput.value.trim();

  if (value === "") {
    showError("Task cannot be empty!");
    return;
  }

  // UPDATE MODE
  if (editIndex !== null) {
    todos[editIndex] = value;
    editIndex = null;
    addBtn.textContent = "Add Task";
  } 
  // ADD MODE
  else {
    todos.push(value);
  }

  todoInput.value = "";
  showError("");
  renderTodos();
});

/* =======================
   READ (DISPLAY)
======================= */
function renderTodos() {
  todoList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedItems = todos.slice(start, end);

  paginatedItems.forEach((todo, index) => {
    const realIndex = start + index;

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${todo}</span>
      <div>
        <button onclick="editTodo(${realIndex})">Edit</button>
        <button class="delete-btn" onclick="deleteTodo(${realIndex})">Delete</button>
      </div>
    `;

    todoList.appendChild(li);
  });

  renderPagination();
}

/* =======================
   DELETE
======================= */
function deleteTodo(index) {
  todos.splice(index, 1);

  // reset edit if deleting edited item
  if (editIndex === index) {
    editIndex = null;
    todoInput.value = "";
    addBtn.textContent = "Add Task";
  }

  renderTodos();
}

/* =======================
   EDIT (FIXED)
======================= */
function editTodo(index) {
  todoInput.value = todos[index];
  editIndex = index;

  addBtn.textContent = "Update Task";

  todoInput.focus();
}

/* =======================
   ERROR
======================= */
function showError(msg) {
  errorMessage.textContent = msg;

  if (msg) {
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 2000);
  }
}

/* =======================
   PAGINATION
======================= */
function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      currentPage = i;
      renderTodos();
    };

    pagination.appendChild(btn);
  }
}