import Sprite from '../base/sprite'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const BG_IMG_SRC = 'images/bg1.png';
const BG2_IMG_SRC = 'images/bg2.png';
const WIDTH = 375;  // 默认的iphone 6屏幕宽
const HEIGHT = 667; // 默认的iphone 6 屏幕高
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
const bg1 = new Image();
const bg2 = new Image();
const MyConstants = {
    BGWidth: screenWidth,//图片的宽
    BGHeight: screenWidth * HEIGHT / WIDTH, //图片的高
    BeginY: screenHeight - screenWidth * HEIGHT / WIDTH, //开始画图的y坐标
};
let instance;
export default class BackGround{
    constructor(ctx) {
        if (instance) {
            return instance
        }
        instance = this
        bg1.src = BG_IMG_SRC;
        bg2.src = BG2_IMG_SRC;
        this.render(ctx);
    }

    render(ctx) {
        ctx.drawImage(
            bg1,
            0,
            MyConstants.BeginY,
            MyConstants.BGWidth,
            MyConstants.BGHeight
        );
        if (MyConstants.BeginY > 0) {
            ctx.drawImage(
                bg1,
                0,
                0,
                WIDTH,
                MyConstants.BeginY * WIDTH / HEIGHT,
                0,
                0,
                MyConstants.BGWidth,
                MyConstants.BeginY
            )
        }
        ctx.drawImage(
            bg2,
            0,
            MyConstants.BeginY,
            MyConstants.BGWidth,
            MyConstants.BGHeight
        );
    }
}
