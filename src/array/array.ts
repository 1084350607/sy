import { ArrayIterateeFunc } from "../common"

class ArraySy {
  private static _instance: null | ArraySy = null

  public static getInstance (): ArraySy {
    if (!this._instance) {
      this._instance = new ArraySy()
    }
    return this._instance
  }

  // Performs the specified action for each element in an array.
  forEach(array: Array<any>, iteratee: ArrayIterateeFunc): Array<any> {
    let index = -1

    while (++index < array.length) {
      iteratee(array[index], index, array)
    }

    return array
  }

  // Calls a defined callback function on each element of an array, and returns an array that contains the results.
  map (array: Array<any>, iteratee: ArrayIterateeFunc): Array<any> {
    let index = -1,
        result = Array(array.length)

    while (++index < array.length) {
      result[index] = iteratee(array[index] ,index, array)
    }

    return result
  }

  isArray (array: ReadonlyArray<any>): boolean{
    return Array.isArray(array)
  }
}

export default ArraySy.getInstance()
