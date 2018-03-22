var canvas = new fabric.Canvas('my_canvas', { selection: false });
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

var MAX_INF = Number.MAX_VALUE;

var totalLineCount = Math.floor(Math.random() * 13) + 7;//
var totalCircleCount = 7;

var dist = [];
var flag = [];
var path = [];

function existFalse() {

    for (var i = 0; i < totalCircleCount; i++) {
        if (flag[i] === false)
            return true;
    }
    return false;
}