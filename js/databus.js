import Pool from './base/pool'

let instance; //这里的变量是预加载的，


export default class DataBus {
    constructor() {
        if (instance)
            return instance;  //这种代码方式，保证只有DataBus只有一次创建
        instance = this;
        let ctx = canvas.getContext('2d');
        this.imgs = {};
        for (let i = 1;i<=8;i++) {
            this.imgs[i] = new Image();
            this.imgs[i].src = "images/lianpu-" + i+ ".png";
        }
        for (let i = 9;i<=16;i++) {
            this.imgs[i] = new Image();
            this.imgs[i].src = "images/lianpu-back-" + (i-8) + ".png";
        }
        this.ctx = ctx
        this.pool = new Pool();
        this.lianpus = [];
        this.daixiao = {};
        this.animations = [];
    }


    reset() {
        this.time = new Date().getTime() / 1000;
        this.score = 0;
        this.lianpus.forEach((lianpu) => {
            lianpu.reset();
            lianpu.draw(this.ctx);
            if (lianpu.row === 5) {
                this.daixiao[lianpu.column] = lianpu.data
            }
        });
        this.gameOver = false
    }

    redraw(){
        this.lianpus.forEach((lianpu)=>{
            lianpu.draw(this.ctx);
        })
    }
}

