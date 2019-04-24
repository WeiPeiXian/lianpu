import Util from '../base/util'
import DataBus from "../databus";
import Sprite from "../base/sprite";

const pictureWidth = (window.innerWidth - 10) / 6;
const pictureHeigth = (window.innerHeight - 70) / 6;

let databus = new DataBus();
let util = new Util();
export default class LianPu extends Sprite {
    constructor(parameters) {
        let {src, row, column} = parameters;
        const ram = util.getStart(row, column);
        super(src, pictureWidth, pictureHeigth, ram[0], ram[1]);
        this.row = row;
        this.column = column;
        this.reset();
        databus.lianpus.push(this);
        databus.pool.setLianPu(row, column,this);

    }

    reset() {
        const rad = util.random(1, 8);
        this.data = rad;
        this.backsrc = "images/lianpu-" + util.random(1, 8) + "-back.jpg";
        this.time = new Date().getTime() / 1000;
        this.touched = false;
        this.showback = false;
        //休息两秒时设置
        this.visible = true;
        this.needShow = true;
        if (this.row === 5) {
            databus.daixiao[this.column] = rad;
        }
    }

    // showAni() {
    //     this.needShow = true
    // }

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
        this.needShow = false;
        const start = new Date().getTime();
        while (true) {
            if ((new Date().getTime() - start) / 1000 > seconds) {
                break;
            }
        }
        this.needShow = true;
    }


    draw(ctx) {
        this.update();
        if (this.showback) {
            this.img.src = this.backsrc
        } else {
            this.img.src = "images/lianpu-" + this.data + ".jpg"
        }
        if (this.needShow) {
            this.drawToCanvas(ctx)
        }
    }
}
