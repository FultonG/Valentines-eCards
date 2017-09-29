$(document).ready(function(){
  var app = Sammy('#main', function(){

    this.get('#/', function(){
      $('#nameCard').hide();
      $('#info').show();
      $('#submit').click(function(){
        app.setLocation('#/' + $('#from').val() + '/' + $('#to').val());
      });
    });

    this.get('#/:name1/:name2', function(){
      $('#info').hide();
      $('#name1').text('From: ' + this.params['name1']);
      $('#name2').text('To: ' + this.params['name2']);
      var num = getRandomInt(1,4);
      //posts to the server to get back to quote from the given ID
      $.post("http://localhost:3000/id", {'id': num})
        .done(function(data){
          $('#quote').text(data.quote);
        });

        $('#nameCard').fadeIn(3000);

    });

  });

  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

  app.run('#/');
});
