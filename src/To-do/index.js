const { ipcRenderer } = require("electron");

btnPomodoroTimer = document.getElementById("PomodoroTimer");
btnCalendario = document.getElementById("Calendario");
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
    Recorrência: `${taskRecor.value}`,
    Last_done: null,
    Days_done: null,
  };
  const json = JSON.stringify(data);

  window.localStorage.setItem(n, json);
}

function loadCheckList() {
  for (var i = 0; i < localStorage.length; i++) {
    br = document.createElement("br");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    label = document.createElement("label");
    task_n = localStorage.key(i);
    data = JSON.parse(localStorage.getItem(task_n));
    checkbox.id = `task-${task_n}`;
    let span = document.createElement("span");

    span.innerHTML = "\u00d7";

    const text = document.createTextNode(`${data.Task}`);
    label.htmlFor = `task-${i}`;
    label.className = ""

    checkList.appendChild(checkbox);
    label.appendChild(text);
    checkList.appendChild(label);
    checkList.appendChild(span)
    checkList.appendChild(br);
  }
}

function loadElement() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const label = document.createElement("label");
  checkbox.id = `task-${localStorage.length + 1}`;
  br = document.createElement("br");
  let span = document.createElement("span");

  span.innerHTML = "\u00d7";

  const text = document.createTextNode(`${taskText.value}`);
  label.htmlFor = `task-${localStorage.length + 1}`;
  label.className = ""

  checkList.appendChild(checkbox);
  label.appendChild(text);
  checkList.appendChild(label);
  checkList.appendChild(span)
  checkList.appendChild(br);

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
btnCalendario.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Calendario", "/Calendario/index.html");
});

btnTodo.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Todo", "/To-do/index.html");
});

checkList.addEventListener("click",function(e){
  if(e.target.tagName == "INPUT"){
    id_target = e.target.id
    task = document.getElementById(`${id_target}`)
    console.log(task.id)
    
    label = document.querySelector(`label[for=${task.id}]`)
    console.log(label)
    label.classList.toggle("checked")

  }


})

