$(()=>{

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