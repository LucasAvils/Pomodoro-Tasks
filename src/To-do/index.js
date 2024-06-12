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

function saveData() {
  const n = window.localStorage.length;
  const data = {
    Task: `${taskText.value}`,
  };
  const json = JSON.stringify(data);

  window.localStorage.setItem(n, json);
}

function loadCheckList() {
  for (var i = 0; i < localStorage.length; i++) {
    const taskList = document.getElementById("taskList")
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const label = document.createElement("label");

    task_n = localStorage.key(i);
    
    data = JSON.parse(localStorage.getItem(task_n));
    
    checkbox.id = `task-${task_n}`;

    const listItem = document.createElement("li")
    listItem.textContent = data.Task

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "X"
    deleteButton.classList.add('deleteButton')

  deleteButton.addEventListener('click', function() {
    taskList.removeChild(listItem);
  });
  listItem.addEventListener("click",function(){
    listItem.classList.toggle("checked")
  });

    const text = document.createTextNode(`${data.Task}`);
    label.htmlFor = `task-${i}`;
    label.className = ""

    taskList.appendChild(listItem);
    listItem.appendChild(deleteButton);
  }
}

function loadElement() {
  const taskList = document.getElementById("taskList")
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  
  const label = document.createElement("label");
  checkbox.id = `task-${localStorage.length + 1}`;
  
  const listItem = document.createElement("li")
  listItem.textContent = taskText.value

  const deleteButton = document.createElement("button")
  deleteButton.textContent = "X"
  deleteButton.classList.add('deleteButton')

  deleteButton.addEventListener('click', function() {
    taskList.removeChild(listItem);
  });
  listItem.addEventListener("click",function(){
    listItem.classList.toggle("checked")
  });

  const text = document.createTextNode(`${taskText.value}`);
  label.htmlFor = `task-${localStorage.length + 1}`;
  label.className = ""

  taskList.appendChild(listItem);
  listItem.appendChild(deleteButton);

  taskText.value = ""
}

function clearStorage() {
  localStorage.clear();
}

btnSubmit.addEventListener("click", () => {
  saveData();
  loadElement();
});

btnPomodoroTimer.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Pomodoro-Timer", "index.html");
});

btnTodo.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Todo", "/To-do/index.html");
});

checkList.addEventListener("click",function(e){
  if(e.target.tagName == "INPUT"){
    id_target = e.target.id
    task = document.getElementById(`${id_target}`)
    label = document.querySelector(`label[for=${task.id}]`)
    label.classList.toggle("checked")
  }
})

