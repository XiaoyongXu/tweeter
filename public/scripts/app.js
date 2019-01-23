/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake usersData taken from tweets.json




$(()=>{
  function loadTweets(){
    $.ajax({
      method: "get",
      url:"/tweets",
    }).done(function(res){
      renderTweets(res);
    });
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    for(tweet of tweets){
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  $('#new').submit(function(){
    event.preventDefault();
    const serialized = $(this).serialize();
    const lengthOfText = $('textarea').val().length;
    if (lengthOfText === 0 ){
      alert("nothing to tweet")
      return false;
    }else if (lengthOfText > 140){
      alert("to many words to tweet");
      return false;
    }

    $.ajax({
      method: "POST",
      url:"/tweets",
      data: serialized,
    }).done(function(){

      loadTweets();
    })
    $('#new').get(0).reset();
    $("#counter").text("nothing entered").css('color','red');
  });
  
  function createTweetElement(User){
    let postTime = moment(User.created_at).fromNow();
    let logo = User.user.avatars.small;
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const safeHTML = `<p>${escape(User.content.text)}</p>`;
    let $tweetElem = $("<article>").addClass("tweet").html(
    
      `
      <header>
        <img src=${logo}>
        <name>${User.user.name}</name>
        <handel>${User.user.handle}</handel>
      </header>
      <hr>
      <h4>
        ${safeHTML}
      </h4>
      <hr>
      <h5>
        ${postTime}
      </h5>
      `
    )
    return $tweetElem;
  }

  loadTweets();

});