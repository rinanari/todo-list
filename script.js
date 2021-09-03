const button = document.querySelector('.button');
const task = document.getElementById('task');
const todo = document.querySelector('.todo');

todoList = [];

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayTask();
}

button.addEventListener('click', function() {
  if (!task.value) return;
  let newTodo = {
    todo: task.value,
    checked: false,
    important: false
  };
  todoList.push(newTodo);
  displayTask();
  localStorage.setItem('todo', JSON.stringify(todoList));
  task.value = '';
});

function displayTask() {
  let displayMessage = '';
  if (todoList.length === 0) {
    todo.innerHTML = '';
  }
  todoList.forEach(function(item, i) {
    displayMessage += `
  <li>
    <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
    <label for="item_${i}" class="${item.important ? 'important' : ''}">${
      item.todo
    }</label>
  </li>
  `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener('change', function(event) {
  let idInput = event.target.getAttribute('id');
  let valueLabel = todo.querySelector('[for=' + idInput + ']').innerHTML;

  todoList.forEach(function(item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

todo.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  todoList.forEach(function(item, i) {
    if (item.todo === event.target.innerHTML) {
      if (event.ctrlKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }
      displayTask();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});
