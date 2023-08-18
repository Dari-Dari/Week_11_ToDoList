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
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function () {
    updateRemoveButtonStatus();
  });
  listItem.appendChild(checkbox);
  listItem.appendChild(document.createTextNode(task));
  taskList.appendChild(listItem);
  taskInput.value = "";
  taskCounter++;

  // Сохранение задач в Local Storage
  const savedTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  savedTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));

  updateRemoveButtonStatus();
});

function checkTask(event) {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    event.target.parentNode.classList.toggle('done');
  }
}

function createTask() {
  const task = taskInput.value;
  if (task.trim() === "") {
    return;
  }
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function () {
    updateRemoveButtonStatus();
  });
  listItem.appendChild(checkbox);
  listItem.appendChild(document.createTextNode(task));
  taskList.appendChild(listItem);
  taskInput.value = "";
  taskCounter++;
  updateRemoveButtonStatus();

  // Сохранение задач в Local Storage
  const savedTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  savedTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function removeTasks() {
  const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      const listItem = checkbox.parentNode;
      listItem.remove();

      // Удаление задачи из Local Storage
      const savedTasks = JSON.parse(localStorage.getItem('tasks'));
      const updatedTasks = savedTasks.filter(function (task) {
        return task !== listItem.textContent;
      });
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  });

  updateRemoveButtonStatus();
}
document.getElementById('removeButton').addEventListener('click', removeTasks);

function updateRemoveButtonStatus() {
  const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
  const removeButton = document.getElementById('removeButton');
  const emptyMessage = document.querySelector('#emptyMessage');
  removeButton.disabled = true;

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      removeButton.disabled = false;
    }
  });

  if (checkboxes.length === 0) {
    removeButton.classList.add('empty');
    emptyMessage.classList.add('show');
  } else {
    removeButton.classList.remove('empty');
    emptyMessage.classList.remove('show');
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  createTask();
  updateRemoveButtonStatus();
});

taskList.addEventListener('change', checkTask);

window.addEventListener('DOMContentLoaded', function () {
  // Проверка наличия сохраненных задач в Local Storage
  if (localStorage.getItem('tasks')) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    savedTasks.forEach(function (task) {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', function () {
        updateRemoveButtonStatus();
      });
      listItem.appendChild(checkbox);
      listItem.appendChild(document.createTextNode(task));
      taskList.appendChild(listItem);
    });
  }

  updateRemoveButtonStatus();
});



/* Первоначальный код
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
*/