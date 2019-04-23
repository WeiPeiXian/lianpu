/**
 * 简易的对象池实现
 * 用于对象的存贮和重复使用
 * 可以有效减少对象创建开销和避免频繁的垃圾回收
 * 提高游戏性能
 */
export default class Pool {
    constructor() {
        this.poolDic = [[], [], [], [], [], []]
    }

    getLianPuBylocation(row, column) {
        return this.poolDic[row][column]
    }

    setLianPu(row, column, lianpu) {
        this.poolDic[row][column] = lianpu
    }
}
