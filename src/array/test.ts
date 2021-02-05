export function arrayTest(array): void {
  if (!Array.isArray(array)) {
    throw new TypeError('The first parameter must be an array')
  }
}
