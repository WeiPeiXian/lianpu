import Sprite from '../base/sprite'
import Util from '../base/util'

var util = new Util()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/common.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */

var MyConstants = {
    PicWidth: (screenWidth - 10) / 6, //图片的宽
    PicHeight: (screenHeight - 70) / 6, //图片的长
    PicMargin: 2, //每个图片之间的距离
    PicRows: 6,
    PicCols: 6,
    BeginX: 0, //开始画图的x坐标
    BeginY: 60, //开始画图的y坐标
}

export default class BackGround extends Sprite {
    constructor() {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
    }


    render(ctx, x, y) {
        var picbeginX;
        var picbeginY;
        var picendX;
        var picendY;
        let grd1 = ctx.createLinearGradient(0, MyConstants.BeginY, 0, MyConstants.PicHeight)
        grd1.addColorStop(0, '#87CEEB')
        ctx.fillStyle = grd1
        ctx.fillRect(0, 0, screenWidth, 60)
        let grd2 = ctx.createLinearGradient(0, MyConstants.BeginY, 0, MyConstants.PicHeight)
        grd2.addColorStop(1, '#FFFFFF')
        ctx.fillStyle = grd2
        ctx.fillRect(0, 60, screenWidth, screenHeight - 60)

        ctx.fillStyle = "#000";
        ctx.fillRect(0, screenHeight - MyConstants.PicHeight -2 , screenWidth, 2);


        // for (var row = 0; row < 6; row++) {
        //     for (var column = 0; column < 6; column++) {
        //         picbeginX = MyConstants.BeginX + row * (MyConstants.PicWidth + MyConstants.PicMargin);  //数学问题，其实就是从左上角开始一个个定义好一个个图标的起点坐标
        //         picbeginY = MyConstants.BeginY + column * (MyConstants.PicHeight + MyConstants.PicMargin);
        //         picendX = picbeginX + MyConstants.PicWidth;
        //         picendY = MyConstants.BeginY + MyConstants.PicHeight;
        //         let grd = ctx.createLinearGradient(0, MyConstants.BeginY, 0, MyConstants.PicHeight)
        //         if (x === row && y === column) {
        //             grd.addColorStop(1, '#87CEEB')
        //         }
        //         grd.addColorStop(0, '#FFFFFF')
        //         ctx.fillStyle = grd
        //         ctx.fillRect(picbeginX, picbeginY, MyConstants.PicWidth, MyConstants.PicHeight);
        //     }
        // }
    }
}
