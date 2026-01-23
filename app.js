
const words=["AMIGO","FAMILIA","PERRO","GATO","CARRO","CAMISA","ZAPATO","MESA","SILLA","COMPUTADORA","VENTANA","PUERTA","PLAYA","QUESO","FUTBOL",
"AVENTURA", "MISTERIO", "TESORO", "ALIADO", "ENEMIGO", "MISION", "PODER", "DESTINO", "SECRETO", "DESAFIO", "VICTORIA", "DERROTA", "ESTRATEGIA", "MAGIA", "HABILIDAD", "TRAMPA", "EXPLORACION",
"BATALLA", "RECOMPENSA", "RIESGO", "INGENIO", "FORTALEZA", "ENERGIA", "LEYENDA", "OBJETO", "PERSONAJE", "CAMINO", "NIVEL", "PUNTAJE", "TIEMPO", "VIDA", "ATAQUE", "DEFENSA", "EQUIPO", "GIRO",
"SUERTE", "MAPA", "GUARDIA", "RUINA", "PORTAL", "CLAVE", "PRUEBA", "RETO", "ZONA", "SENAL", "TURNO", "LOGRO", "COFRE", "HEROE", "RIVAL",
"CIUDAD", "SELVA", "DESIERTO", "MONTANA", "OCEANO", "ISLA", "TORRE", "CASTILLO", "VILLA", "PUEBLO", "TRIBU", "CLAN", "MERCADO", "TALLER", "FORJA", "ARMADURA", "ESPADA", "ARCO", "FLECHA", "ESCUDO",
"MARTILLO", "RELIQUIA", "ARTEFACTO", "CRONOMETRO", "BRUJULA", "LINTERNA", "BRUMA", "SOMBRA", "LUZ", "OSCURIDAD", "SILENCIO",
"ECO", "VIENTO", "LLUVIA", "FUEGO", "HIELO", "TRUENO", "RAYO", "TIERRA", "ARENA", "ROCA", "BOSQUE", "VALLE", "CUEVA", "MINA", "PUENTE", "SENDERO", "CAMPAMENTO", "REFUGIO", "FARO" ];

const stages=[`
     
=====`,
`
      |
      |
      |
      |
      |
=====`,
`+---+
      |
      |
      |
      |
      |
=====`,
`+---+
|     |
O     |
      |
      |
      |
==== =`,
`+---+
|     |
O     |
|     |
      |
      |
=====`,
`+---+
 |    |
 O    |
/|\   |
      |
      |
=====`,
`+---+
 |    |
 O    |
/|\   |
/ \   |
      |
=====`];

let word, display, attempts, used;

// 🔢 Marcador (racha actual) y récord (persistente)
let score = 0; // racha actual
let record = Number(localStorage.getItem('ahorcadoRecord') || 0);

// ❗ Utilidad: normalizar Ñ (ya admites Ñ en tu patrón)
const LETTER_RE = /^[A-ZÑ]$/;

// 🆕 Nueva partida
function newGame(){
  word = words[Math.floor(Math.random() * words.length)];
  display = Array(word.length).fill("_");
  attempts = 6;
  used = [];

  // Habilitar input y limpiar mensaje
  const guess = document.getElementById("guess");
  guess.disabled = false;
  guess.value = "";
  guess.focus();

  document.getElementById("message").innerText = "";

  update();
}

// 🔁 Refrescar UI
function update(){
  document.getElementById("word").innerText = display.join(" ");
  document.getElementById("letters").innerText = "Letras usadas: " + (used.join(", ") || "—");
  document.getElementById("attempts").innerText = "Intentos restantes: " + attempts;
  document.getElementById("hangman").innerText = stages[6 - attempts];

  // Mostrar marcador y récord
  document.getElementById("score").innerText = score;
  document.getElementById("record").innerText = record;
}

// ✅ Comprobar letra
function checkLetter(){
  const i = document.getElementById("guess");
  const l = i.value.toUpperCase();
  i.value = "";

  if(!LETTER_RE.test(l) || used.includes(l)) return;

  used.push(l);

  if(word.includes(l)){
    [...word].forEach((c, idx) => { if(c === l) display[idx] = l; });
  } else {
    attempts--;
  }

  update();

  if(!display.includes("_")){
    // Ganó la palabra -> +1 a marcador
    score++;
    // Actualizar récord si corresponde
    if(score > record){
      record = score;
      localStorage.setItem('ahorcadoRecord', String(record));
    }

    document.getElementById("message").innerText = "🎉 ¡Ganaste! +1 al marcador";
    i.disabled = true;
  } else if(attempts === 0){
    // Perdió -> racha vuelve a 0
    document.getElementById("message").innerText = "❌ Era: " + word + ". Marcador reiniciado.";
    score = 0;
    i.disabled = true;
    update();
  }
}

// ⌨️ Enter para validar
document.getElementById("guess").addEventListener("keyup", e => {
  if(e.key === "Enter") checkLetter();
});

// 🟦 Botón nueva palabra
document.getElementById("btnNew").addEventListener("click", newGame);

// 🧽 Botón para reiniciar récord manualmente
document.getElementById("resetRecord").addEventListener("click", () => {
  if(confirm("¿Seguro que quieres reiniciar el récord?")){
    record = 0;
    localStorage.removeItem('ahorcadoRecord');
    update();
  }
});

newGame();
