const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

let taskCounter = 1;

addButton.addEventListener('click', function () {
  const task = taskInput.value;
  if (task.trim() === "") {
    return;
  }
  const listItem = document.createElement('li');
  listItem.textContent = taskCounter + '. ' + task;
  taskList.appendChild(listItem);
  taskInput.value = "";
  taskCounter++;
});

function checkTask(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('done');
  }
}


form.addEventListener('submit', function (event) {
  event.preventDefault();
  createTask();
});

taskList.addEventListener('click', checkTask);