$(function(){
  var inBrowser = false;
  // fixture for non-nw dev
  if (typeof require == 'undefined'){
    inBrowser = true;
    require = function(name){
      if (name == './arduino.js'){
        return {
          board: function(com, callback){
            callback(undefined, {
              analogPins: [14,15,16,17,18,19],
              pins: {
                14:{value:0},
                15:{value:0},
                16:{value:0},
                17:{value:0},
                18:{value:0},
                19:{value:0}
              }
            });
          },
          list: function(callback){
            callback(undefined, ['Fake Serial Port']);
          }
        };
      }
    };
  }

  var volts = 5;

  var arduino = require('./arduino.js');

  // cache all templates
  var templates = {};
  $('script[type=underscore]').each(function(){ templates[this.id] = _.template($(this).html()); });

  // setup COM port, handle com selection, and enter loop
  arduino.list(function(err, ports){
    if (err) throw(err);

    $('#com').html(templates.ports({ports:ports}));

    $('#com').change(function(){
      $('.scopes').html("");

      var com = $(this).val();
      if (com !== ''){
        // open COM port
        arduino.board(com, function(err, board){
          if (err) throw(err);

          console.log(com + ' opened');

          var scopes = [];
          board.analogPins.forEach(function(pin, i){
            var c = templates.scope({
              pin: pin,
              i: i,
              width: $('.container').width()-20
            });
            $('.scopes').append(c);
            var osc = new Oscilloscope(pin, $('#scope'+i+' canvas').get(0));
            osc.color = 'rgba(0,100,' + Math.floor((Math.random()*255)) + ', 0.8)';
            scopes.push(osc);
          });

          $('input.scaleX').change(function(){
            scopes[$(this).data('osc')].scaleX = $(this).val();
          });

          $('input.scaleY').change(function(){
            scopes[$(this).data('osc')].scaleY = $(this).val();
          });

          $('button.clear').click(function(){
            scopes[$(this).data('osc')].values=[];
          });

          var update = function(){
            scopes.forEach(function(scope, i){
                scope.update();
                $('.val', $('#scope' +i)).html(scope.value * volts);
                $('.min', $('#scope' +i)).html(scope.min * volts);
                $('.max', $('#scope' +i)).html(scope.max * volts);
                scope.value = board.pins[board.analogPins[i]].value;
            });
            window.requestAnimationFrame(update);
          };
          update();

          // fixture for non-nw dev
          if (inBrowser){
            var fn = new FunctionGenerator();
            board.pins[14].values = fn.noi();
            board.pins[15].values = fn.sqr();
            board.pins[16].values = fn.saw();
            board.pins[17].values = fn.tri();
            board.pins[18].values = fn.sin();
            board.pins[19].values = fn.cos();

            setInterval(function(){
              for (pin in board.pins){
                board.pins[pin].value = board.pins[pin].values[(new Date()).getTime() % 127];
              }
            }, 100);
          }
        });
      }
    });
  });
});
