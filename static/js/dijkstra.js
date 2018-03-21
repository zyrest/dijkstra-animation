var canvas = new fabric.Canvas('my_canvas', { selection: false });
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
canvas.on('object:moving', function(e) {
    var p = e.target;

    var inLine = p.inLine;
    var outLine = p.outLine;

    inLine.forEach(function (value) {
        value.set({ 'x2': p.left, 'y2': p.top })
    });

    outLine.forEach(function (value) {
        value.set({ 'x1': p.left, 'y1': p.top })
    });

    //changeLine(p);
    canvas.renderAll();
});

var MAX_INF = Number.MAX_VALUE;

var totalLineCount = Math.floor(Math.random() * 13) + 7;//
var totalCircleCount = 7;

var matrix = []; //记录边的权值

var line = []; //所有线的集合, 对象是fabric.Line
var lineFrom = []; //每条线的起点 0-6
var lineTo = []; //每条线的终点 0-6

var circle = []; //所有点的集合
var circleX = [50, 270, 250, 350, 80,  90,  375]; // 每个点的left坐标
var circleY = [50, 60,  250, 440, 440, 225, 225]; // 每个点的top坐标

var actionQueue = [];

var dist = [];
var flag = [];
var path = [];

function makeCircle(labelText, left, top, inLine, outLine) {
    var c = new fabric.Circle({
        strokeWidth: 5,
        radius: 12,
        fill: '#fff',
        stroke: '#666',
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false
    });

    var t = new fabric.Text(labelText, {
        fontSize: 14,
        originX: 'center',
        originY: 'center'
    });

    var g = new fabric.Group([c, t], {
        left: left,
        top: top,
        hasControls: false,
        hasBorders: false
        //selectable: false
    });

    g.inLine = inLine;
    g.outLine = outLine;
    return g;
}

function makeLine(coords, labelValue) {
    return new fabric.LineArrow(coords, {
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: 1,
        label: labelValue,
        selectable: false
    });
}

function makeAction(start, end, nowDist, nowPath, isStartOver) { // 令start, end点变红闪烁, 连接两点的线段变红

    return function () {
        var reachable = nowDist != MAX_INF;
        $('#tr-'+end+' td:nth-child(2)').html(reachable ? '是' : '否');
        $('#tr-'+end+' td:nth-child(3)').html(reachable ? nowDist : 'INF');
        $('#tr-'+end+' td:nth-child(4)').html(nowPath+1);

        reachable = reachable && start !== end;
        var i = 0;
        if (reachable) {
            for (; i < totalLineCount; i++) {
                if (lineFrom[i] === start && lineTo[i] === end) {
                    line[i].set({'stroke': 'red', 'fill': 'red'});
                    break;
                }
            }
        }

        circle[end].item(0).set({'stroke': 'red'});
        circle[start].item(0).set({'stroke': 'red'});
        circle[end].item(0).animate({
            "strokeWidth": 10
        },{
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function () {
                circle[end].item(0).set({'strokeWidth': 5, 'stroke': '#666'});
                circle[start].item(0).set({'strokeWidth': 5, 'stroke': '#666'});

                if (reachable) line[i].set({'stroke': 'grey', 'fill': 'grey'});
                if (isStartOver) enablePath(start);

                canvas.renderAll();
                if (actionQueue.length !== 0) {
                    var arr = actionQueue.shift();
                    arr();
                }
            }
        });
    }
}

function initLineCircle(canvas) {
    for(var i = 0; i < totalCircleCount; i++) { // 初始化二维矩阵数组
        matrix[i] = [];
        for(var j = 0; j < totalCircleCount; j++) {
            matrix[i][j] = MAX_INF;
            if (i === j) matrix[i][j] = 0;
        }
    }

    var value = [];
    for(var k = 0; k < totalLineCount; k++) {  //随机生成连接各点的线段
        value[k] = Math.ceil(Math.random() * 30);

        var frm = Math.floor(Math.random() * totalCircleCount);
        var to2 = Math.floor(Math.random() * totalCircleCount);

        while (frm === to2) {
            frm = Math.floor(Math.random() * totalCircleCount);
            to2 = Math.floor(Math.random() * totalCircleCount);
        }

        for (var l = 0; l < k; l++) {    // 如果重复, 重新生成该线段, 不会重复生成
            if (lineFrom[l] === frm && lineTo[l] === to2) {
                //console.log('false! re-define l = ' + l);

                do {
                    frm = Math.floor(Math.random() * totalCircleCount);
                    to2 = Math.floor(Math.random() * totalCircleCount);
                } while (frm === to2);

                l = 0;
            }
        }

        lineFrom[k] = frm;
        lineTo[k] = to2;

        //console.log("from : %s, to : %s", frm, to2);

        line[k] = makeLine([circleX[frm], circleY[frm], circleX[to2], circleY[to2]], String(value[k]));
        canvas.add(line[k]);
        matrix[frm][to2] = value[k];
    }

    for (var c = 0; c < totalCircleCount; c++) {  // 生成点, 绑定各个线段到其起始点
        var inLine = [];
        var outLine = [];

        for (var l_ = 0; l_ < totalLineCount; l_++) {
            if (lineTo[l_] == c)
                inLine.push(line[l_]);

            if (lineFrom[l_] == c)
                outLine.push(line[l_]);
        }

        circle[c] = makeCircle(String(c+1), circleX[c], circleY[c], inLine, outLine);
        canvas.add(circle[c]);

        var html = '<tbody>';
        html += '<tr id="tr-'+c+'">';
        html += '<td>'+(c+1)+'</td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '</tr>';
        html += '</tbody>';

        $('#circle-table').append($(html));
    }
}

function blink(startPt) {

    flag[startPt] = true;
    for (var i = 0; i < totalCircleCount; i++) {
        console.log("here we go " + i);
        dist[i] = matrix[startPt][i];
        flag[i] = false;
        if (dist[i] != MAX_INF) {
            path[i] = startPt;
        }
        else path[i] = -1;

        var action = makeAction(startPt, i, dist[i], path[i]);
        actionQueue.push(action);
    }

    while (existFalse()) {
        var minDist = MAX_INF;
        var minIndex = startPt;
        var noMore = true;

        for (var j = 0; j < totalCircleCount; j++) {
            if (flag[j]) continue;

            if (dist[j] < minDist) {
                minDist = dist[j];
                minIndex = j;
                noMore = false;
            }
        }

        if (noMore) {
            console.log("没有更多了");
            break;
        }

        for (var k = 0; k < totalCircleCount; k++) {
            if (dist[k] > minDist + matrix[minIndex][k]) {
                console.log("更新! %s, 原始距离为%s, 现在为%s", k, dist[k], minDist + matrix[minIndex][k]);
                dist[k] = minDist + matrix[minIndex][k];
                path[k] = minIndex;

                var act = makeAction(minIndex, k, dist[k], path[k]);
                actionQueue.push(act);
            }
        }

        flag[minIndex] = true;
    }

    var arr = actionQueue.shift();
    arr();
}

function enablePath(i) {
    if (i === 0) return;

    if (path[i] !== -1) {
        var k = 0;
        for (; k < totalLineCount; k++) {
            if (lineFrom[k] === path[i] && lineTo[k] === i) {
                line[k].set({'stroke': 'blue', 'fill': 'blue'});
                break;
            }
        }
        enablePath(path[i]);
    }
}

function existFalse() {
    for (var i = 0; i<totalCircleCount; i++) {
        if (flag[i] === false) {
            return true;
        }
    }
    return false;
}