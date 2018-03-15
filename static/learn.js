(function() {
    canvas = this.__canvas = new fabric.Canvas('c');

    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    fabric.Object.prototype.transparentCorners = false;

    function makeCircle(left, top, line1, line2, line3, line4) {
        var c = new fabric.Circle({
            left: left,
            top: top,
            strokeWidth: 5,
            radius: 20,
            fill: '#fff',
            stroke: 'green'
        });
        c.hasControls = c.hasBorders = true;

        c.line1 = line1;
        c.line2 = line2;
        c.line3 = line3;
        c.line4 = line4;

        return c;
    }


    function makeLine(coords) {
        return new fabric.Line(coords, {
            fill: 'red',
            stroke: 'red',
            strokeWidth: 5,
            selectable: false
        });
    }


    var line = makeLine([ 100, 200, 250, 200 ]),
    line2 = makeLine([ 250, 200, 250, 400 ]),
    line3 = makeLine([ 250, 400, 480, 200]),
    line4 = makeLine([ 250, 400, 400, 400]),
    line5 = makeLine([ 250, 200, 250, 100 ]),
    line6 = makeLine([ 250, 200, 380, 200 ]);
    canvas.add(line, line2, line3, line4, line5, line6);
    var circle = makeCircle(line.get('x1'), line.get('y1'), null, line);
    var circle1 = makeCircle(line.get('x2'), line.get('y2'), line, line2, line5, line6);
    var circle2 = makeCircle(line2.get('x2'), line2.get('y2'), line2, line3, line4);
    var circle3 = makeCircle(line3.get('x2'), line3.get('y2'), line3);
    var circle4 = makeCircle(line4.get('x2'), line4.get('y2'), line4);
    var circle5 = makeCircle(line5.get('x2'), line5.get('y2'), line5);
    var circle6 = makeCircle(line6.get('x2'), line6.get('y2'), line6);
    canvas.add(circle ,circle1,circle2,circle3,circle4,circle5,circle6);
    //var btnEl = document.createElement('inputText');
    // btnEl.innerHTML = 'add';
    // btnEl.id = 'a';
    //btnE1.style.position = absolute;
    //btnE1.style.left = a;
    //btnE1.style.top = b;
    //canvas.getElement().parentNode.appendChild(btnEl);
    //圆可选
    line.on('mousedown', function() {
        vard = (line.get('x1')+line.get('x2'))/2;
        vare = (line.get('y1')+line.get('y2'))/2;;
        var lineX = parseFloat(d)+"px";
        var lineY = parseFloat(e)+"px";
        var val = document.getElementById("linetext");
        val.style.left =lineX;
        val.style.top =lineY;
    });
    line2.on('mousedown', function() {
        vard = (line2.get('x1')+line2.get('x2'))/2;
        vare = (line2.get('y1')+line2.get('y2'))/2;;
        var lineX = parseFloat(d)+"px";
        var lineY = parseFloat(e)+"px";
        var val = document.getElementById("linetext1");
        val.style.left =lineX;
        val.style.top =lineY;
    });
    line3.on('mousedown', function() {
        vard = (line3.get('x1')+line3.get('x2'))/2;
        vare = (line3.get('y1')+line3.get('y2'))/2;;
        var lineX = parseFloat(d)+"px";
        var lineY = parseFloat(e)+"px";
        var val = document.getElementById("linetext2");
        val.style.left =lineX;
        val.style.top =lineY;
    });
    line4.on('mousedown', function() {
        vard = (line4.get('x1')+line4.get('x2'))/2;
        vare = (line4.get('y1')+line4.get('y2'))/2;;
        var lineX = parseFloat(d)+"px";
        var lineY = parseFloat(e)+"px";
        var val = document.getElementById("linetext3");
        val.style.left =lineX;
        val.style.top =lineY;
    });
    line5.on('mousedown', function() {
        var d = (line5.get('x1')+line5.get('x2'))/2;
        var e = (line5.get('y1')+line5.get('y2'))/2;
        var lineX = parseFloat(d)+"px";
        var lineY = parseFloat(e)+"px";
        var val = document.getElementById("linetext4");
        val.style.left =lineX;
        val.style.top =lineY;
    });
    line6.on('mousedown', function() {
    vard = (line6.get('x1')+line6.get('x2'))/2;
    vare = (line6.get('y1')+line6.get('y2'))/2;;
    var lineX = parseFloat(d)+"px";
    var lineY = parseFloat(e)+"px";
    var val = document.getElementById("linetext5");
    val.style.left =lineX;
    val.style.top =lineY;
    });
    //btnE1.showat(a,b);
    circle.on('moving', function() {
    //circle的输入框
    vara = line.get('x1');
    varb = line.get('y1');
    var circleX = parseFloat(a)+"px";
    var circleY = parseFloat(b)+"px";
    var val = document.getElementById("circletext");
    // val.style.position-left = a;
    // val.value = a;
    val.style.left =circleX;
    val.style.top =circleY;


    //line的输入框
    vard = (line.get('x1')+line.get('x2'))/2;
    vare = (line.get('y1')+line.get('y2'))/2;
    var lineX = parseFloat(d)+"px";
    var lineY = parseFloat(e)+"px";
    var val2 = document.getElementById("linetext");
    val2.style.left =lineX;
    val2.style.top =lineY;
    });
    circle.on('selected', function() {
    vara = line.get('x1');
    varb = line.get('y1');
    /* var circleX = parseFloat(a)+"px";
    var circleY = parseFloat(b)+"px";
    var board = document.getElementById("info2");
    var newNode = document.createElement("input");
    newNode.setAttribute('name','text');
    newNode.setAttribute('type','text');
    newNode.setAttribute('value','text');
    newNode.style.position = "absolute";
    newNode.style.left = circleX;
    newNode.style.top = circleY;
    newNode.style.border = "none";
    newNode.style.background = "transparent";
    board.insertBefore(newNode); */


    });


    circle1.on('moving', function() {
        vara = line.get('x2');
        varb = line.get('y2');
        var circleX = parseFloat(a)+"px";
        var circleY = parseFloat(b)+"px";
        var val = document.getElementById("circletext1");
        val.style.left =circleX;
        val.style.top =circleY;
    });
    circle2.on('moving', function() {
        vara = line2.get('x2');
        varb = line2.get('y2');
        var circleX = parseFloat(a)+"px";
        var circleY = parseFloat(b)+"px";
        var val = document.getElementById("circletext2");
        val.style.left =circleX;
        val.style.top =circleY;
    });
    circle3.on('moving', function() {
        vara = line3.get('x2');
        varb = line3.get('y2');
        var circleX = parseFloat(a)+"px";
        var circleY = parseFloat(b)+"px";
        var val = document.getElementById("circletext3");
        val.style.left =circleX;
        val.style.top =circleY;
    });
    circle4.on('moving', function() {
        vara = line4.get('x2');
        varb = line4.get('y2');
        var circleX = parseFloat(a)+"px";
        var circleY = parseFloat(b)+"px";
        var val = document.getElementById("circletext4");
        val.style.left =circleX;
        val.style.top =circleY;
    });
    circle5.on('moving', function() {
        vara = line5.get('x2');
        varb = line5.get('y2');
        var circleX = parseFloat(a)+"px";
        var circleY = parseFloat(b)+"px";
        var val = document.getElementById("circletext5");
        val.style.left =circleX;
        val.style.top =circleY;
    });
    circle6.on('moving', function() {
        vara = line6.get('x2');
        varb = line6.get('y2');
        var circleX = parseFloat(a)+"px";
        var circleY = parseFloat(b)+"px";
        var val = document.getElementById("circletext6");
        val.style.left =circleX;
        val.style.top =circleY;
    });
    // events
    /* var rect = new fabric.Rect({ width: 200, height: 50, fill: '#faa', rx: 20, ry: 20,left:300,top:200 });
    var text = new fabric.Text('Do stuff with me!', { fontSize: 20, fontFamily: 'Georgia' });
    var group = new fabric.Group([ rect, text ], { left: 250, top: 1320 });
    canvas.add(rect);
    canvas.add(text);
    canvas.add(group);


    rect.on('mousedown', function() {
    text.text = 'Mouse down';
    });
    group.on('mouseup', function() {
    text.text = 'Mouse up';
    });
    group.on('scaling', function() {
    text.text = 'Scaling';
    });
    group.on('moving', function() {
    text.text = 'Moving';
    });
    group.on('rotating', function() {
    text.text = 'Rotating';
    });
    group.on('mousemove', function() {
    text.text = 'Mouse move';
    });*/
    canvas.on('object:moving', function(e) {
        var p = e.target;
        p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
        p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
        p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
        p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
        canvas.renderAll();
    });
    })();
    </script>
    <script>
    function addcircle(){
    var c = new fabric.Circle({
    left: 100,
    top: 100,
    strokeWidth: 5,
    radius: 20,
    fill: '#fff',
    stroke: 'green'
    });
    c.hasControls = c.hasBorders = true;
    canvas.add(c);
    }
    function addrect(){
    var rect1 = new fabric.Rect({
    width: 40, height: 40, left: 100, top: 50, angle: 0,
    fill: 'white',stroke: 'red',strokeWidth: 5,
    });
    rect1.hasControls = rect1.hasBorders = true;
    canvas.add(rect1);
    }
    function addtriangle(){
    var triangle = new fabric.Triangle({
    width: 40, height: 40, left: 50, top: 100, fill: 'white',stroke: 'red',strokeWidth: 5
    });
    triangle.hasControls = triangle.hasBorders = true;
    canvas.add(triangle);
    }
    function addline(){
    var aline = new fabric.Line(coords, {
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
    selectable: false
    });
    canvas.add(line);
}