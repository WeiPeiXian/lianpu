import Util from '../base/util'
import DataBus from "../databus";

const pictureWidth = (window.innerWidth - 10) / 6;
const pictureHeigth = (window.innerHeight - 70) / 6;

let databus = new DataBus();
let util = new Util();

//脸谱需要的方法

export default class LianPu {
    constructor(parameters) {
        let {src, row, column} = parameters;
        const ram = util.getStart(row, column);
        this.row = row;
        this.x = ram[0];
        this.y = ram[1];
        this.column = column;
        this.reset();
        databus.lianpus.push(this);
        databus.pool.setLianPu(row, column, this);

    }

    reset() {
        const rad = util.random(1, 8);
        this.data = rad;
        this.backsrc = "images/lianpu-back-" + util.random(1, 8) + ".png";
        this.time = new Date().getTime() / 1000;
        this.touched = false;
        this.showback = false;
        //休息两秒时设置
        this.visible = true;
        this.needShow = true;
        if (this.row === 5) {
            databus.daixiao[this.column] = this.data;
        }
        return this.data
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

    draw(ctx) {
        this.update();
        let img;
        if (this.showback) {
            img = databus.imgs[this.data + 8];
        } else {
            img = databus.imgs[this.data];
        }
        ctx.drawImage(
            img,
            this.x,
            this.y,
            pictureWidth,
            pictureHeigth
        )

    }
}
