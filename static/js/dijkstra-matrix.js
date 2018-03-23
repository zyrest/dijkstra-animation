
(function () {
    dijkstra.Matrix = function (cvs, tableName) {
        /**
         * 必要参数
         * @type {number}
         */
        var MAX_INF = Number.MAX_VALUE;

        var totalLineCount = Math.floor(Math.random() * 13) + 7;
        var totalCircleCount = 7;

        var dist = [];
        var flag = [];
        var path = [];
        var canvas;
        var table;

        /**
         * 绘图参数
         * @type {number}
         */
        var checkSize = 40;
        var checkXstart = 190;
        var checkYstart = 90;
        var checkOff = 40;

        var leftTextX = 160;
        var topTextY = 60;

        var check_lineFrom = [];
        var check_lineTo = [];

        var checks = [];
        var check_matrix = [];

        var checkActionQueue = [];

        var __init__ = function () {
            canvas = cvs || new fabric.Canvas('my_canvas', { selection: false });
            table = tableName || 'answer-table';

            for (var c = 0; c < totalCircleCount; c++) {
                checks[c] = [];
                check_matrix[c] = [];
            }
        };

        var existFalse = function () {

            for (var i = 0; i < totalCircleCount; i++) {
                if (flag[i] === false)
                    return true;
            }
            return false;
        };

        var makeCheckAction = function (start, end, nowDist, nowPath) {

            return function () {
                var reachable = nowDist != MAX_INF;
                $('#tr-'+end+' td:nth-child(2)').html(reachable ? '是' : '否');
                $('#tr-'+end+' td:nth-child(3)').html(reachable ? nowDist : 'INF');
                $('#tr-'+end+' td:nth-child(4)').html(nowPath+1);

                var targetCheck = checks[start][end].item(0);
                targetCheck.set({stroke: 'red'});
                targetCheck.animate({
                    strokeWidth: 3
                },{
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function () {
                        canvas.renderAll();
                        if (checkActionQueue.length !== 0) {
                            var arr = checkActionQueue.shift();
                            arr();
                        }
                    }
                });
            }
        };

        var generateCheckMatrix = function () {
            for(var i = 0; i < totalCircleCount; i++) { // 初始化二维矩阵数组
                check_matrix[i] = [];
                for(var j = 0; j < totalCircleCount; j++) {
                    check_matrix[i][j] = MAX_INF;
                    if (i === j) check_matrix[i][j] = 0;
                }
            }

            console.log("需要生成 %s 个边", totalLineCount);
            for(var k = 0; k < totalLineCount; k++) {  //随机生成连接各点的线段
                var rdmValue = Math.ceil(Math.random() * 30);

                var frm = Math.floor(Math.random() * totalCircleCount);
                var to2 = Math.floor(Math.random() * totalCircleCount);
                while (frm === to2) {
                    frm = Math.floor(Math.random() * totalCircleCount);
                    to2 = Math.floor(Math.random() * totalCircleCount);
                }

                for (var l = 0; l < k; l++) {    // 如果重复, 重新生成该线段, 不会重复生成
                    if (check_lineFrom[l] === frm && check_lineTo[l] === to2) {
                        do {
                            frm = Math.floor(Math.random() * totalCircleCount);
                            to2 = Math.floor(Math.random() * totalCircleCount);
                        } while (frm === to2);

                        l = 0;
                    }
                }

                check_lineFrom[k] = frm;
                check_lineTo[k] = to2;

                console.log("第 %s 个, from: %s, to: %s, value is : ", k+1, frm+1, to2+1, rdmValue);
                check_matrix[frm][to2] = rdmValue;
            }
        };

        var generateChecks = function () {
            for (var i = 0; i < totalCircleCount; i++) {
                var checkY = checkYstart + checkOff * i;

                for (var j = 0; j < totalCircleCount; j++) {
                    var checkX = checkXstart + checkOff * j;

                    var labelText = check_matrix[i][j] === MAX_INF ? '' : String(check_matrix[i][j]) ;
                    checks[i][j] = makeSquare(checkX, checkY, checkSize, labelText);
                    canvas.add(checks[i][j]);
                }

                var topTextX = checkXstart + checkOff * i;
                var leftText = makeText(leftTextX, checkY, String(i+1));
                var topText = makeText(topTextX, topTextY, String(i+1));
                canvas.add(leftText);
                canvas.add(topText);

                var html = '<tbody>';
                html += '<tr id="tr-'+i+'">';
                html += '<td>'+(i+1)+'</td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '</tr>';
                html += '</tbody>';

                $('#' + table).append($(html));
            }

            canvas.renderAll();
        };

        var check_blink = function (startPt) {

            for (var i = 0; i < totalCircleCount; i++) {
                dist[i] = check_matrix[startPt][i];
                flag[i] = false;
                if (dist[i] !== MAX_INF) path[i] = startPt;
                else path[i] = -1;

                $('#tr-'+i+' td:nth-child(2)').html(i === startPt ? '是' : '否');
                $('#tr-'+i+' td:nth-child(3)').html(i === startPt ? 0 : 'INF');
                $('#tr-'+i+' td:nth-child(4)').html(i === startPt ? startPt+1 : 0);

                if (dist[i] !== MAX_INF) {
                    var action = makeCheckAction(startPt, i, dist[i], path[i]);
                    checkActionQueue.push(action);
                }
            }
            flag[startPt] = true;

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
                    if (dist[k] > minDist + check_matrix[minIndex][k]) {
                        console.log("更新! %s, 原始距离为%s, 现在为%s", k, dist[k], minDist + check_matrix[minIndex][k]);
                        dist[k] = minDist + check_matrix[minIndex][k];
                        path[k] = minIndex;

                        var act = makeCheckAction(minIndex, k, dist[k], path[k]);
                        checkActionQueue.push(act);
                    }
                }

                flag[minIndex] = true;
            }

            console.log("step : " + checkActionQueue.length);
            var arr = checkActionQueue.shift();
            arr();
        };

        __init__();

        this.reGenerate = function () {
            canvas.clear();
            $('#'+table).children('tbody').remove();

            check_lineFrom = [];
            check_lineTo = [];

            checks = [];
            check_matrix = [];

            checkActionQueue = [];

            totalLineCount = Math.floor(Math.random() * 13) + 7;

            dist = [];
            flag = [];
            path = [];

            __init__();

            generateCheckMatrix();
            generateChecks();
        };
        this.exciting = function (startPt) {
            startPt = parseInt(startPt);
            check_blink(startPt);
        };

    }
})();

