import {ObjIterateeFunc, Objects } from "../common";
import { isFunction } from "../common/common";

function isObject(target): boolean {
  if (isFunction(target)) {
    throw new TypeError('Must be an Object but got a function')
  }
  return true
}

class ObjectSy implements Objects {
  private static _instance: null | ObjectSy = null

  public static getInstance(): ObjectSy {
    if (!this._instance) {
      this._instance = new ObjectSy()
    }
    return this._instance
  }

  assign (target: object, ...sources: any[]): object {
    if (!isObject(target)) {
      throw new TypeError('The target must be an Object not a function')
    }
    sources.forEach(source => {
      let descriptors = Object.keys(source).reduce((descriptor, key) => {
        descriptor[key] = Object.getOwnPropertyDescriptor(source, key)
        return descriptor
      }, {})
      // assign enumerable Symbols
      Object.getOwnPropertySymbols(source).forEach(sym => {
        let descriptor = Object.getOwnPropertyDescriptor(source, sym)
        if (descriptor?.enumerable) {
          descriptors[sym] = descriptor
        }
      })
      // assign descriptors to target
      Object.defineProperties(target, descriptors)
    })
    return target
  }

  assignIn (target: object, ...sources: any[]): object | void {
    isObject(target)
    let assignValue = (): object => {
      let length = sources.length,
        index = -1

      while (++index < length) {
        // expect not null and undefined
        if (sources[index]) {
          // if sources' object has Symbol attr
          if (hasSymbol(sources[index])) {
            let symbolAry = getSymbol(sources[index])
            // assign each Symbol to the target Object
            symbolAry.forEach(symbol => {
              let symValue = sources[index][symbol]
              assignSymbol(target, symbol, symValue)
            })
          } else {
            for (const key in sources[index]) {
              target[key] = sources[index][key]
            }
          }
        }
      }

      return target
    }

    let assignSymbol = (target, symbol, value) => {
      let desc = symbol.description,
          sym = Symbol(desc)
      target[sym] = value
    }

    let hasSymbol = (target: object): boolean => {
      return !!Object.getOwnPropertySymbols(target).length
    }

    let getSymbol = (source: object): Array<symbol> => {
      return Object.getOwnPropertySymbols(source)
    }

    return assignValue()
  }

  forEach (obj: object, iteratee: ObjIterateeFunc<void>): void {
    for (let [key, value] of Object.entries(obj)) {
      iteratee(key, value, obj)
    }
  }

  some (obj: object, iteratee: ObjIterateeFunc<boolean>): boolean {
    let flag = false

    for (const [key, value] of Object.entries(obj)) {
      flag = iteratee(key, value, obj) ? true : flag
    }

    return flag
  }

  every (obj: object, iteratee: ObjIterateeFunc<boolean>): boolean {
    let flag = true

    for (const [key, value] of Object.entries(obj)) {
      if (!flag) {
        break
      }
      flag = iteratee(key, value, obj) ? true : flag
    }

    return flag
  }

  filter(obj: object, iteratee: ObjIterateeFunc<boolean>): object {
    let newObj = {}

    for (const [key, value] of Object.entries(obj)) {
      if (iteratee(key, value, obj)) {
        newObj[key] = value
      }
    }

    return newObj
  }
}

export default ObjectSy.getInstance()

