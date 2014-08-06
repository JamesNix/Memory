(function(){

  'use strict';

  $(document).ready(init);
  
  function init(){
    $('#board').hide();
    $('.letter').hide();
    $('#play').click(ranLetters);
    $('#reset').click(reset);
    $('.tile').click(showLtr);
  }
  
  var match = {name: 'Matches', number: 0, tries: 0};

  function ranLetters(){
    $('#play').attr('disabled','disabled');
    $('#board').show();
    var ltrs = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var newLtrs = _.shuffle(ltrs);
    var shuff = [];
    for(var i = 0; i < 10; i++){
      shuff += newLtrs[i];
    }
    var shuff2 = _.sample(shuff, [10]).join('');
    var shuffLtrs = shuff + shuff2;
    shuffLtrs = shuffLtrs.split('');
    for(var j=0; j<shuffLtrs.length; j++){
      $('.letter').eq(j).append(shuffLtrs[j]);
    }
  }

  function showLtr(){
    var $this = $(this);
    if($this.hasClass('match')){
      return;
    } else {
      if(!$this.hasClass('flipped') && $('.flipped').length < 2){
        $this.flip({
          direction: 'lr',
          color: 'white',
          content: $this.text(),
          speed: 50,
          onEnd: function (){
            if($('.flipped:eq(1)').length){
              checkMatch();
            }
          }
        }).addClass('flipped');
      } else {
        $(this).revertFlip().removeClass('flipped');
      }
    }
  }

  function checkMatch(){
    if($('.flipped:eq(0)').text() === $('.flipped:eq(1)').text()){
      $('.flipped').addClass('match').animate({'background-color': 'green'},100).removeClass('flipped');
      $('#score').empty();
      match.number += 1;
      match.tries += 1;
      $('#score').append('Matches: ' + match.number + '/' + match.tries);
    } else {
      $('#score').empty();
      match.tries += 1;
      $('#score').append('Matches: ' + match.number + '/' + match.tries);
      $('.flipped').animate({'background-color': 'red'},100);
      setTimeout(function(){
        $('.flipped').revertFlip().removeClass('flipped');
      }, 1000);
    }
    if(match.number === 10){
      $('#score').append('Matches: ' + match.number + '/' + match.tries + '  ').text('You win!);
    }
  }

  function reset(){
    location.reload();
  }

})();
