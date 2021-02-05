import { ArrayIterateeFunc, NullAndUndefined} from "../interface"
import { arrayTest } from "./test"

class ArraySy {
  private static _instance: null | ArraySy = null

  public static getInstance (): ArraySy {
    if (!this._instance) {
      this._instance = new ArraySy()
    }
    return this._instance
  }

  forEach(array: Array<any> | NullAndUndefined, iteratee: ArrayIterateeFunc): Array<any> | NullAndUndefined {
    if (array === null || array === undefined) {
      return array
    }
    let index = -1

    // error test
    arrayTest(array)

    while (++index < array.length) {
      if(iteratee(array[index], index, array) === false) {
        break
      }
    }
    return array
  }

  map(array: Array<any> | NullAndUndefined, iteratee: ArrayIterateeFunc): Array<any> | NullAndUndefined {
    if (array === null || array === undefined) {
      return array
    }
    let index = -1,
        result = Array(array.length)

    // error test
    arrayTest(array)

    while (++index < array.length) {
      result[index] = iteratee(array[index] ,index, array)
    }

    return result
  }

  isArray (array: Array<any>): boolean{
    return Array.isArray(array)
  }
}

export default ArraySy.getInstance()
