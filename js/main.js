import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import Util from './base/util.js'
import LianPu from "./lianpu/lianpu";

let databus = new DataBus();
let util = new Util();
let oldValue = 100;
let oldrow = 100;
let oldcolumn = 100;
let instance;
let lastTime
/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0;
        instance = this;
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                let x = util.random(1, 8);
                let src = "images/lianpu-" + x + ".jpg";
                new LianPu({src: src, row: row, column: column}, x);
            }
        }
        this.touchHandler = this.touchEventHandler.bind(this);
        canvas.addEventListener('touchstart', this.touchHandler)
        this.restart()
    }

    restart() {
        window.cancelAnimationFrame(this.aniId);
        oldrow = 100;
        oldcolumn = 100;
        oldValue = 100;
        console.log("start game");
        this.gameinfo = new GameInfo();
        this.bindLoop = this.loop.bind(this,);
        new Music();
        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        );
        this.bg = new BackGround(databus.ctx);

        databus.reset();
        util.sleep(1)
    }


    onTouch(x, y) {
        let location = util.getRC(x, y);
        let row = location[0];
        let column = location[1];
        let lianpu = databus.pool.getLianPuBylocation(row, column);
        if (lianpu.row !== 5) {
            for (let i = 0; i < 6; i++) {
                if (databus.daixiao[i] === lianpu.data) {
                    // lianpu.sleep(2);
                    console.log(i);
                    databus.daixiao[i] = lianpu.reset();
                    lianpu.draw(databus.ctx);
                    instance.setback(row, column);
                    if (lastTime < 28) {
                        databus.time += 2;
                    }
                    databus.score++;
                    let lian = databus.pool.getLianPuBylocation(5, i);
                    lian.reset();
                    lian.draw(databus.ctx);
                    break;
                }
            }
        }
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
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        if (!databus.gameOver) {
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            if (y > 60) {
                instance.onTouch(x, y)
            }
        } else {
            let area = this.gameinfo.btnArea;
            if (x >= area.startX
                && x <= area.endX
                && y >= area.startY
                && y <= area.endY)
                this.restart()
        }
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        databus.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.bg.render(databus.ctx)
        databus.lianpus.forEach((lianpu)=>{
            lianpu.draw(databus.ctx)
        });
        lastTime = 40 + databus.time - new Date().getTime() / 1000;
        if (lastTime <= 0) {
            databus.gameOver = true;
            this.gameinfo.renderGameScore(databus.ctx, databus.score, 0)
        } else if (lastTime >= 30) {
            // databus.redraw();
            this.gameinfo.renderGameScore(databus.ctx, databus.score)
        } else {
            this.gameinfo.renderGameScore(databus.ctx, databus.score, lastTime)
        }
        // 游戏结束停止帧循环
        if (databus.gameOver) {
            this.gameinfo.renderGameOver(databus.ctx, databus.score);
        }
    }

    update() {
        if (new Date().getTime() % 1000 === 0) {
            this.needrefresh = true;
        }
    }

    // 实现游戏帧循环
    loop() {
        this.update();
        this.render();

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        );
    }
}
