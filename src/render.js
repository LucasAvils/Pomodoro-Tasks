const { ipcRenderer, Notification } = require("electron");

// Pegando elementos do timer
btnStart = document.getElementById("btnStart");
btnStop = document.getElementById("btnStop");
btnReset = document.getElementById("btnReset");
timer = document.getElementById("timer");
//Pegado Elementos dos botões de break e pomodoro
btnSbreak = document.getElementById("btnSbreak");
btnLbreak = document.getElementById("btnLbreak");
btnPomodoro = document.getElementById("btnPomodoro");
pomoTitle = document.getElementById("Titulo");

//pegando elementos de troca de página
btnPomodoroTimer = document.getElementById("PomodoroTimer");
btnTodo = document.getElementById("To-do");

let atual = "Pomodoro"; // Definindo o estado inicial(Pomodoro)
let tempoIni = 1500; //Minutos iniciais em segundos

btnPomodoro.disabled = true; // Iniciando o botão "Pomodoro" como desabilitado

// Essa função atualiza o timer para que o tempo mostrado em tela esteja sempre correto
function atualizaTimer() {
  const horas = Math.floor(tempoIni / 3600);
  const minutos = Math.floor((tempoIni % 3600) / 60);
  const segundos = Math.floor(tempoIni % 60);
  const StrTempo = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

  timer.innerText = StrTempo;

  tempoIni--;

  if (tempoIni < 0) {
    clearInterval(temporizador);
    disparaNotificação();
  }
}

//Essa função altera o estado do relógio para poder alternar entre os diferentes tipos de timer
function trocaTimer(estado) {
  switch (estado) {
    case "Pomodoro":
      atual = "Pomodoro";
      tempoIni = 1500;
      pomoTitle.innerText = "Pomodoro";
      btnPomodoro.disabled = true;
      btnLbreak.disabled = false;
      btnSbreak.disabled = false;
      atualizaTimer();
      break;
    case "Sbreak":
      atual = "Sbreak";
      tempoIni = 300;
      pomoTitle.innerText = "Short Break";
      btnPomodoro.disabled = false;
      btnLbreak.disabled = false;
      btnSbreak.disabled = true;
      atualizaTimer();
      break;
    case "Lbreak":
      atual = "Lbreak";
      tempoIni = 900;
      pomoTitle.innerText = "Long Break";
      btnPomodoro.disabled = false;
      btnLbreak.disabled = true;
      btnSbreak.disabled = false;
      atualizaTimer();
      break;
  }
}

function disparaNotificação() {
  const NOTIFICATION_TITLE = "Seu Tempo Acabou!";
  const NOTIFICATION_BODY = "Clique Aqui para começar seu próximo timer.";

  notif = new window.Notification(NOTIFICATION_TITLE, {
    body: NOTIFICATION_BODY,
  }).onclick = () => {
    if (atual == "Pomodoro") {
      trocaTimer("Sbreak");
      temporizador = setInterval(atualizaTimer, 1000);
    } else {
      trocaTimer("Pomodoro");
      temporizador = setInterval(atualizaTimer, 1000);
    }
  };
}

//Essa função checa o estado atual e devolve o tempo para cada timer baseado no estado atual
function checaAtual() {
  if (atual == "Pomodoro") {
    return 1500;
  } else if (atual == "Sbreak") {
    return 300;
  } else {
    return 900;
  }
}

//event listeners dos botões de start,stop e reset
btnStart.addEventListener("click", () => {
  btnStart.disabled = true;
  temporizador = setInterval(atualizaTimer, 1000);
});
btnStop.addEventListener("click", () => {
  clearInterval(temporizador);
  btnStart.disabled = false;
});
btnReset.addEventListener("click", () => {
  tempoIni = checaAtual();
  atualizaTimer();
  clearInterval(temporizador);
});

//event listener dos botões para os diferentes timers
btnPomodoro.addEventListener("click", () => trocaTimer("Pomodoro"));
btnLbreak.addEventListener("click", () => trocaTimer("Lbreak"));
btnSbreak.addEventListener("click", () => trocaTimer("Sbreak"));

btnPomodoroTimer.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Pomodoro-Timer", "index.html");
});
btnTodo.addEventListener("click", () => {
  ipcRenderer.send("Renderizar-Todo", "/To-do/index.html");
});
