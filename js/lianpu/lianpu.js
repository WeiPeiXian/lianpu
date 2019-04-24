import Sprite from '../base/sprite'
import Util from '../base/util'

const pictureWidth = (window.innerWidth - 10) / 6;
const pictureHeigth = (window.innerHeight - 70) / 6;

let util = new Util();
export default class LianPu extends Sprite {
    constructor(parameters) {
        let {src, row, column} = parameters;
        const ram = util.getStart(row, column);
        super(src, pictureWidth, pictureHeigth, ram[0], ram[1]);
        this.row = row;
        this.reset()
    }

    reset() {
        const rad = util.random(1, 8);
        this.data = rad;
        this.backsrc = "images/lianpu-" + util.random(1, 8) + "-back.jpg";
        this.time = new Date().getTime() / 1000;
        this.touched = false;
        this.showback = false;
        //休息两秒时设置
        this.show = true;
        return rad;
    }

    //更新是否展示，能否点击的逻辑
    update() {
        this.showback = (new Date().getTime() / 1000 - this.time) > 5;
        if (this.touched) {
            this.showback = false
        }
        if (this.row === 5) {
            this.showback = false
        }
    }

    sleep(seconds) {
        this.show = false;
        const start = new Date().getTime();
        while (true) {
            if ((new Date().getTime() - start) / 1000 > seconds) {
                break;
            }
        }
        this.show = true;
    }


    draw(ctx) {
        this.update();
        if (this.showback) {
            this.img.src = this.backsrc
        } else {
            this.img.src = "images/lianpu-" + this.data + ".jpg"
        }
        if (!this.sleep) {
            this.drawToCanvas(ctx)
        }
    }
}
