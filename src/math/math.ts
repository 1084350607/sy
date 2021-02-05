class MathSy {
    private static _instance: MathSy | undefined
    static getInstance () {
        if (!this._instance) {
            this._instance = new MathSy()
        }
        return this._instance
    }
    random(min: number, max: number): number {
        return ((max - min) * Math.random() + min)
    }
    inRange(target: number, end: number, start: number = 0 ): boolean {
        if (start > end) {
            [start, end] = [end, start]
        }
        return target >= start && target < end
    }
}

export default MathSy.getInstance()
