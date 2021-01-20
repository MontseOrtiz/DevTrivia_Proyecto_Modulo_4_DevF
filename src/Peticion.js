// let urlBase = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
import axios from "axios";

class Peticion {
  constructor(categoria, dificultad, tipo) {
    this.urlBase = "https://opentdb.com/api.php?amount=10";
    (this.categoria = categoria),
      (this.dificultad = dificultad),
      (this.tipo = tipo);
  }

  hacerPeticion() {
    let url = `${this.urlBase}&category=${this.categoria}&difficulty=${this.dificultad}&type=${this.tipo}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}

export default Peticion;
