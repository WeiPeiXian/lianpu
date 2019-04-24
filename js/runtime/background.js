import Sprite from '../base/sprite'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const BG_IMG_SRC = 'images/common.jpg';
const BG_WIDTH = 512;
const BG_HEIGHT = 512;
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
const MyConstants = {
    PicWidth: (screenWidth - 10) / 6, //图片的宽
    PicHeight: (screenHeight - 70) / 6, //图片的高
    BeginY: 60, //开始画图的y坐标
};

export default class BackGround extends Sprite {
    constructor() {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
    }

    render(ctx) {
        let grd1 = ctx.createLinearGradient(0, MyConstants.BeginY, 0, MyConstants.PicHeight);
        grd1.addColorStop(0, '#87CEEB');
        ctx.fillStyle = grd1;
        ctx.fillRect(0, 0, screenWidth, 60);
        let grd2 = ctx.createLinearGradient(0, MyConstants.BeginY, 0, MyConstants.PicHeight);
        grd2.addColorStop(1, '#FFFFFF');
        ctx.fillStyle = grd2;
        ctx.fillRect(0, 60, screenWidth, screenHeight - 60);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, screenHeight - MyConstants.PicHeight -2 , screenWidth, 2);
    }
}
