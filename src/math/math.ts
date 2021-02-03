class MathSy {
    static random(min: number, max: number): number {
        return ((max - min) * Math.random() + min)
    }
    static inRange(target: number, end: number, start: number = 0 ): boolean {
        if (start > end) {
            [start, end] = [end, start]
        }
        return target >= start && target < end
    }
}

let utilsyMath = new MathSy()

export default utilsyMath
