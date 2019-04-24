import Pool from './base/pool'

let instance;

/**
 * 全局状态管理器
 */

export default class DataBus {
    constructor(ctx) {
        if (instance)
            return instance;
        instance = this;
        this.ctx = ctx
        this.pool = new Pool();
        this.lianpus = [];
        this.daixiao = [];
    }

    reset() {
        this.time = new Date().getTime() / 1000;
        this.score = 0;
        this.lianpus.forEach((lianpu) => {
            let data = lianpu.reset();
            lianpu.draw(this.ctx);
            if (lianpu.row === 5) {
                this.daixiao[lianpu.column] = data
            }
        });
        this.animations = [];
        this.gameOver = false
    }

}

