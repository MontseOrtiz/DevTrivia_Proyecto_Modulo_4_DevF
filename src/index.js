// import "./styles/style.scss";
import Trivia from "./Trivia";

// Crear Elementos
const crearElemento = (elemento) => document.createElement(elemento);

// Crear btn
const crearBtn = (elemento, tipo, valor, id) => {
  let btn = document.createElement(elemento);
  btn.type = tipo;
  btn.value = valor;
  btn.id = id;
  return btn;
};

// Obtener Elementos
const obtenerElemento = (elemento) => document.getElementById(elemento);

//<----  ---->

// <---- Varibales ---->

// Bienvenida
let nombreJugador;
let contenedor = obtenerElemento("contenedor");
let divPrincipal = crearElemento("div");
let nombreInput = crearElemento("input");
let btnEnviar = crearBtn("input", "submit", "Enviar", "btnBienvenida");

//Nuevo juego
let contenedorMenu = obtenerElemento("selectContainer");

// Crear menu de peticiones
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
let btnFormulario = crearBtn("input", "submit", "Enviar", "btnFormulario");
let btnNuevoJuego = crearBtn(
  "input",
  "submit",
  "Quieres juegar de Nuevo",
  "nuevo juego"
);

// <---- Obtener valores de formulario ---->
const obtenerValores = () => {
  let dificultadValue = obtenerElemento("triviaForm-dificultad").value;
  let tipoValue = obtenerElemento("triviaForm-tipo").value;
  let categoriaValue = obtenerElemento("triviaForm-categoria").value;
  contenedorMenu.innerHTML = ` `;
  let pet = new Trivia(categoriaValue, dificultadValue, tipoValue);
  pet.hacerPeticion();
};

// <---- Crear menu de peticiones ---->

const crearOpciones = (lista, id) => {
  let select = crearElemento("select");
  contenedorMenu.appendChild(select);

  for (let i = 0; i < lista.length; i++) {
    select.id = `triviaForm-${id}`;
    let opcion = crearElemento("option");
    opcion.text = lista[i][0];
    opcion.value = lista[i][1];
    select.appendChild(opcion);
  }
  contenedorMenu.appendChild(btnFormulario);
  btnFormulario.addEventListener("click", obtenerValores);
};

// <---- Nuevo Juego ---->

export const nuevoJuego1 = () => {
  divPrincipal.innerHTML = ` `;
  bienvenidoJugador();
  console.log("hola", nombreJugador);
  contenedorMenu.innerHTML = `
      <h1>Hola ${nombreJugador}</h1>
      <h2>Selecciona las siguientes opciones para empezar un juego nuevo</h2>`;
  crearOpciones(dificultad, "dificultad");
  crearOpciones(tipo, "tipo");
  crearOpciones(categoria, "categoria");
};

// <---- Bienvenida ---->

const bienvenidoJugador = () => {
  nombreJugador = nombreInput.value;
  if (nombreJugador.length === 0) {
    divPrincipal.innerHTML = `<p>Por favor escribe un nombre</p>`;
  }
};

btnEnviar.addEventListener("click", nuevoJuego1);
contenedor.appendChild(divPrincipal);

// Inicio de Juego

const inicio = () => {
  divPrincipal.innerHTML = `<h1>hola</h1> <p>Por favor indica tu nombre</p>`;
  divPrincipal.appendChild(nombreInput);
  divPrincipal.appendChild(btnEnviar);
};

export const final = (score) => {
  console.log("tu score final es", score);

  // console.log("quesque la funcion", nuevaFuncion);
  // divPrincipal.appendChild(btnNuevoJuego);
  let tuScore = crearElemento("p");
  tuScore.innerHTML = `<h2>Tu score es de ${score}</h2> `;
  divPrincipal.appendChild(tuScore);
  divPrincipal.appendChild(btnNuevoJuego);
  // divPrincipal.innerHTML = `<h2>Tu score es de ${score}</h2> ${btnNuevoJuego}`;

  btnNuevoJuego.addEventListener("click", inicio);
};

inicio();

// nuevoJuego1();
