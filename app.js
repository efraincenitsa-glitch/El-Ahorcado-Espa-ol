const WORD_BANK = [
  { word: "DINERO", cat: "finanzas", hint: "Medio de intercambio para comprar y vender." },
  { word: "AHORRO", cat: "finanzas", hint: "Dinero guardado para una meta o emergencia." },
  { word: "PRESUPUESTO", cat: "finanzas", hint: "Plan para controlar ingresos y gastos." },
  { word: "INVERSION", cat: "finanzas", hint: "Uso de recursos buscando rendimiento futuro." },
  { word: "NOMINA", cat: "finanzas", hint: "Pago periódico que recibe el trabajador." },
  { word: "FACTURA", cat: "finanzas", hint: "Documento fiscal de una compra o servicio." },
  { word: "HIPOTECA", cat: "finanzas", hint: "Crédito relacionado con una vivienda." },
  { word: "IMPUESTOS", cat: "finanzas", hint: "Contribuciones obligatorias al gobierno." },
  { word: "INTERES", cat: "finanzas", hint: "Costo o ganancia por usar dinero en el tiempo." },

  { word: "OBJETIVO", cat: "valores", hint: "Meta clara que se desea alcanzar." },
  { word: "DISCIPLINA", cat: "valores", hint: "Constancia para cumplir un plan." },
  { word: "CONSTANCIA", cat: "valores", hint: "Hábito de continuar sin abandonar." },
  { word: "RESPONSABILIDAD", cat: "valores", hint: "Cumplir obligaciones y asumir consecuencias." },
  { word: "HONESTIDAD", cat: "valores", hint: "Actuar con verdad y rectitud." },
  { word: "COLABORACION", cat: "valores", hint: "Trabajo en conjunto para lograr algo." },
  { word: "INSPIRACION", cat: "valores", hint: "Impulso creativo para iniciar o mejorar." },
  { word: "APRENDIZAJE", cat: "valores", hint: "Proceso de adquirir conocimiento." },

  { word: "SERVIDOR", cat: "tecnologia", hint: "Equipo o sistema que atiende solicitudes." },
  { word: "DOMINIO", cat: "tecnologia", hint: "Nombre o entorno administrado en red." },
  { word: "RESPALDO", cat: "tecnologia", hint: "Copia de seguridad de información." },
  { word: "AUTOMATIZACION", cat: "tecnologia", hint: "Proceso que reduce tareas manuales." },
  { word: "INTERFAZ", cat: "tecnologia", hint: "Área donde usuario y sistema interactúan." },
  { word: "APLICACION", cat: "tecnologia", hint: "Programa que realiza una función específica." },
  { word: "ALMACENAMIENTO", cat: "tecnologia", hint: "Espacio para guardar datos." },
  { word: "MONITOREO", cat: "tecnologia", hint: "Supervisión constante de estado o rendimiento." },

  { word: "GUADALAJARA", cat: "lugares", hint: "Ciudad importante del occidente de México." },
  { word: "AEROPUERTO", cat: "lugares", hint: "Lugar donde salen y llegan aviones." },
  { word: "CARRETERA", cat: "lugares", hint: "Vía terrestre para circular entre destinos." },
  { word: "BICICLETA", cat: "lugares", hint: "Transporte de dos ruedas impulsado por pedales." },
  { word: "AUTOMOVIL", cat: "lugares", hint: "Vehículo particular de motor." },
  { word: "SEMAFORO", cat: "lugares", hint: "Señal luminosa que ordena el tráfico." },
  { word: "BIBLIOTECA", cat: "lugares", hint: "Lugar para consultar libros y materiales." },

  { word: "INVENTARIO", cat: "empresa", hint: "Registro de existencias disponibles." },
  { word: "LOGISTICA", cat: "empresa", hint: "Organización de recursos, rutas y entregas." },
  { word: "PROVEEDOR", cat: "empresa", hint: "Persona o empresa que suministra productos." },
  { word: "CLIENTE", cat: "empresa", hint: "Quien compra o recibe un servicio." },
  { word: "DISTRIBUCION", cat: "empresa", hint: "Proceso de llevar productos a destino." },
  { word: "MANTENIMIENTO", cat: "empresa", hint: "Acciones para conservar algo funcionando." },
  { word: "VALIDACION", cat: "empresa", hint: "Revisión para confirmar que algo es correcto." },

  { word: "COMIDA", cat: "comida", hint: "Alimento preparado o consumido." },
  { word: "DESAYUNO", cat: "comida", hint: "Primera comida del día." },
  { word: "SUPERMERCADO", cat: "comida", hint: "Tienda grande de productos de consumo." },
  { word: "VERDURAS", cat: "comida", hint: "Alimentos vegetales usados en cocina." },

  { word: "RECIBO", cat: "finanzas", hint: "Comprobante de pago o entrega." }
];

const DIFFICULTIES = {
  easy: {
    label: "Fácil",
    attempts: 8,
    min: 4,
    max: 8,
    hintPenalty: 0,
    score: 10
  },
  normal: {
    label: "Normal",
    attempts: 6,
    min: 6,
    max: 12,
    hintPenalty: 1,
    score: 18
  },
  hard: {
    label: "Difícil",
    attempts: 5,
    min: 8,
    max: 16,
    hintPenalty: 2,
    score: 28
  },
  expert: {
    label: "Experto",
    attempts: 4,
    min: 10,
    max: 99,
    hintPenalty: 3,
    score: 42
  }
};

const $ = id => document.getElementById(id);

const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

let state = {
  word: "",
  cat: "",
  hint: "",
  display: [],
  used: [],
  attempts: 6,
  maxAttempts: 6,
  score: 0,
  start: 0,
  timer: null,
  roundOver: false,
  totalGuesses: 0,
  correctGuesses: 0
};

let stats = JSON.parse(
  localStorage.getItem("ahorcadoProStats") ||
  '{"record":0,"bestTime":null,"wins":0,"losses":0,"ranking":[]}'
);

function saveStats(){
  localStorage.setItem("ahorcadoProStats", JSON.stringify(stats));
}

function playSound(type){
  const soundToggle = $("soundToggle");

  if(soundToggle && !soundToggle.checked){
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if(!AudioContextClass){
    return;
  }

  const ctx = new AudioContextClass();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  if(type === "win"){
    oscillator.frequency.setValueAtTime(523, now);
    oscillator.frequency.linearRampToValueAtTime(880, now + 0.18);
  }else if(type === "lose"){
    oscillator.frequency.setValueAtTime(220, now);
    oscillator.frequency.linearRampToValueAtTime(120, now + 0.25);
  }else{
    oscillator.frequency.setValueAtTime(330, now);
  }

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

  oscillator.start();
  oscillator.stop(now + 0.3);
}

function formatSeconds(sec){
  const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
  const seconds = String(sec % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function normalize(str){
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function pickWord(){
  const diff = DIFFICULTIES[$("difficulty").value];
  const cat = $("category").value;

  let pool = WORD_BANK.filter(item =>
    (cat === "all" || item.cat === cat) &&
    item.word.length >= diff.min &&
    item.word.length <= diff.max
  );

  if(!pool.length){
    pool = WORD_BANK.filter(item => cat === "all" || item.cat === cat);
  }

  if(!pool.length){
    pool = WORD_BANK;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

function startTimer(){
  clearInterval(state.timer);

  state.start = Date.now();

  $("timer").textContent = "00:00";

  state.timer = setInterval(() => {
    const seconds = Math.floor((Date.now() - state.start) / 1000);
    $("timer").textContent = formatSeconds(seconds);
  }, 1000);
}

function newGame(keepScore = true){
  const item = pickWord();
  const diff = DIFFICULTIES[$("difficulty").value];

  state.word = normalize(item.word);
  state.cat = item.cat;
  state.hint = item.hint;
  state.display = Array(state.word.length).fill("_");
  state.used = [];
  state.attempts = diff.attempts;
  state.maxAttempts = diff.attempts;
  state.roundOver = false;
  state.totalGuesses = 0;
  state.correctGuesses = 0;

  if(!keepScore){
    state.score = 0;
  }

  $("guess").disabled = false;
  $("guess").value = "";
  $("message").textContent = "";
  $("hintBox").textContent = "💡 La pista aparecerá aquí cuando la solicites.";
  $("gameState").textContent = `${diff.label} · ${labelCategory(state.cat)}`;

  startTimer();
  render();
}

function labelCategory(cat){
  const labels = {
    finanzas: "Finanzas",
    tecnologia: "Tecnología",
    valores: "Valores",
    lugares: "Lugares y transporte",
    empresa: "Empresa y logística",
    comida: "Comida y hogar"
  };

  return labels[cat] || "Todas";
}

function render(){
  renderWord();
  renderKeyboard();
  renderStats();

  const lost = state.maxAttempts - state.attempts;

  const stage = Math.min(
    6,
    Math.round(lost * 6 / state.maxAttempts)
  );

  renderHangmanSvg(stage);

  $("attemptsText").textContent = state.attempts;
  $("attemptsBar").style.width = `${(state.attempts / state.maxAttempts) * 100}%`;
}

function renderHangmanSvg(stage){
  const hangman = $("hangman");

  if(!hangman){
    return;
  }

  hangman.innerHTML = `
    <svg
      viewBox="0 0 240 260"
      width="100%"
      height="260"
      role="img"
      aria-label="Dibujo del ahorcado"
      class="hangman-svg"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="35" y1="235" x2="205" y2="235"></line>
        <line x1="65" y1="235" x2="65" y2="35"></line>
        <line x1="65" y1="35" x2="160" y2="35"></line>
        <line x1="160" y1="35" x2="160" y2="65"></line>

        ${stage >= 1 ? '<circle cx="160" cy="90" r="24"></circle>' : ""}
        ${stage >= 2 ? '<line x1="160" y1="115" x2="160" y2="165"></line>' : ""}
        ${stage >= 3 ? '<line x1="160" y1="130" x2="128" y2="150"></line>' : ""}
        ${stage >= 4 ? '<line x1="160" y1="130" x2="192" y2="150"></line>' : ""}
        ${stage >= 5 ? '<line x1="160" y1="165" x2="135" y2="205"></line>' : ""}
        ${stage >= 6 ? '<line x1="160" y1="165" x2="185" y2="205"></line>' : ""}
      </g>
    </svg>
  `;
}

function renderWord(){
  $("word").innerHTML = state.display
    .map(letter => `<span class="letter-slot">${letter === "_" ? "" : letter}</span>`)
    .join("");
}

function renderKeyboard(){
  $("keyboard").innerHTML = letters
    .map(letter => {
      const used = state.used.includes(letter);
      const good = used && state.word.includes(letter);
      const bad = used && !state.word.includes(letter);

      return `
        <button
          class="key ${used ? "used" : ""} ${good ? "good" : ""} ${bad ? "bad" : ""}"
          type="button"
          data-letter="${letter}"
          ${used || state.roundOver ? "disabled" : ""}
        >
          ${letter}
        </button>
      `;
    })
    .join("");
}

function renderStats(){
  $("score").textContent = state.score;
  $("record").textContent = stats.record || 0;
  $("bestTime").textContent = stats.bestTime ? formatSeconds(stats.bestTime) : "--";
  $("wins").textContent = stats.wins || 0;
  $("losses").textContent = stats.losses || 0;

  const total = (stats.wins || 0) + (stats.losses || 0);

  $("accuracy").textContent = total
    ? Math.round((stats.wins / total) * 100) + "%"
    : "0%";

  $("ranking").innerHTML = (stats.ranking || [])
    .slice(0, 5)
    .map(item => `<li>${item.difficulty} · ${formatSeconds(item.time)} · ${item.word}</li>`)
    .join("") || "<li>Sin partidas ganadas todavía.</li>";
}

function checkLetter(letterFromButton){
  if(state.roundOver){
    return;
  }

  const input = $("guess");
  const letter = normalize(letterFromButton || input.value.trim());

  input.value = "";

  if(!/^[A-ZÑ]$/.test(letter)){
    showMessage("Ingresa una letra válida.", false);
    return;
  }

  if(state.used.includes(letter)){
    showMessage("Esa letra ya fue usada.", false);
    return;
  }

  state.used.push(letter);
  state.totalGuesses++;

  if(state.word.includes(letter)){
    state.correctGuesses++;

    [...state.word].forEach((char, index) => {
      if(char === letter){
        state.display[index] = letter;
      }
    });

    playSound("tap");
  }else{
    state.attempts--;
    playSound("lose");
  }

  render();
  checkStatus();
}

function checkStatus(){
  if(!state.display.includes("_")){
    finishRound(true);
  }else if(state.attempts <= 0){
    finishRound(false);
  }
}

function finishRound(win){
  state.roundOver = true;

  clearInterval(state.timer);

  $("guess").disabled = true;

  const seconds = Math.max(
    1,
    Math.floor((Date.now() - state.start) / 1000)
  );

  if(win){
    const diff = DIFFICULTIES[$("difficulty").value];
    const bonus = Math.max(0, state.attempts * 3);

    state.score += diff.score + bonus;
    stats.wins++;

    if(state.score > stats.record){
      stats.record = state.score;
    }

    if(!stats.bestTime || seconds < stats.bestTime){
      stats.bestTime = seconds;
    }

    stats.ranking.unshift({
      word: state.word,
      time: seconds,
      difficulty: diff.label,
      score: state.score,
      date: new Date().toISOString()
    });

    stats.ranking = stats.ranking
      .sort((a, b) => a.time - b.time || b.score - a.score)
      .slice(0, 10);

    saveStats();
    playSound("win");

    showMessage(
      `🎉 Correcto: ${state.word}. Tiempo: ${formatSeconds(seconds)}. Puntaje: ${state.score}.`,
      true
    );

    const autoNextToggle = $("autoNextToggle");

    if(autoNextToggle && autoNextToggle.checked){
      setTimeout(() => newGame(true), 1400);
    }
  }else{
    stats.losses++;
    saveStats();
    playSound("lose");

    showMessage(
      `❌ Perdiste. La palabra era: ${state.word}. Tu racha vuelve a cero.`,
      false
    );

    state.score = 0;
  }

  render();
}

function showHint(){
  if(state.roundOver){
    return;
  }

  const diff = DIFFICULTIES[$("difficulty").value];

  $("hintBox").textContent = "💡 " + state.hint;

  if(diff.hintPenalty > 0){
    state.attempts = Math.max(1, state.attempts - diff.hintPenalty);

    showMessage(
      `Pista usada: se descontaron ${diff.hintPenalty} intento(s).`,
      false
    );

    render();
  }
}

function showMessage(text, success){
  $("message").textContent = text;
  $("message").style.color = success ? "var(--accent)" : "var(--warn)";
}

function resetStats(){
  stats = {
    record: 0,
    bestTime: null,
    wins: 0,
    losses: 0,
    ranking: []
  };

  state.score = 0;

  saveStats();
  newGame(false);
}

function toggleTheme(){
  document.body.classList.toggle("light");

  localStorage.setItem(
    "ahorcadoTheme",
    document.body.classList.contains("light") ? "light" : "dark"
  );

  $("themeBtn").textContent = document.body.classList.contains("light")
    ? "☀️"
    : "🌙";
}

function registerSW(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

$("checkBtn").addEventListener("click", () => checkLetter());

$("newBtn").addEventListener("click", () => newGame(false));

$("hintBtn").addEventListener("click", showHint);

$("resetStatsBtn").addEventListener("click", resetStats);

$("themeBtn").addEventListener("click", toggleTheme);

$("keyboard").addEventListener("click", event => {
  if(event.target.matches("[data-letter]")){
    checkLetter(event.target.dataset.letter);
  }
});

$("guess").addEventListener("keyup", event => {
  if(event.key === "Enter"){
    checkLetter();
  }
});

$("difficulty").addEventListener("change", () => newGame(false));

$("category").addEventListener("change", () => newGame(false));

if(localStorage.getItem("ahorcadoTheme") === "light"){
  document.body.classList.add("light");
}

$("themeBtn").textContent = document.body.classList.contains("light")
  ? "☀️"
  : "🌙";

registerSW();

newGame(false);
