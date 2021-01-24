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
let contenedorPrincipal = obtenerElemento("questionContainer");
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
let divRespuestas;
let divRespuestasArray;
let ronda = 0;
let score = 0;
let puntos = 100;
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
    console.log("ronda ----->", ronda);
    contenedorPrincipal.style.display = "block";
    this.mostrarPregunta(ronda);
  }

  mostrarPregunta(index) {
    console.log("soy el index", index);
    console.log("soy la ronda ", ronda);
    // let nuevaFuncion = ;
    if (index === 10) {
      console.log(score);
      contenedorPrincipal.style.display = "none";
      return archivo.final(score);
    }
    ronda++;
    let pregunta = preguntas[index].question;
    respuestaCorrecta = preguntas[index].correct_answer;
    let respuestasIncorrectas = preguntas[index].incorrect_answers;
    let prefix_respuesta = ["A", "B", "C", "D", "E"];
    this.obtenerRespuestas(respuestaCorrecta, respuestasIncorrectas);

    respuestasMezcladas = Array.from(respuestas);
    this.mezclarRespuestas(respuestasMezcladas);

    let crearHtmlRespuestasArray = respuestasMezcladas.map(
      (actualRes) => ` <div class="respuesta-contenedor" id = "${actualRes}">
        <p id = "${actualRes}">${
        prefix_respuesta[respuestasMezcladas.indexOf(actualRes)]
      }</p>
        <p id = "${actualRes}">${actualRes}</p>
      </div>`
    );

    let crearHtmlRespuestas = crearHtmlRespuestasArray.join(" ");

    contenedorPregunta.innerHTML = `<h2>${index + 1} ${pregunta}</h2>`;
    contenedorRespuesta.innerHTML = crearHtmlRespuestas;
    console.log("mostrando respuesta correcta", respuestaCorrecta);
    console.log("object score  actual", score);

    // divRespuestas = document.querySelectorAll("div.respuesta-contenedor");

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

        console.log("object elemto seleccionado", elementoSelect);
        console.log("mostrando respuesta correcta", respuestaCorrecta);
        if (elementoSelect === respuestaCorrecta) {
          // alert("bien hecho");
          score = score + 100;
          console.log("object score ", score);
          this.mostrarPregunta(ronda);
        } else {
          // alert("lo siento sigue participando");
          this.mostrarPregunta(ronda);
        }
      });
    });
  }
}

export default Trivia;
