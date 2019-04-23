import Sprite from '../base/sprite'
import Util from '../base/util'

const pictureWidth = (window.innerWidth - 10) / 6
const pictureHeigth = (window.innerHeight - 70) / 6

let util = new Util()
export default class LianPu extends Sprite {
    constructor(src, row, column, data = 0) {
        super(src, pictureWidth, pictureHeigth)
        var ram = util.getStart(row, column)
        this.x = ram[0]
        this.y = ram[1]
        this.src = src
        this.backsrc = "images/lianpu-" + util.random(1,8) + "-back.png"
        this.data = data
        this.time = new Date().getTime() / 1000
        this.touched = false;
    }



    draw(ctx) {
        if (new Date().getTime() / 1000 - this.time > 10) {
            this.img.src = "images/lianpu-" + this.backup + "-back.png"
        } else {
            this.img.src = "images/lianpu-" + this.data + ".png"
        }
        this.drawToCanvas(ctx)
    }

    setback() {

    }
}
