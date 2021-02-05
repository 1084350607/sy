export type NullAndUndefined = null | undefined

export interface ObjIterateeFunc {
  (key, value, obj): boolean
}

export interface ArrayIterateeFunc {
  (item: any, key: number, array: Array<any>): any
}
