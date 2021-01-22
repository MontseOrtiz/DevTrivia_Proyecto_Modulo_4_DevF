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
let btnNext = crearBtn("input", "submit", "Siguiente Pregunta", "Siguiente");

let preguntas;
// let ronda = 0;

class Trivia {
  constructor(categoria, dificultad, tipo) {
    this.urlBase = "https://opentdb.com/api.php?amount=10";
    (this.categoria = categoria),
      (this.dificultad = dificultad),
      (this.tipo = tipo);
    // this.preguntas;
    this.ronda = 0;
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
          console.log(resCode, contenedorPreguntas);
        }

        console.log(resData, resCode);
        preguntas = resData;
        console.log("preguntas", preguntas);
        console.log("ronda acutial", this.ronda);

        this.mostrarPregunta(this.ronda);
      })
      .catch((err) => console.log(err));
  }

  mostrarPregunta(index) {
    console.log("pasaron las preguntas ", preguntas);
    console.log("ronda acutual 222", index);
    let pregunta = preguntas[index].question;
    let respuestaCorrecta = preguntas[index].correct_answer;
    // let respuestasIncorrectas = preguntas[index].incorrect_answers;
    let respuestas = [respuestaCorrecta];
    // respuestasIncorrectas.forEach((element) => {
    //   respuestas.push(element);
    // });

    // console.log("Respuestas", respuestas);

    // let htmlRespuestasArray = respuestas.map(
    //   (actualRespuesta) =>
    //     `<input type="radio" name="respuestas" id="${actualRespuesta}" onselect="${this.revisarRespuesta()}"><label for="${actualRespuesta}">${actualRespuesta}</label><br> `
    // );

    // let htmlRespuestas = htmlRespuestasArray.join(" ");

    // let htmlPregunta = `<h2>${pregunta}</h2> <div>${htmlRespuestas}</div>`;
    // contenedorPreguntas.innerHTML = htmlPregunta;
    // contenedorPreguntas.innerHTML = `<h2>${pregunta}</h2>`;

    this.crearOpcionesRespuestas(respuestas, pregunta);

    // console.log("soy resss", res);

    // console.log("pregunta acutual 222", pregunta);

    // contenedorPreguntas.appendChild(btnNext);
    // ronda++;
    // console.log(ronda);
    // btnNext.addEventListener("click", this.mostrarPregunta(preguntas, ronda));
  }

  revisarRespuesta() {
    console.log("entre yeiiii");
  }

  siguienteRonda() {
    this.ronda++;
    console.log("la otra ronda ----->", this.ronda);

    this.mostrarPregunta(this.ronda);
  }

  crearOpcionesRespuestas(lista, pregunta) {
    let divPregunta = crearElemento("div");
    contenedorPreguntas.appendChild(divPregunta);
    let pPregunta = crearElemento("h3");
    pPregunta.innerHTML = pregunta;
    divPregunta.appendChild(pPregunta);
    let form = crearElemento("form");
    contenedorPreguntas.appendChild(form);

    for (let i = 0; i < lista.length; i++) {
      let opcion = crearBtn("input", "radio", lista[i], lista[i]);
      opcion.name = "respuestas";
      let opcionLabel = crearElemento("label");
      opcionLabel.innerHTML = lista[i];
      opcionLabel.for = lista[i];
      form.appendChild(opcion);
      form.appendChild(opcionLabel);
    }
    contenedorPreguntas.appendChild(btnNext);
    btnNext.addEventListener("click", this.siguienteRonda());
  }
}

export default Trivia;

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
          console.log(resCode, contenedorPreguntas);
        }

        console.log(resData, resCode);
        preguntas = resData;
        console.log("preguntas", preguntas);
        console.log("ronda acutual", ronda);

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

    console.log("pregunta Actual", pregunta);
    console.log("respuestas Actual", respuestas);
    console.log("nos han mezclado", respuestasMezcladas);

    console.log(
      "nueva ronda haciendo la peticion de pregunta, se supone que debe de ser ronda 0",
      ronda
    );

    let crearHtmlRespuestasArray = respuestasMezcladas.map(
      (actualRes) => ` <div class="respuesta-contenedor">
        <p>${prefix_respuesta[respuestasMezcladas.indexOf(actualRes)]}</p>
        <p>${actualRes}</p>
      </div>`
    );

    console.log("hey hey ", typeof crearHtmlRespuestasArray);
    let crearHtmlRespuestas = crearHtmlRespuestasArray.join(" ");

    console.log("Respuestas creadas ----->", crearHtmlRespuestas);
    divRespuestas = document.getElementsByClassName("respuesta-contenedor");
    console.log("respuesñlsdasd--------->>>>", divRespuestas);
    divRespuestasArray = [];

    for (let i = 0; i < divRespuestas.length; i++) {
      console.log(divRespuestas[i]);

      // At this point we could also push the elements to an array
      divRespuestasArray.push(divRespuestas[i]);
    }
    console.log("respuesñlsdasd--------->>>>", divRespuestasArray);

    // let divhk = Array.from(divRespuestas);
    // console.log("respuesñlsdasdalsdñalskdñaskñdkas>>>>--------->>>>", divhk);
    // divRespuestas.forEach((element) => console.log(element));
    // this.agregarEvento();
    // console.log(
    //   "respuesñlsdasdalsdñalskdñaskñdkas>>>>--------->>>>",
    //   divRespuestas
    // );
    contenedorPregunta.innerHTML = pregunta;
    contenedorRespuesta.innerHTML = crearHtmlRespuestas;
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
    Array.from(divRespuestas).forEach((divRes) => console.log(divRes));
    // for (const iterator of divRespuestas) {
    //   console.log(iterator);
    // }
    console.log("div respuesta 1231231231231231231------->", divRespuestas);
    // divRespuestas.forEach((element) => {
    //   element.addEventListener("click", console.log("hey", element));
    // });
  }
}

export default Trivia;
