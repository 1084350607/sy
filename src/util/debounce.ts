export default function debounce (func: Function, wait: number) {
  let timeId

  if (typeof func !== 'function') {
    return new TypeError('the first parameter must be a Function')
  }

  // parse wait to number if it is not a number
  wait = +wait || 0

  return function debounced() {
    clearTimeout(timeId)
    timeId = setTimeout(func, wait)
  }
}
