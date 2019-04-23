import Pool from './base/pool'
import LianPu from "./lianpu/lianpu";
import Util from './base/util.js'

let util = new Util()
let instance

/**
 * 全局状态管理器
 */

export default class DataBus {
    constructor() {
        if (instance)
            return instance

        instance = this
        this.pool = new Pool()
        this.lianpus = []
        this.daixiao = []
        for (var row = 0; row < 6; row++) {
            for (var column = 0; column < 6; column++) {
                var x = util.random(1, 8)
                var src = "images/lianpu-" + x + ".jpg"
                var lianpu = new LianPu({src: src, row: row, column: column}, x)
                this.pool.setLianPu(row, column,lianpu)
                this.lianpus.push(lianpu)
            }
        }
    }

    reset() {
        this.time = new Date().getTime() / 1000
        this.score = 0
        this.lianpus.forEach((lianpu) => {
            lianpu.reset()
        })
        this.touchrow = 100
        this.touchcolumn = 100
        this.animations = [] //动画
        this.gameOver = false
    }

}

