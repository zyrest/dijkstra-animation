/**
 * 参数
 * @type {number}
 */
// 起点正方形
var squareX = 150;
var squareY = [60, 120, 180, 240, 300, 360, 420];
var squareSize = 40;

// 后续节点长方形
var rectXstart = 230;
var rectXoff = 90;
var rectY = [60, 120, 180, 240, 300, 360, 420];
var rectWidth = 60;
var rectHeight = 30;

// 连线
var alineXstart = 160;
var alineXoff = 90;
var alineY = [60, 120, 180, 240, 300, 360, 420];
var alineLength = 40;

/**
 * 图形相关, 绘图记录
 * @type {Array}
 */
var linear = [];
for (var i = 0; i < totalCircleCount; i++) linear[i] = [];

var linear_starts = [];
var linear_childs = [];
for (var j = 0; j < totalCircleCount; j++) linear_childs[j] = [];


var linear_lines = [];
for (var k = 0; k < totalCircleCount; k++) linear_lines[k] = [];
var linear_lineFrom = [];
var linear_lineTo = [];

/**
 * 动画相关, 每一步动作记录
 * @type {Array}
 */
var linear_actionQueue = [];


function makeLinearAction(start, end, nowDist, nowPath, isStartOver) {

    return function () {
        var reachable = nowDist != MAX_INF;
        $('#tr-'+end+' td:nth-child(2)').html(reachable ? '是' : '否');
        $('#tr-'+end+' td:nth-child(3)').html(reachable ? nowDist : 'INF');
        $('#tr-'+end+' td:nth-child(4)').html(nowPath+1);

        var targetRect = null;
        linear[start].forEach(function (value, index) {
            var endPt = value['point'];
            if (endPt == end) {
                targetRect = linear_childs[start][index];
            }
        });

        if (targetRect == null) return;

        linear_starts[start].item(0).set({
            stroke: 'red',
            strokeWidth: 3
        });
        targetRect.item(0).set({stroke: 'red'});
        targetRect.item(3).set({stroke: 'red'});
        targetRect.item(4).set({stroke: 'red'});
        targetRect.item(0).animate({
            "strokeWidth": 3
        }, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function () {
                linear_starts[start].item(0).set({
                    stroke: 'blue',
                    strokeWidth: 3
                });
                targetRect.item(0).set({stroke: 'grey'});
                targetRect.item(3).set({stroke: 'grey'});
                targetRect.item(4).set({stroke: 'grey'});

                canvas.renderAll();
                if (linear_actionQueue.length !== 0) {
                    var arr = linear_actionQueue.shift();
                    arr();
                }
            }
        });
    }

}

function generateLinear() { // 生成边的权值

    console.log("需要生成 %s 个边", totalLineCount);

    for(var k = 0; k < totalLineCount; k++) {  //随机生成连接各点的线段

        var rdmValue = Math.ceil(Math.random() * 30);

        var frm = Math.floor(Math.random() * totalCircleCount);
        var to2 = Math.floor(Math.random() * totalCircleCount);

        while (frm === to2) {
            frm = Math.floor(Math.random() * totalCircleCount);
            to2 = Math.floor(Math.random() * totalCircleCount);
        }

        for (var l = 0; l < k; l++) {    // 如果重复, 重新生成该线段, 不会重复生成相同线段
            if (linear_lineFrom[l] === frm && linear_lineTo[l] === to2) {
                //console.log('false! re-define l = ' + l);

                do {
                    frm = Math.floor(Math.random() * totalCircleCount);
                    to2 = Math.floor(Math.random() * totalCircleCount);
                } while (frm === to2);

                l = 0;
            }
        }

        console.log("第 %s 个, from: %s, to: %s, value is : ", k, frm+1, to2+1, rdmValue);
        linear_lineFrom[k] = frm;
        linear_lineTo[k] = to2;
        linear[frm].push({point: to2, value: rdmValue});
    }

    var jsonArraySort = function (keyName) {

        return function (jsonA, jsonB) {
            var pointA = jsonA[keyName];
            var pointB = jsonB[keyName];

            if (pointA > pointB) return 1;
            else if (pointA < pointB) return -1;
            else return 0;
        }
    };
    linear.forEach(function (value) {
        value.sort(jsonArraySort('point'))
    });
}

function generateSquares() {
    for (var i = 0; i < squareY.length; i++) {
        linear_starts[i] = makeSquare(squareX, squareY[i], squareSize, String(i+1));

        linear[i].forEach(function (value, index) { // 添加当前正方形的子长方形
            var point = String(value['point'] + 1);
            var pValue = String(value['value']);
            var childRect = makeTriRect(rectXstart + rectXoff * index, squareY[i], rectWidth, rectHeight, point, pValue);

            linear_childs[i][index] = childRect;
            canvas.add(childRect);

            // 添加每个子长方形对应的连线
            var tmpLine = makeLine([alineXstart+alineXoff*index, alineY[i], alineXstart+alineXoff*index + alineLength, alineY[i]+1]);
            canvas.add(tmpLine);
        });

        canvas.add(linear_starts[i]);

        var html = '<tbody>';
        html += '<tr id="tr-'+i+'">';
        html += '<td>'+(i+1)+'</td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '</tr>';
        html += '</tbody>';

        $('#answer-table').append($(html));
    }

    canvas.renderAll();
}

function linear_blink(startPt) {

    for (var i = 0; i < totalCircleCount; i++) {
        dist[i] = MAX_INF;
        flag[i] = false;
        path[i] = -1;
        $('#tr-'+i+' td:nth-child(2)').html(i === startPt ? '是' : '否');
        $('#tr-'+i+' td:nth-child(3)').html(i === startPt ? 0 : 'INF');
        $('#tr-'+i+' td:nth-child(4)').html(i === startPt ? startPt+1 : 0);
    }
    flag[startPt] = true;
    dist[startPt] = 0;

    linear[startPt].forEach(function (value) {
        var endPt = value['point'];
        var toEndDist = value['value'];
        dist[endPt] = toEndDist;
        path[endPt] = startPt;

        var actionStep = makeLinearAction(startPt, endPt, toEndDist, path[endPt]);
        linear_actionQueue.push(actionStep);
    });

    console.log(dist);

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

        linear[minIndex].forEach(function (value) {
            var endPt = value['point'];
            var toEndDist = value['value'];

            if (dist[endPt] > minDist + toEndDist) {
                console.log("更新! %s, 原始距离为%s, 现在为%s", endPt+1, dist[endPt], minDist + toEndDist);
                dist[endPt] = minDist + toEndDist;
                path[endPt] = minIndex;

                var act = makeLinearAction(minIndex, endPt, dist[endPt], minIndex);
                linear_actionQueue.push(act);
            }
        });

        flag[minIndex] = true;
    }

    console.log(linear_actionQueue.length);

    var arr = linear_actionQueue.shift();
    arr();
}

function linear_dijkstra() {
    generateLinear();
    generateSquares();
    linear_blink(0);
}