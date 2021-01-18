// import "./styles/style.scss";

// Crear Elementos
const crearElemento = (elemento) => document.createElement(elemento);
// console.log(crearElemento("input"));

// Bienvenida
let nombreJugador;
let div;
const bienvenidoJugador = () => {
  // div.innerHTML = ``
  nombreJugador = nombreInput.value;
  div.innerHTML = `<h1>Bienvenido ${nombreJugador}</h1>`;
};

let contenedor = document.getElementById("contenedor");
let nombreInput = crearElemento("input");
let btnEnviar = crearElemento("input");
btnEnviar.type = "button";
btnEnviar.value = "Enviar";
btnEnviar.addEventListener("click", bienvenidoJugador);

const inicio = () => {
  div = crearElemento("div");
  div.innerHTML = `<h1>hola</h1> <p>Por favor indica tu nombre</p>`;
  contenedor.appendChild(div);
  div.appendChild(nombreInput);
  div.appendChild(btnEnviar);
};

inicio();

// Crear select en menu de peticiones
let dificultad = [
  ["Fácil", "easy"],
  ["Intermedio", "medium"],
  ["Dificil", "hard"],
];
let tipo = [
  ["Opción múltiple", "multiple"],
  ["Verdadero o falso", "boolean"],
];
let categoria = [
  ["Conocimiento General", 9],
  ["Entretenimiento: Libros", 10],
  ["Entretenimiento: Peliculas", 11],
  ["Entretenimiento: Música", 12],
  ["Entretenimiento: Musicales y Teatros", 13],
  ["Entretenimiento: Televisión", 14],
  ["Entretenimiento: Video Juegos", 15],
  ["Entretenimiento: Juegos de Mesa", 16],
  ["Ciencia y Naturaleza", 17],
  ["Ciencia: Computadoras", 18],
  ["Ciencia: Matemáticas", 19],
  ["Mitología", 20],
  ["Deportes", 21],
  ["Geografía", 22],
  ["Historia", 23],
  ["Política", 24],
  ["Arte", 25],
  ["Celebridades", 26],
  ["Animales", 27],
  ["Automoviles", 28],
  ["Entretenimiento: Comics", 29],
  ["Ciencia: Gadgets", 30],
  ["Entretenimiento: Anime y manga Japones", 31],
  ["Entretenimiento: Caricaturas y Animaciones", 32],
];
let contenedorMenu = document.getElementById("selectContainer");
let select = crearElemento("select");
select.id="trivaForm"

const crearOpciones = (lista) => {

  contenedorMenu.appendChild(select);

  for (let i = 0; i < lista.length; i++) {
    console.log(lista[i]);
    let opcion = crearElemento("option");
    opcion.text = lista[i][0];
    opcion.value = lista[i][1];
    select.appendChild(opcion);
  }
};

crearOpciones(dificultad);
crearOpciones(tipo);
crearOpciones(categoria);
