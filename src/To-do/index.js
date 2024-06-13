const { ipcRenderer } = require("electron");

btnPomodoroTimer = document.getElementById("PomodoroTimer");
btnTodo = document.getElementById("To-do");

taskText = document.getElementById("tarefa-text");
taskRecor = document.getElementById("tarefa-Recurrence");
btnSubmit = document.getElementById("btnSubmit");

checkList = document.getElementById("checklist");

window.onload = function () {
  if (localStorage.length != 0) {
    loadCheckList();
  }
};

function getLastItem(){
  const keys = Object.keys(localStorage);
  if (keys.length === 0){
    return 0
  }
  const numericKeys = keys.map(key => Number(key)).filter(key => !isNaN(key));

  const highestKey = Math.max(...numericKeys);
  
  return highestKey
}

function loadCheckList() {
  Object.keys(localStorage).forEach(key => {
    const taskList = document.getElementById("taskList")

    const label = document.createElement("label");
    
    data = JSON.parse(localStorage.getItem(key));
  
    const listItem = document.createElement("li")
    listItem.textContent = data.Task
    listItem.title = `${key}`

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "X"
    deleteButton.classList.add('deleteButton')

  deleteButton.addEventListener('click', function() {
    taskList.removeChild(listItem);
    localStorage.removeItem(parseInt(listItem.title))
  });
  listItem.addEventListener("click",function(){
    listItem.classList.toggle("checked")
  });

    taskList.appendChild(listItem);
    listItem.appendChild(deleteButton);
  })
}

function loadElement() {

  const data = {
    Task: `${taskText.value}`,
  };
  const json = JSON.stringify(data);

  const taskList = document.getElementById("taskList")
  
  const listItem = document.createElement("li")
  listItem.textContent = taskText.value
  n_li = parseInt(getLastItem()) + 1
  listItem.title = `${n_li}`

  const deleteButton = document.createElement("button")
  deleteButton.textContent = "X"
  deleteButton.classList.add('deleteButton')

  deleteButton.addEventListener('click', function() {
    taskList.removeChild(listItem);
    localStorage.removeItem(parseInt(listItem.title))
  });
  listItem.addEventListener("click",function(){
    listItem.classList.toggle("checked")
  });

  taskList.appendChild(listItem);
  listItem.appendChild(deleteButton);

  window.localStorage.setItem(n_li, json);

  taskText.value = ""
}

function clearStorage() {
  localStorage.clear();
}

btnSubmit.addEventListener("click", () => {
  loadElement();
});

btnPomodoroTimer.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Pomodoro-Timer", "index.html");
});

btnTodo.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Todo", "/To-do/index.html");
});

