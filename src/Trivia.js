// let urlBase = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
import axios from "axios";

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
let contenedorPrincipal = obtenerElemento("questionContainer");
let contenedorPreguntas = crearElemento("div");
contenedorPrincipal.appendChild(contenedorPreguntas);
let contenedorPregunta = crearElemento("h2");
contenedorPreguntas.appendChild(contenedorPregunta);
let contenedorRespuesta = crearElemento("div");
contenedorPreguntas.appendChild(contenedorRespuesta);
let btnNext = crearBtn("input", "submit", "Siguiente Pregunta", "Siguiente");
let divRespuestas;
let divRespuestasArray;
let ronda = 0;
let score = 0;
let preguntas;
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
          contenedorPreguntas.innerHTML = `lo sentimos intenta de nuevo`;
          // console.log(resCode, contenedorPreguntas);
        }

        // console.log(resData, resCode);
        preguntas = resData;
        // console.log("preguntas", preguntas);
        // console.log("ronda acutual", ronda);

        // this.mostrarPregunta(this.ronda);
        this.nuevoJuego();
      })
      .catch((err) => console.log(err));
  }

  nuevoJuego() {
    score = 0;
    ronda = 0;
    console.log("pasando preguntas a juego nuevo", preguntas);
    this.mostrarPregunta(ronda);
  }

  mostrarPregunta(index) {
    ronda++;
    let pregunta = preguntas[index].question;
    let respuestaCorrecta = preguntas[index].correct_answer;
    let respuestasIncorrectas = preguntas[index].incorrect_answers;
    let prefix_respuesta = ["A", "B", "C", "D", "E"];
    this.obtenerRespuestas(respuestaCorrecta, respuestasIncorrectas);

    respuestasMezcladas = Array.from(respuestas);
    this.mezclarRespuestas(respuestasMezcladas);

    let crearHtmlRespuestasArray = respuestasMezcladas.map(
      (actualRes) => ` <div class="respuesta-contenedor">
        <p>${prefix_respuesta[respuestasMezcladas.indexOf(actualRes)]}</p>
        <p>${actualRes}</p>
      </div>`
    );

    let crearHtmlRespuestas = crearHtmlRespuestasArray.join(" ");

    contenedorPregunta.innerHTML = pregunta;
    contenedorRespuesta.innerHTML = crearHtmlRespuestas;

    // divRespuestas = document.getElementsByClassName("respuesta-contenedor");
    divRespuestas = document.querySelectorAll("div.respuesta-contenedor");
    // console.log("div respuestas ya llego ", divRespuestas);
    // console.log("div respuestas ya llego length ", divRespuestas.length);

    // for (let i = 0; i < divRespuestas.length; i++) {
    //   const element = divRespuestas[i];
    //   console.log("espero que si funciones ", element);
    // }
    // divRespuestas.forEach((element) => {
    //   console.log("espero que si mmmmfunciones ", element);
    // });

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
    divRespuestas.forEach((divRes) => {
      divRes.addEventListener("click", (e) => {
        console.log("ronda por el agregar envento", ronda);
        this.mostrarPregunta(ronda);
        console.log("mostrando el evento", e);
      });
    });
  }
}

export default Trivia;
