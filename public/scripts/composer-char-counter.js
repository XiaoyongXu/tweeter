$(document).ready(function(){

  const maxChar = 140;

  $("textarea").keyup(function(e){
    let txtChar = $(this).val().length;
  //  if(txtChar <= maxChar){
    let counter = maxChar - txtChar;
    if (counter < 0){
      $("#counter").text(counter).css('color','red');
    }else{
      $("#counter").text(counter);
    }
  //  }
  });
 
 
  // $("textarea").keydown(function(e){
  //  let keycode = e.keyCode;
  //  let txtChar = $(this).val().length;
  //  if(txtChar > maxChar){
  //   if(keycode != 8){
  //     return false;
  //   }
  //  }
  // });

});