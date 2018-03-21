
fabric.LineArrow = fabric.util.createClass(fabric.Line, {
    type: 'lineArrow',

    initialize: function(element, options) {
        options || (options = {});
        this.callSuper('initialize', element, options);
    },

    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },

    _render: function(ctx){
        this.callSuper('_render', ctx);

        // do not render if width/height are zeros or object is not visible
        if (this.width === 0 || this.height === 0 || !this.visible) return;

        ctx.save();

        var xDiff = this.x2 - this.x1;
        var yDiff = this.y2 - this.y1;
        var angle = Math.atan2(yDiff, xDiff);
        ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
        ctx.rotate(angle);
        ctx.beginPath();
        //move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
        ctx.moveTo(10, 0);
        ctx.lineTo(-25, 5);
        ctx.lineTo(-25, -5);
        ctx.closePath();
        ctx.fillStyle = this.stroke;
        this.width = Math.abs(this.x2 - this.x1);
        this.height = Math.abs(this.y2 - this.y1);

        if (this.label) {
            ctx.font = '15px Helvetica';
            ctx.fillText(this.label, -110, -5);
        }
        ctx.fill();
        ctx.restore();
    }
});

fabric.LineArrow.fromObject = function (object, callback) {
    callback && callback(new fabric.LineArrow([object.x1, object.y1, object.x2, object.y2], object));
};

fabric.LineArrow.async = true;

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