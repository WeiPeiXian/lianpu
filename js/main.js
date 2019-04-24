import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import Util from './base/util.js'

let ctx = canvas.getContext('2d');
let databus = new DataBus();
let util = new Util();
let oldValue = 100;
let oldrow = 100;
let oldcolumn = 100;
let instance;

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0;
        instance = this;
        this.restart()
    }

    restart() {
        oldrow = 100;
        oldcolumn = 100;
        oldValue = 100;
        console.log("start game");
        databus.reset();
        wx.onTouchStart(function (e) {
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            if (y > 60 && !databus.gameOver) {
                instance.onTouch(x, y)
            }
        });
        this.needrefresh = true;
        canvas.removeEventListener(
            'touchstart',
            this.touchHandler
        );

        this.bg = new BackGround(ctx);
        this.gameinfo = new GameInfo();
        this.music = new Music();

        this.bindLoop = this.loop.bind(this);
        this.hasEventBind = false;

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId);

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    onTouch(x, y) {
        let location = util.getRC(x, y);
        let row = location[0];
        let column = location[1];
        let lianpu = databus.pool.getLianPuBylocation(row, column);
        if (lianpu.row !== 5 && lianpu.showback) {
            for (let i = 0; i < 6; i++) {
                if (databus.daixiao[i] === lianpu.data) {
                    // lianpu.sleep(2);
                    lianpu.reset();
                    instance.setback(row,column);
                    databus.time += 2;
                    databus.score ++;
                    databus.pool.getLianPuBylocation(5, i).reset();
                    break;
                }
            }
        }
        this.needrefresh = true
    }

    setback(row, column) {
        const newTime = new Date().getTime() / 1000;
        if (row > 0) {
            databus.pool.getLianPuBylocation(row - 1, column).time = newTime
        }
        if (row < 4) {
            databus.pool.getLianPuBylocation(row + 1, column).time = newTime
        }
        if (column > 0) {
            databus.pool.getLianPuBylocation(row, column - 1).time = newTime
        }
        if (column < 4) {
            databus.pool.getLianPuBylocation(row, column + 1).time = newTime
        }
        databus.pool.getLianPuBylocation(row, column).time = newTime
    }


    // 游戏结束后的触摸事件处理逻辑
    touchEventHandler(e) {
        e.preventDefault();
        this.needrefresh = true
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;

        let area = this.gameinfo.btnArea;

        if (x >= area.startX
            && x <= area.endX
            && y >= area.startY
            && y <= area.endY)
            this.restart()
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bg.render(ctx, databus.touchrow, databus.touchcolumn);

        databus.lianpus.forEach((lianpu) => {
            lianpu.draw(ctx);
        });

        const lastTime = 40 + databus.time - new Date().getTime() / 1000;
        if (lastTime <= 0) {
            databus.gameOver = true
        } else if (lastTime >=30) {
            this.gameinfo.renderGameScore(ctx, databus.score)
        } else {
            this.gameinfo.renderGameScore(ctx,databus.score, data)
        }
        // 游戏结束停止帧循环
        if (databus.gameOver) {
            this.gameinfo.renderGameOver(ctx, databus.score);
            if (!this.hasEventBind) {
                this.hasEventBind = true;
                this.touchHandler = this.touchEventHandler.bind(this);
                canvas.addEventListener('touchstart', this.touchHandler)
            }
        }
    }

    update(){
        if (new Date().getTime() % 1000 === 0) {
            this.needrefresh = true;
        }
    }

    // 实现游戏帧循环
    loop() {
        this.update()
        if (this.needrefresh) {
            this.render();
            this.aniId = window.requestAnimationFrame(
                this.bindLoop,
                canvas
            );
            this.needrefresh = false;
        }
    }
}
