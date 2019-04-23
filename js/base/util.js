const width = window.innerWidth
const height = window.innerHeight
const pictureWidth = (width - 10) / 6
const pictureHeigth = (height - 70) / 6
var log = console.log.bind(console);
let instance
export default class Util {
    constructor() {
        if (instance)
            return instance
        instance = this
        this.pictureHeigth = pictureHeigth
        this.pictureWidth = pictureWidth
    }
    instance = instance


    getIndex() {
    }

    getStart = function (row, column) {
        var y = 60 + row * (2 + pictureHeigth)
        var x =  column * (2 + pictureWidth)
        return [x, y]
    }

    getXY = function (x, y) {
        var m = Math.floor(x / (pictureWidth + 2))
        var n = Math.floor((y-60)/ (pictureHeigth + 2))
        return [n, m]
    }

    random = function (start, end, oldvalue = 0) {
        start = start === void 0 ? 0 : start;
        end = end === void 0 ? 1 : end;
        var rand = Math.random() * (end - start) + start;
        var value = Math.floor(rand)
        if (value === oldvalue) {
            return this.random(start,end,oldvalue)
        }
        return Math.floor(rand);
    };
    on = function (elem, type, callback, status) {
        elem.addEventListener(type, function (e) {
            callback(e);
            if (status) {
                return false;
            }
        });
    };

    css = function (elem, styleObj) {
        for (var i in styleObj) {
            elem.style[i] = styleObj[i];
        }
    };
    getLocalStorage = function (key) {
        return localStorage[key] ?
            JSON.parse(localStorage[key]) : null;
    }

    toNdimension = function (arr, num) {
        var new_arr = [];
        for (var i = 0; i < arr.length; i += num) {
            new_arr.push(arr.slice(i, i + num));
        }
        return new_arr;
    }

    reduceDimension(arr) {
        return Array.prototype.concat.apply([], arr);
    }
}

