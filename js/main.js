import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import Util from './base/util.js'

let ctx = canvas.getContext('2d')
let databus = new DataBus()
let util = new Util()
let oldValue = 100
let oldrow = 100
let oldcolumn = 100
const width = window.innerWidth
const height = window.innerHeight
/**
 * 游戏主函数
 */
let instance
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
        instance = this
        this.restart()
    }

    restart() {
        oldrow = 100
        oldcolumn = 100
        oldValue = 100
        console.log("start game")
        databus.reset()
        for (var i = 0;i<6;i ++) {
            databus.daixiao[i] = databus.pool.getLianPuBylocation(5,i).value;
        }
        wx.onTouchStart(function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if (y>60) {
                instance.onTouch(x,y)
            }
        })
        canvas.removeEventListener(
            'touchstart',
            this.touchHandler
        )

        this.bg = new BackGround(ctx)
        this.gameinfo = new GameInfo()
        this.music = new Music()

        this.bindLoop = this.loop.bind(this)
        this.hasEventBind = false

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId);

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    onTouch(x,y) {
        var location = util.getRC(x, y)
        var row = location[0]
        var column = location[1]
        var lianpu = databus.pool.getLianPuBylocation(row, column)
        if (oldrow !== 100) {
            var oldLianpu = databus.pool.getLianPuBylocation(oldrow, oldcolumn)
        }
        var data = lianpu.data
        if (oldrow === row && oldcolumn === column) {
            oldrow = 100
            oldcolumn = 100
            oldValue = 100
            databus.touchcolumn = 100
            databus.touchrow = 100
        } else if (data === oldValue) {
            databus.touchcolumn = 100
            databus.touchrow = 100
            lianpu.reset()
            oldLianpu.data = util.random(1, 8, oldValue)
            databus.score++
            instance.setback(row, column)
            oldrow = 100
            oldcolumn = 100
            oldValue = 100
        } else {
            oldrow = row
            oldcolumn = column
            oldValue = data
            databus.touchcolumn = row
            databus.touchrow = column
        }
    }

    setback(row, column) {
        var newtime = new Date().getTime() / 1000
        if (row > 0) {
            databus.pool.getLianPuBylocation(row - 1, column).time = newtime
        }
        if (row < 4) {
            databus.pool.getLianPuBylocation(row + 1, column).time = newtime
        }
        if (column > 0) {
            databus.pool.getLianPuBylocation(row, column - 1).time = newtime
        }
        if (column < 4) {
            databus.pool.getLianPuBylocation(row, column + 1).time = newtime
        }
        databus.pool.getLianPuBylocation(row, column).time = newtime
    }

    /**
     * 随着帧数变化的敌机生成逻辑
     * 帧数取模定义成生成的频率
     */
    enemyGenerate() {

    }

// 游戏结束后的触摸事件处理逻辑
    touchEventHandler(e) {
        e.preventDefault()

        let x = e.touches[0].clientX
        let y = e.touches[0].clientY

        let area = this.gameinfo.btnArea

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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.bg.render(ctx, databus.touchrow, databus.touchcolumn)

        databus.lianpus.forEach((lianpu) => {
            lianpu.draw(ctx);
        })

        var lasttime = 30 + databus.time - new Date().getTime() / 1000
        if (lasttime <= 0) {
            databus.gameOver = true
        } else {
            this.gameinfo.renderGameScore(ctx, databus.score,lasttime)
        }
        // 游戏结束停止帧循环
        if (databus.gameOver) {
            this.gameinfo.renderGameOver(ctx, databus.score)
            if (!this.hasEventBind) {
                this.hasEventBind = true
                this.touchHandler = this.touchEventHandler.bind(this)
                canvas.addEventListener('touchstart', this.touchHandler)
            }
        }
    }

    update() {
        if (databus.gameOver)
            return;
    }

// 实现游戏帧循环
    loop() {
        // if ((new Date().getTime() - time ) > 33 ){
        this.render()
        this.update()
        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
        // time = new Date().getTime()
        // }

    }
}
