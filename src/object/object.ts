interface IterateeFunc {
    (key, value, obj): boolean
}

class ObjectSy {
    static some(obj: Object, iteratee: IterateeFunc): boolean | void {
        if (typeof iteratee !== "function") {
            console.error('[Utilsy Error] Type error, callback must be a function')
        } else {
            let index = -1
            let objValue = Object.values(obj)
            let objKey = Object.keys(obj)

            let flag = false
            while (++index < objValue.length) {
                flag = iteratee(objKey[index], objValue[index], obj) !== false ? true : flag
            }
            return flag
        }
    }
    static every(obj: Object, iteratee: IterateeFunc): boolean | void {
        if (typeof iteratee !== "function") {
            console.error('[Utilsy Error] Type error, callback must be a function')
        } else {
            let index = -1
            let objValue = Object.values(obj)
            let objKey = Object.keys(obj)

            let flag = true
            while (++index < objValue.length) {
                if (!flag) {
                    break
                }
                flag = iteratee(objKey[index], objValue[index], obj) === true
            }
            return flag
        }
    }
}

