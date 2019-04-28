const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let atlas = new Image();
atlas.src = 'images/common.jpg';
let instance
export default class GameInfo {
    constructor(){
        if (instance) {
            return instance
        }
        instance = this
    }

    renderGameScore(ctx, score,time = 30) {
        ctx.fillStyle = "#333333";
        ctx.font = "20px Arial";
        ctx.fillText(
            score,
            10,
            50
        );

        ctx.fillStyle = "#0F0";
        ctx.font = "20px Arial";
        ctx.fillText(
            "剩余实间 : ",
            0.75 * screenWidth - 140,
            50
        );
        ctx.fillRect(
            0.75 * screenWidth, 40 , 0.2 * screenWidth * time / 30 , 10);

    }

    renderGameOver(ctx, score) {

        ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300);

        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";

        ctx.fillText(
            '游戏结束',
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 50
        );

        ctx.fillText(
            '得分: ' + score,
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 130
        );

        ctx.drawImage(
            atlas,
            120, 6, 39, 24,
            screenWidth / 2 - 60,
            screenHeight / 2 - 100 + 180,
            120, 40
        );

        ctx.fillText(
            '重新开始',
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 205
        );

        this.gameArea = {
            startX: screenWidth/2 - 50,
            endX: screenWidth/2+50,
            startY: screenHeight/2 - 100
        }

        /**
         * 重新开始按钮区域
         * 方便简易判断按钮点击
         */
        this.btnArea = {
            startX: screenWidth / 2 - 40,
            startY: screenHeight / 2 - 100 + 180,
            endX: screenWidth / 2 + 50,
            endY: screenHeight / 2 - 100 + 255
        }
    }
}

