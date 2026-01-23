const words=["AMIGO","FAMILIA","PERRO","GATO","CARRO","CAMISA","ZAPATO","MESA","SILLA","COMPUTADORA","VENTANA","PUERTA","PLAYA","QUESO","FUTBOL","AVENTURA", "MISTERIO", "TESORO", "ALIADO", "ENEMIGO", "MISION", "PODER", "DESTINO", "SECRETO", "DESAFIO", "VICTORIA", "DERROTA", "ESTRATEGIA", "MAGIA", "HABILIDAD", "TRAMPA", "EXPLORACION","BATALLA", "RECOMPENSA", "RIESGO", "INGENIO", "FORTALEZA", "ENERGIA", "LEYENDA", "OBJETO", "PERSONAJE", "CAMINO", "NIVEL", "PUNTAJE", "TIEMPO", "VIDA", "ATAQUE", "DEFENSA", "EQUIPO", "GIRO","SUERTE", "MAPA", "GUARDIA", "RUINA", "PORTAL", "CLAVE", "PRUEBA", "RETO", "ZONA", "SENAL", "TURNO", "LOGRO", "COFRE", "HEROE", "RIVAL","CIUDAD", "SELVA", "DESIERTO", "MONTANA", "OCEANO", "ISLA", "TORRE", "CASTILLO", "VILLA", "PUEBLO", "TRIBU", "CLAN", "MERCADO", "TALLER", "FORJA", "ARMADURA", "ESPADA", "ARCO", "FLECHA", "ESCUDO","MARTILLO", "RELIQUIA", "ARTEFACTO", "CRONOMETRO", "BRUJULA", "LINTERNA", "BRUMA", "SOMBRA", "LUZ", "OSCURIDAD", "SILENCIO","ECO", "VIENTO", "LLUVIA", "FUEGO", "HIELO", "TRUENO", "RAYO", "TIERRA", "ARENA", "ROCA", "BOSQUE", "VALLE", "CUEVA", "MINA", "PUENTE", "SENDERO", "CAMPAMENTO", "REFUGIO", "FARO"
];
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
|    |
O    |
     |
     |
     |
==== =`,
`+---+
|    |
O    |
|    |
     |
     |
=====`,
`+---+
 |   |
 O   |
/|\  |
     |
     |
=====`,
`+---+
 |   |
 O   |
/|\  |
/ \  |
     |
=====`];

let word, display, attempts, used;

function newGame(){
  word=words[Math.floor(Math.random()*words.length)];
  display=Array(word.length).fill("_");
  attempts=6;
  used=[];
  document.getElementById("guess").disabled=false;
  document.getElementById("message").innerText="";
  update();
}

function update(){
  document.getElementById("word").innerText=display.join(" ");
  document.getElementById("letters").innerText="Letras usadas: "+used.join(", ");
  document.getElementById("attempts").innerText="Intentos restantes: "+attempts;
  document.getElementById("hangman").innerText=stages[6-attempts];
}

function checkLetter(){
  const i=document.getElementById("guess");
  const l=i.value.toUpperCase();
  i.value="";
  if(!l.match(/^[A-ZÑ]$/)||used.includes(l))return;
  used.push(l);
  if(word.includes(l)){
    [...word].forEach((c,idx)=>{if(c===l)display[idx]=l});
  }else attempts--;
  update();
  if(!display.includes("_")){
    document.getElementById("message").innerText="🎉 ¡Ganaste!";
    i.disabled=true;
  }else if(attempts===0){
    document.getElementById("message").innerText="❌ Era: "+word;
    i.disabled=true;
  }
}

document.getElementById("guess").addEventListener("keyup",e=>{
  if(e.key==="Enter")checkLetter();
});

newGame();
