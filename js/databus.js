import Pool from './base/pool'
import LianPu from "./lianpu/lianpu";
import Util from './base/util.js'

let util = new Util()
let instance
/**
 * 全局状态管理器
 */

function rnd(start, end){
    return Math.floor(Math.random() * (end - start) + start)
}

export default class DataBus {
    constructor() {
        if (instance)
            return instance

        instance = this
        this.pool = new Pool()
        this.data = [[], [], [], [], [], []]
        this.time = [[], [], [], [], [], []]
        this.back = [[1, 2, 3, 2, 4, 1], [3, 2, 1, 3, 4, 1], [2, 2, 3, 4, 1, 2], [3, 3, 1, 2, 4, 4], [3, 2, 3, 1, 4, 1], [4, 1, 3, 2, 3, 2]]
    }

    reset() {
        this.frame = 0
        this.score = 0
        this.touchrow = 100
        this.touchcolumn = 100
        this.bullets = []
        this.lianpus = []
        this.animations = [] //动画
        this.gameOver = false
        for (var row = 0; row < 6; row++) {
            for (var column = 0; column < 6; column++) {
                var x = util.random(1, 3)
                this.data[row][column] = x
                this.time[row][column] = new Date().getTime() / 1000
                var src = "images/lianpu-" + x + ".png"
                var lianpu = new LianPu(src, row, column, x)
                this.pool.setLianPu(row,column,lianpu)
                this.lianpus.push(lianpu)
            }
        }
    }

    /**
     * 回收子弹，进入对象池
     * 此后不进入帧循环
     */
    removeBullets(bullet) {
        let temp = this.bullets.shift()

        temp.visible = false

        this.pool.recover('bullet', bullet)
    }
}
