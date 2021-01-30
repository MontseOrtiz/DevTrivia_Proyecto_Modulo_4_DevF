import "./styles/style.scss";
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

// <---- Varibales ---->

// Bienvenida
let nombreJugador;
let contenedor = obtenerElemento("container");
let divPrincipal = obtenerElemento("container-bienvenida");
let contenedorPrincipal = obtenerElemento("questionContainer");
let contenedorSinOpciones = obtenerElemento("container-sin-opciones");
let nombreInput = crearElemento("input");
nombreInput.className = "input-nombre";
let btnEnviar = crearBtn("input", "submit", "Enviar", "btnBienvenida");
btnEnviar.className = "button";

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
let divSelect = crearElemento("div");
divSelect.className = "container-select-trivia";
// divPrincipal.appendChild(divSelect);
let btnFormulario = crearBtn("input", "submit", "Enviar", "btnFormulario");
btnFormulario.className = "button";
let btnNuevoJuego = crearBtn("input", "submit", "Nuevo Juego", "nuevo juego");
btnNuevoJuego.className = "button";

// <---- Obtener valores de formulario ---->
const obtenerValores = () => {
  let dificultadValue = obtenerElemento("triviaForm-dificultad").value;
  let tipoValue = obtenerElemento("triviaForm-tipo").value;
  let categoriaValue = obtenerElemento("triviaForm-categoria").value;
  let pet = new Trivia(categoriaValue, dificultadValue, tipoValue);
  pet.hacerPeticion();
};

// <---- Crear menu de peticiones ---->

// divSelect.appendChild(select);

const crearOpciones = (lista, id) => {
  divPrincipal.appendChild(divSelect);
  let select = crearElemento("select");
  divSelect.appendChild(select);

  for (let i = 0; i < lista.length; i++) {
    select.id = `triviaForm-${id}`;
    let opcion = crearElemento("option");
    opcion.text = lista[i][0];
    opcion.value = lista[i][1];
    select.appendChild(opcion);
  }
  divPrincipal.appendChild(btnFormulario);
  btnFormulario.addEventListener("click", obtenerValores);
};

// <---- Nuevo Juego ---->

export const nuevoJuego1 = () => {
  nombreJugador = nombreInput.value;
  if (nombreJugador.length === 0) {
    bienvenidoJugador();
  } else {
    divPrincipal.style.display = "flex";
    contenedorSinOpciones.style.display = "none";
    contenedorPrincipal.style.display = "none";

    divSelect.innerHTML = " ";

    // let divSelect = crearElemento("div");
    // divSelect.className = "hola";
    divPrincipal.innerHTML = `
    <h1>Hola ${nombreJugador}</h1>
    <p>Selecciona las siguientes opciones para empezar a jugar</p>`;
    crearOpciones(dificultad, "dificultad");
    crearOpciones(tipo, "tipo");
    crearOpciones(categoria, "categoria");
  }
  console.log("hola", nombreJugador);
};

// <---- Bienvenida ---->

const bienvenidoJugador = () => {
  let btnRegresar = crearBtn("input", "submit", "Regresar", "btn-regresar");
  btnRegresar.addEventListener("click", inicio);
  btnRegresar.className = "button";
  if (nombreJugador.length === 0) {
    console.log("hoola");
    divPrincipal.innerHTML = "<p>Por favor escribe un nombre</p> ";
    divPrincipal.appendChild(btnRegresar);
  }
};

btnEnviar.addEventListener("click", nuevoJuego1);

// Inicio de Juego

const inicio = () => {
  contenedorPrincipal.style.display = "none";
  contenedorSinOpciones.style.display = "none";
  // contenedor.removeChild(contenedorPrincipal);
  nombreInput.placeholder = "Nombre";
  divPrincipal.innerHTML = `<h1>Bienvenido</h1>  <p>Por favor indica tu nombre</p>`;
  divPrincipal.appendChild(nombreInput);
  divPrincipal.appendChild(btnEnviar);
};

export const final = (score) => {
  console.log("tu score final es", score);
  divPrincipal.innerHTML = " ";
  divPrincipal.style.display = "flex";
  let tuScore = crearElemento("p");
  tuScore.innerHTML = `<h2>Tu score es de ${score}</h2> `;
  divPrincipal.appendChild(tuScore);
  divPrincipal.appendChild(btnNuevoJuego);

  btnNuevoJuego.addEventListener("click", nuevoJuego1);
};

inicio();

// nuevoJuego1();
