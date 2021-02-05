class MathSy {
  private static _instance: MathSy | undefined

  public static getInstance () {
    if (!this._instance) {
      this._instance = new MathSy()
    }
    return this._instance
  }

  random(min: number, max: number, precision: number = 0): number {
    let number = (max - min) * Math.random() + min
    if (precision === 0) {
      return Number(String(number).split('.')[0])
    } else {
      return Number(number.toFixed(precision))
    }
  }

  inRange(target: number, end: number, start: number = 0 ): boolean {
    if (start > end) {
      [start, end] = [end, start]
    }
    return target >= start && target < end
  }
}

export default MathSy.getInstance()
