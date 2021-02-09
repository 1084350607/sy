export type NullAndUndefined = null | undefined

export interface ObjIterateeFunc<T> {
  (key: unknown, value: any, obj: object): T
}

export interface ArrayIterateeFunc {
  (item: unknown, key: number, array: Array<any>): any
}

export interface Objects {
  /**
   * Object.assign<br>
   * 1.相同属性：后面的覆盖前面的(✅)<br>
   * 2.拷贝Symbol(✅) <br>
   * 3.继承属性和不可枚举属性不可拷贝(✅)<br>
   * 4.原始类型会被包装为对象(✅):<br>
   *   原始类型会被包装，null 和 undefined 会被忽略。<br>
   *   注意，只有字符串的包装对象才可能有自身可枚举属性,所以理论上只有字符串可以被包装<br>
   * 5.异常会打断后续拷贝任务(✅): 比如assign中修改readonly属性<br>
   * 6.第一个参数传入function抛出TypeError(✅)<br>
   * assign the sources to the target object.
   * @param target An object that you want to handle
   * @param sources that the objects you want to assign it's attr to the target object
   **/
  assign(target: object, ...sources: any[]): object
  /**
   * the same with the method assign, but assign deeply, included extends attr
   * @param target An object that you want to handle
   * @param sources A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the object.
   **/
  assignIn (target: object, ...sources: any[]): object | void
  /**
   * Performs the specified action for each element in an array.
   * @param obj you want to handle with
   * @param iteratee
   */
  forEach (obj: object, iteratee: ObjIterateeFunc<void>): void
  /**
   * Determines whether the specified callback function returns true for any element of an array.   * @param obj
   * @param obj
   * @param iteratee the iteratee, has three parameters
   */
  some (obj: object, iteratee: ObjIterateeFunc<boolean>): boolean
  /**
   * Determines whether all the members of an object satisfy the specified test.
   * @param obj you want to handle with
   * @param iteratee the iteratee, has three parameters
   */
  every (obj: object, iteratee: ObjIterateeFunc<boolean>): boolean
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param obj you want to handle with
   * @param iteratee A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the object.
   */
  filter(obj: object, iteratee: ObjIterateeFunc<boolean>): object
}

export interface Arrays {
  /**
   * Performs the specified action for each element in an array.
   * @param array The target array
   * @param iteratee  A function that accepts up to three arguments. forEach calls the iteratee function one time for each element in the array.
   */
  forEach(array: Array<any>, iteratee: ArrayIterateeFunc): Array<any>
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param array The target array
   * @param iteratee A function that accepts up to three arguments. The map method calls the iteratee function one time for each element in the array.
   */
  map (array: Array<any>, iteratee: ArrayIterateeFunc): Array<any>
  /**
   * judge target if it's an array
   * @param array The target array
   */
  isArray (array: ReadonlyArray<any>): boolean
}
