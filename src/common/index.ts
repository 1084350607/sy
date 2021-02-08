export type NullAndUndefined = null | undefined

export interface ObjIterateeFunc<T> {
  (key: unknown, value: any, obj: object): T
}

export interface ArrayIterateeFunc {
  (item: unknown, key: number, array: Array<any>): any
}
