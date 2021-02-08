import {ObjIterateeFunc} from "../common";
import { isFunction } from "../common/common";

function isObject(target): boolean {
  if (isFunction(target)) {
    throw new TypeError('Must be an Object but got a function')
  }
  return true
}

class ObjectSy {
  private static _instance: null | ObjectSy = null

  public static getInstance(): ObjectSy {
    if (!this._instance) {
      this._instance = new ObjectSy()
    }
    return this._instance
  }

  /**
   * Object.assign
   * 1.相同属性：后面的覆盖前面的(✅)
   * 2.拷贝Symbol(✅)
   * 3.继承属性和不可枚举属性不可拷贝(✅)
   * 4.原始类型会被包装为对象(✅):
   *   原始类型会被包装，null 和 undefined 会被忽略。
   *   注意，只有字符串的包装对象才可能有自身可枚举属性,所以理论上只有字符串可以被包装
   * 5.异常会打断后续拷贝任务(✅): 比如assign中修改readonly属性
   * 6.第一个参数传入function会抛出TypeError(✅)
  **/
  assign(target: object, ...sources: any[]): object{
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
  // 该方法类似与assign,只不过会遍历继承属性
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

  // Performs the specified action for each element in a object.
  forEach (obj: object, iteratee: ObjIterateeFunc<void>): void {
    for (let [key, value] of Object.entries(obj)) {
      iteratee(key, value, obj)
    }
  }

  //Judge an Object if there is an item conforms the iteratee's condition
  some (obj: object, iteratee: ObjIterateeFunc<boolean>): boolean {
    let flag = false

    for (const [key, value] of Object.entries(obj)) {
      flag = iteratee(key, value, obj) ? true : flag
    }

    return flag
  }

  // Judge an Object if items all conforms the iteratee's condition
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

  // Returns the elements of a object that meet the condition specified in a callback function.
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

