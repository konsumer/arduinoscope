$(function(){
  var socket = io.connect();
  var scope_template = $('#scopes').html();

  var params = decodeURIComponent(window.location.search.slice(1))
    .split('&')
    .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
      b = b.split('=');
      a[b[0]] = b[1];
      return a;
    }, {});

  params.port = params.port || 0;
  params.count = params.count || 1;

  function setupScopes(){
    $('#scopes').html("");
    for (var i=0; i< params.count; i++){
      $(scope_template+"").data('id', i);
      $('#scopes').append(scope_template);
    }
    $('#port').val(params.port);
    $('#count').val(params.count);
  }

  socket.emit('list', {});
  socket.on('list', function(data){
    $('#port').html("");
    data.ports.forEach(function(port, i){
      $('#port').append('<option value="' + i + '">' + port + '</option>');
    });
    setupScopes();
  });

  $(".code_help").click(function(){
    $('#code_help').show();
    return false;
  });

});
