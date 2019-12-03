let todos = [];

const generateTodo = function(todo) {
  const { text, completed } = todo;
  return `
        <div class="input-group my-1">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input value="done" type="checkbox" aria-label="Checkbox for following text input" ${(completed == true) ? "checked" : ""}>
            </div>
          </div>
          <input
              type="text"
              name="text"
              value="${text}"
              class="form-control ${(completed == true) ? "is-valid" : ""}"
              readonly
          />
          <div class="input-group-append">
              <button value="close" class="btn btn-outline-secondary"> X </button>
          </div> 
        </div> 
    `;
};

const renderTodos = function(todos) {
  //clear div before update
  document.querySelector("#todos").innerHTML = "";
  todos.forEach(function(todo) {
    document
      .querySelector("#todos")
      .insertAdjacentHTML("afterbegin", generateTodo(todo));
  });
};

const deleteTodos = function(e) {
  let value = e
    .target
    .parentElement
    .parentElement
    .querySelector("input[name='text']")
    .value

  todos.map((todo, id)=> {
    if (todo.text == value) {
      todos.splice(id, 1)
    }
  })
  return renderTodos(todos)
}

const doneTodos = function(e) {
  let value = e
    .target
    .parentElement
    .parentElement
    .parentElement
    .querySelector("input[name='text']")
    .value
    
  todos.map((todo, id)=> {
    if (todo.text == value) {
      if (e.target.checked == true) {
        todo.completed = true;
        todos.unshift(todos.splice(id, 1)[0])
      } else {
        todo.completed = false;
        todos.push(todos.splice(id, 1)[0])
      }
    }
  })
  return renderTodos(todos)
}

document.querySelector("#new-todos").addEventListener("submit", function(e) {
  e.preventDefault();
  todos.push({
    text: e.target.elements.text.value,
    completed: false
  });
  renderTodos(todos);
  e.target.elements.text.value = "";
});

document.querySelector("#todos").addEventListener("click", e => {
  if (e.target.value === "close") deleteTodos(e)
  if (e.target.value === "done") doneTodos(e)
})