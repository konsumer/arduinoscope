/**
 * Javascript Oscilloscope class, using canvas
 */

var Oscilloscope = function(pin, canvas){
	// public
	this.pin = pin;
	this.canvas = canvas;
	this.framesize = canvas.width;

	// private
	var values = [];
	var ctx = ctx = canvas.getContext("2d");
	
	ctx.globalAlpha = 1;
    ctx.lineWidth   = 1;

	/**
     * update canvas. should not have to do manual, as setters call this
     * included for decoupling data from graphics, later
     */
    this.update = function(){
    	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    
		// cross-hairs
	    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
	    ctx.beginPath();
	    ctx.moveTo(canvas.width/2, 0);
	    ctx.lineTo(canvas.width/2, canvas.height);
	    ctx.moveTo(0, canvas.height/2);
	    ctx.lineTo(canvas.width, canvas.height/2);
	    ctx.stroke();

	    // values
	    ctx.strokeStyle = 'rgba(255,0,0,0.8)';
	    ctx.moveTo(0, 0);
	    this.values.forEach(function(val, x){
	    	ctx.lineTo(x, (val/1024) * canvas.height);
	    });
		
		ctx.closePath();
	    ctx.stroke();
    }

	// getter/setters to do magic

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
        values.push(val);
        this.update();
    });

    /**
     * Trim values to this.framesize
     */
	this.__defineGetter__("values", function(){
		if (values.length >= this.framesize){
        	return values.slice(values.length-this.framesize, this.framesize);
    	}else{
    		return values.slice(0);
    	}
    });
    
    /**
     * Interface for setting all values at once
     */
    this.__defineSetter__("values", function(val){
        values = val.slice(this.framesize);
        this.update();
    });

    // update on init
    this.update();

};