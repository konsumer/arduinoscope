/**
 * Javascript Oscilloscope class, using canvas
 */

var Oscilloscope = function(pin, canvas, color, lineColor){
    var scope = this;

    this.color = color || 'rgba(255,0,0,0.5)';
    this.lineColor = lineColor || '#000';

    this.scaleX=1;
    this.scaleY=1;

    // public
    this.pin = pin;
    this.canvas = canvas;

    // private
    var values = [];
    var ctx = canvas.getContext("2d");

    ctx.globalAlpha = 1;
    ctx.lineWidth   = 1;

    /**
     * update canvas
     */
    this.update = function(){
        ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);

        // cross-hairs
        ctx.strokeStyle = scope.lineColor;
        ctx.beginPath();

        // ctx.moveTo(canvas.width/2, 0);
        // ctx.lineTo(canvas.width/2, canvas.height);
        ctx.moveTo(0, canvas.height/2);
        ctx.lineTo(canvas.width, canvas.height/2);

        ctx.stroke();
        ctx.closePath();

        // values
        ctx.beginPath();
        ctx.strokeStyle = scope.color;
        ctx.moveTo(0, canvas.height/2);
        scope.values.forEach(function(val, x){
            ctx.lineTo(x * scope.scaleX, val * scope.scaleY * canvas.height);
        });
        ctx.stroke();
        ctx.closePath();

    };

    // getter/setters to do magic

    /**
     * get min value
     */
    this.__defineGetter__("min", function(){
        return this.values.sort().shift();
    });

    /**
     * get max value
     */
    this.__defineGetter__("max", function(){
        return this.values.sort().pop();
    });

    /**
     * Interface for getting last value
     */
    this.__defineGetter__("value", function(){
        return values[values.length-1];
    });

    /**
     * Push single value to values, update()
     */
    this.__defineSetter__("value", function(val){
        // quicker typeof
        if (val['__proto__'] == Array.prototype){
            val.forEach(function(v){
                values.push(v);
            });
        }else{
            values.push(val);
        }
    });

    /**
     * Trim values to this.framesize
     */
    this.__defineGetter__("values", function(){
        // slice values to return copy
        if (values.length >= this.canvas.width){
            return values.slice(values.length-canvas.width,values.length);
        }else{
            return values.slice(0);
        }
    });

    /**
     * Interface for setting all values at once
     */
    this.__defineSetter__("values", function(val){
        values = val.slice(this.canvas.width);
    });

    // update on init
    this.update();

};
