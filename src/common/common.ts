let objPrototype = Object.prototype

let MAX_SAFE_INTEGER = 9007199254740991

export const objGetOwnPropertySymbols = Object.getOwnPropertySymbols

// Checks if `value` is likely a prototype object.
export function isPrototype(value: object): boolean {
  let Ctor = value.constructor,
    proto = (typeof Ctor === 'function' && Ctor.prototype) || objPrototype

  return value === proto
}

// if value in Rang (0, MAX_SAFE_INTEGER)
export function isLength(value: unknown): boolean {
  return typeof value === 'number' &&
    value >= 0 && value < MAX_SAFE_INTEGER
}

// Checks the target if it has the attribute of length
export function isArrayLike(target: any): boolean {
  return target ? !isObject(target) && isLength(target.length) : false
}

// Checks if `value` is the object or function
export function isObject(value: any) {
  return (typeof value === 'object' || typeof value === 'function')
}

// Checks if `value` is the function
export function isFunction(func: any): boolean {
  return typeof func === 'function'
}
