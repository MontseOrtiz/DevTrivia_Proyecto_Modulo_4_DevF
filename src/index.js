// import "./styles/style.scss";


// Bienvenida 
let nombreJugador
let div
const bienvenidoJugador =()=>{
    // div.innerHTML = ``
nombreJugador=nombreInput.value
div.innerHTML=`<h1>Bienvenido ${nombreJugador}</h1>`
}

let contenedor = document.getElementById("contenedor")
let nombreInput = document.createElement("input")
let btnEnviar = document.createElement("input")
btnEnviar.type="button"
btnEnviar.value="Enviar"
btnEnviar.addEventListener("click", bienvenidoJugador)

const inicio = ()=>{
    div = document.createElement("div")
    div.innerHTML=`<h1>hola</h1> <p>Por favor indica tu nombre</p>`
    contenedor.appendChild(div)
    div.appendChild(nombreInput)
    div.appendChild(btnEnviar)
}

inicio()




    // Crear select en menu de peticiones
// let dificultad = ["easy","medium","hard"]
// let tipo = ["multiple","boolean"]
// let categoria = [{}]
// let contenedorMenu = document.getElementById("selectContainer")

// const crearOpciones = (lista)=>{
//    let select = document.createElement("select")
//    contenedorMenu.appendChild(select)

//     for (let i = 0; i < lista.length; i++) {
//         console.log(lista[i]);
//         let opcion = document.createElement("option")
//         opcion.value=lista[i]
//         opcion.text=lista[i]
//           select.appendChild(opcion)
//        }
// }

// crearOpciones(dificultad)
// crearOpciones(tipo)
