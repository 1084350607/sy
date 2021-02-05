import debounce from "./debounce";

class Utilsy {
  private static _instance: Utilsy;
  static getInstance () {
    if (!this._instance) {
      this._instance = new Utilsy()
    }
    return this._instance
  }
  debounce
}


export default Utilsy.getInstance()
