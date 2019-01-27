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

  
  
});