interface IterateeFunc {
  (item: any, key: number, array: Array<any>): any
}

function typeTest(array): void {
  if (Array.isArray(array)) {
    console.error('[Utilsy error] Type error : array must be an Array')
  }
}

class ArraySy {
  private static _instance: null | ArraySy = null
  private constructor() {
  }
  public static getInstance (): ArraySy {
    if (!this._instance) {
      this._instance = new ArraySy()
    }
    return this._instance
  }
  forEach(array: Array<any>, iteratee: IterateeFunc): Array<any> | void {
    let index = -1
    // error test
    typeTest(array)

    while (++index < array.length) {
      if(iteratee(array[index], index, array) === false) {
        break
      }
    }
    return array
  }
  map(array: Array<any>, iteratee: IterateeFunc): Array<any> {
    let index = -1
    let result = []
    // error test
    typeTest(array)
  }
  isArray (array: Array<any>): boolean{
    return Array.isArray(array)
  }
}

export default ArraySy.getInstance()
