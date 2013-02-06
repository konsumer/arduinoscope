/**
 * Each function will generate 127 point single-duty WAVE OF TYPE
 */

var FunctionGenerator=function(position){
    // run a function on all points in array
    this.func = function(f){
        var out = [], x;
        for (x=0; x<127; x++){
            out.push(f(x));
        }
        return out;
    };

    this.noi = function(){
        return this.func(function(x){
            return Math.random();
        });
    };

    this.sqr = function(){
        return this.func(function(x){
            return (x<64) ? 0 : 1;
        });
    };

    this.saw = function(){
        return this.func(function(x){
            return x/127;
        });
    };

    this.tri = function(){
        return this.func(function(x){
            return (x<64) ? x/64 : ((64-x)/63) + 1;
        });
    };

    this.sin = function(){
        return this.func(function(x){
            return Math.sin( x * (Math.PI * 2 / 127) ) / 2 + 0.5;
        });
    };

    this.cos = function(){
        return this.func(function(x){
            return Math.cos( x * (Math.PI * 2 / 127) ) / 2 + 0.5;
        });
    };



};
