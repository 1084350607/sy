import { ObjIterateeFunc, NullAndUndefined } from "../interface";

class ObjectSy {
  private static _instance: null | ObjectSy = null

  public static getInstance(): ObjectSy {
    if (!this._instance) {
      this._instance = new ObjectSy()
    }
    return this._instance
  }

  //Judge an Object if there is an item conforms the iteratee's condition
  some (obj: object | NullAndUndefined, iteratee: ObjIterateeFunc): boolean {
    let flag = false

    if (obj === null || obj === undefined) {
      throw new TypeError('The first parameter must be object')
    }

    for (const [key, value] of Object.entries(obj)) {
      flag = iteratee(key, value, obj) ? true : flag
    }

    return flag
  }

  // Judge an Object if items all conforms the iteratee's condition
  every (obj: object | NullAndUndefined, iteratee: ObjIterateeFunc): boolean {
    let flag = true

    if (obj === null || obj === undefined) {
      throw new TypeError('The first parameter must be object')
    }

    for (const [key, value] of Object.entries(obj)) {
      if (!flag) {
        break
      }
      flag = iteratee(key, value, obj) ? true : flag
    }

    return flag
  }

  // return a new object by the iteratee condition
  filter(obj: object | NullAndUndefined, iteratee: ObjIterateeFunc): object | NullAndUndefined {
    let newObj = {}

    if (obj === null || obj === undefined) {
      return obj
    }

    for (const [key, value] of Object.entries(obj)) {
      if (iteratee(key, value, obj)) {
        newObj[key] = value
      }
    }

    return newObj
  }
}

export default ObjectSy.getInstance()

