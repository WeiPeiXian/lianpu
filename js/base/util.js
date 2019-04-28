const WIDTH = 375;
const HEIGHT = 677;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const pictureWidth = 60 * screenWidth / WIDTH;
const pictureHeigth = 80 * screenWidth / WIDTH;
const gameWidth = 300 * screenWidth / WIDTH;
const gameHeight = 485 * screenWidth / WIDTH;
const startX = screenWidth / 2 - gameWidth / 2;
const startY = screenHeight - screenWidth / 2 * HEIGHT / WIDTH - gameHeight / 2;
let instance;
export default class Util {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }

    getCenter = function (row, column) {
        let x = column * pictureWidth + pictureWidth / 2 + startX;
        let y = row * (pictureHeigth + 1) + pictureHeigth / 2 + startY;
        return [x, y]
    };

    getRC = function (x, y) {
        let row = Math.floor((y - startY) / (pictureHeigth + 1));
        let column = Math.floor((x - startX) / pictureWidth);
        return [row, column]
    };

    random = function (start, end, oldvalue = 0) {
        start = start === void 0 ? 0 : start;
        end = end === void 0 ? 1 : end;
        let rand = Math.random() * (end - start) + start;
        let value = Math.floor(rand);
        if (value === oldvalue) {
            return instance.random(start, end, oldvalue)
        }
        return Math.floor(rand);
    };
    sleep = function (seconds) {
        const start = new Date().getTime();
        while (true) {
            if ((new Date().getTime() - start) / 1000 > seconds) {
                break;
            }
        }
    };
}

