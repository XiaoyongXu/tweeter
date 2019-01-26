$(()=>{
  //deal with the textarea and show colors 
  const maxChar = 140;
  $("textarea").keyup(function(e){
    let txtChar = $(this).val().length;
    if(txtChar <= maxChar){
      let counter = maxChar - txtChar;
      $("#counter").text(counter).css('color','black');
    }else{
      let counter = maxChar - txtChar;
      $("#counter").text(counter).css('color','red');
    }
  });

  //deal with the hint when error happen
  $('#new').submit(function(){
    event.preventDefault();
    const serialized = $(this).serialize();
    const lengthOfText = $('textarea').val().length;
    if (lengthOfText === 0 ){
      $('#err').empty();
      $('#err').text("There is nothing entered")
      return false;
    }else if (lengthOfText > 140){
      $('#err').empty();
      $('#err').text("There is too many words entered")
      return false;
    }

    $('#err').empty();
    $.ajax({
      method: "POST",
      url:"/tweets",
      data: serialized,
    }).done(function(){

      loadTweets();
    });

    $('#new').get(0).reset();
    $("#counter").text("140");
  });
});