// <---- Nuevo Juego ---->

export const nuevoJuego = () => {
  bienvenidoJugador();
  console.log("hola", nombreJugador);
  contenedorMenu.innerHTML = `
        <h1>Hola ${nombreJugador}</h1>
        <h2>Selecciona las siguientes opciones para empezar un juego nuevo</h2>`;
  crearOpciones(dificultad, "dificultad");
  crearOpciones(tipo, "tipo");
  crearOpciones(categoria, "categoria");
};
