import axios from "axios";
import * as archivo from "./index";

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
let contenedor = obtenerElemento("container");
let divPrincipal = obtenerElemento("container-bienvenida");
let contenedorSinOpciones = crearElemento("div");
contenedor.appendChild(contenedorSinOpciones);
contenedorSinOpciones.className = "container-sin-opciones";
contenedorSinOpciones.id = "container-sin-opciones";
let contenedorPrincipal = obtenerElemento("questionContainer");
contenedor.appendChild(contenedorPrincipal);
contenedorPrincipal.className = "container-trivia";
let contenedorScore = crearElemento("div");
contenedorPrincipal.appendChild(contenedorScore);
let contenedorPreguntas = crearElemento("div");
contenedorPrincipal.appendChild(contenedorPreguntas);
let contenedorPregunta = crearElemento("h2");
contenedorPreguntas.appendChild(contenedorPregunta);
let contenedorRespuesta = crearElemento("div");
contenedorPreguntas.appendChild(contenedorRespuesta);
let btnNuevoJuego = crearBtn(
  "input",
  "submit",
  "Quieres juegar de Nuevo",
  "nuevo juego"
);
btnNuevoJuego.className = "button";
let btnRegresarMenuOpciones = crearBtn(
  "input",
  "submit",
  "Regresar",
  "Regresar a menu opciones"
);
btnRegresarMenuOpciones.className = "button";

let divRespuestas;
let divRespuestasArray;
let ronda = 0;
let score = 0;
let numPregunta = 0;
let maxPreguntas = 10;
// let puntos = 100;
let preguntas;
let respuestaCorrecta;
let respuestas;
let respuestasMezcladas;

class Trivia {
  constructor(categoria, dificultad, tipo) {
    this.urlBase = "https://opentdb.com/api.php?amount=10";
    (this.categoria = categoria),
      (this.dificultad = dificultad),
      (this.tipo = tipo);
    // this.preguntas;
    // this.ronda = 0;
  }

  hacerPeticion() {
    let url = `${this.urlBase}&category=${this.categoria}&difficulty=${this.dificultad}&type=${this.tipo}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        let resCode = res.data.response_code;
        let resData = res.data.results;

        if (resCode != 0) {
          divPrincipal.style.display = "none";
          contenedorSinOpciones.style.display = "flex";
          contenedorSinOpciones.innerHTML = `<p>Lo sentimos no contamos con suficientes preguntas</p><br> <p>Por favor elige otras opciones</p>`;
          contenedorSinOpciones.appendChild(btnRegresarMenuOpciones);
          btnRegresarMenuOpciones.addEventListener(
            "click",
            archivo.nuevoJuego1
          );
          contenedorPrincipal.style.display = "none";
        } else {
          preguntas = resData;
          this.nuevoJuego();
        }
      })
      .catch((err) => console.log(err));
  }

  nuevoJuego() {
    numPregunta = 0;
    score = 0;
    ronda = 0;
    this.mostrarPregunta(ronda);
  }

  mostrarPregunta(index) {
    // let nuevaFuncion = ;
    if (index === 10) {
      console.log(score);
      contenedorPrincipal.style.display = "none";
      return archivo.final(score);
    }

    divPrincipal.style.display = "none";
    contenedorSinOpciones.style.display = "none";
    contenedorPrincipal.style.display = "flex";

    ronda++;
    numPregunta++;
    let pregunta = preguntas[index].question;
    respuestaCorrecta = preguntas[index].correct_answer;
    let respuestasIncorrectas = preguntas[index].incorrect_answers;
    let prefix_respuesta = ["A", "B", "C", "D", "E"];
    this.obtenerRespuestas(respuestaCorrecta, respuestasIncorrectas);

    respuestasMezcladas = Array.from(respuestas);
    this.mezclarRespuestas(respuestasMezcladas);

    let crearHtmlRespuestasArray = respuestasMezcladas.map(
      (actualRes) => `
       <div class="respuesta-contenedor" id = "${actualRes}">
        <p class="prefijo-respuesta" id = "${actualRes}">${
        prefix_respuesta[respuestasMezcladas.indexOf(actualRes)]
      }</p>
        <p class="respuesta" id = "${actualRes}">${actualRes}</p>
      </div>`
    );

    let crearHtmlRespuestas = crearHtmlRespuestasArray.join(" ");

    contenedorScore.innerHTML = `<div class= score-contenedor> 
    <div>
      <p> Pregunta ${numPregunta} de ${maxPreguntas}</p>
      <div id="barra-contenedor">
          <div id="barra-progreso" ></div>
      </div>
    </div>

    <div >
    <p >Score</p>
    <h1  id="score"> ${score}</h1>
    </div>
    </div>`;

    let barraWidth = (numPregunta / maxPreguntas) * 100;
    let barraProgreso = obtenerElemento("barra-progreso");
    barraProgreso.style.width = `${barraWidth}%`;

    contenedorPregunta.innerHTML = `<h2>${index + 1} ${pregunta}</h2>`;
    contenedorRespuesta.innerHTML = crearHtmlRespuestas;
    console.log("mostrando respuesta correcta", respuestaCorrecta);

    // divRespuestas = document.querySelectorAll("div.respuesta-contenedor");
    contenedorPrincipal.style.display = "flex";
    this.agregarEvento();
  }

  obtenerRespuestas(opc1, opc2) {
    respuestas = [opc1];
    opc2.forEach((element) => {
      respuestas.push(element);
    });
  }

  mezclarRespuestas(arrayRespuestas) {
    for (let i = arrayRespuestas.length - 1; i > 0; i--) {
      let indiceAleatorio = Math.floor(Math.random() * (i + 1));
      let temporal = arrayRespuestas[i];
      arrayRespuestas[i] = arrayRespuestas[indiceAleatorio];
      arrayRespuestas[indiceAleatorio] = temporal;
    }
  }

  agregarEvento() {
    divRespuestas = document.querySelectorAll("div.respuesta-contenedor");
    divRespuestas.forEach((divRes) => {
      divRes.addEventListener("click", (e) => {
        let elementoSelect = e.target.id;
        if (elementoSelect === respuestaCorrecta) {
          score = score + 100;
          divRes.classList.add("correct");
          setTimeout(() => {
            divRes.classList.remove("incorrect");
            this.mostrarPregunta(ronda);
          }, 1000);
        } else {
          divRes.classList.add("incorrect");
          setTimeout(() => {
            divRes.classList.remove("incorrect");
            this.mostrarPregunta(ronda);
          }, 1000);
        }
      });
    });
  }
}

export default Trivia;
