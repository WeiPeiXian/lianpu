const width = window.innerWidth;
const height = window.innerHeight;
const pictureWidth = (width - 10) / 6;
const pictureHeigth = (height - 70) / 6;
let instance;
export default class Util {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    getStart = function (row, column) {
        let x = column * (2 + pictureWidth);
        let y = 60 + row * (2 + pictureHeigth);
        return [x, y]
    };

    getRC = function (x, y) {
        let row = Math.floor((y - 60) / (pictureHeigth + 2));
        let column = Math.floor(x / (pictureWidth + 2));
        return [row, column]
    };

    static random = function (start, end, oldvalue = 0) {
        start = start === void 0 ? 0 : start;
        end = end === void 0 ? 1 : end;
        let rand = Math.random() * (end - start) + start;
        let value = Math.floor(rand);
        if (value === oldvalue) {
            return instance.random(start,end,oldvalue)
        }
        return Math.floor(rand);
    };
}

