import Pool from './base/pool'
import LianPu from "./lianpu/lianpu";
import Util from './base/util.js'

let util = new Util();
let instance;

/**
 * 全局状态管理器
 */

export default class DataBus {
    constructor() {
        if (instance)
            return instance;

        instance = this;
        this.pool = new Pool();
        this.lianpus = [];
        this.daixiao = [];
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                let x = util.random(1, 8);
                let src = "images/lianpu-" + x + ".jpg";
                new LianPu({src: src, row: row, column: column}, x);
            }
        }
    }

    reset() {
        this.time = new Date().getTime() / 1000;
        this.score = 0;
        this.lianpus.forEach((lianpu) => {
            let data = lianpu.reset();
            if (lianpu.row === 5) {
                this.daixiao[lianpu.column] = data
            }
        });
        this.touchrow = 100;
        this.touchcolumn = 100;
        this.animations = []; //动画
        this.gameOver = false
    }

}

