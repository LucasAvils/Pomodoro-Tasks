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

  window.localStorage.setItem(`${n + 1}`, json);
}

function loadCheckList() {
  for (var i = 0; i < localStorage.length; i++) {
    br = document.createElement("br")
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    label = document.createElement("label");
    task_n = localStorage.key(i);
    data = JSON.parse(localStorage.getItem(task_n));
    checkbox.id = `task-${task_n}`;

    const text = document.createTextNode(`${data.Task}`);
    label.htmlFor = `task-${localStorage.length + 1}`

    checkList.appendChild(checkbox);
    label.appendChild(text);
    checkList.appendChild(label);
    checkList.appendChild(br)
  }
}

function loadElement() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const label = document.createElement("label");
  checkbox.id = `task-${localStorage.length + 1}`;
  br = document.createElement("br")

  const text = document.createTextNode(`${taskText.value}`);
  label.htmlFor = `task-${localStorage.length + 1}`
  checkList.appendChild(checkbox);
  label.appendChild(text);
  checkList.appendChild(label);
  checkList.appendChild(br)
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
