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

  $("#composeButton").click(function(){
    $('#err').empty();
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

  $("#tweets-container").on('click','.like',function(){
    //When you dynamically create elements in javascript,
    //we cannot register the events of the buttons dynamically. 
    //we need to get the parents control to register event on the buttons within them.
    const curTweetID = $(this).parent().attr('data-id');
    const whetherLikedItOrNot = $(this).attr('data-id');
    var data = {
      tweetId : curTweetID,
      isLike: whetherLikedItOrNot
    };
    
    $.ajax({
      method: "POST",
      url:"/tweets/like",
      data: data,
      success: function(result){
        loadTweets();
      },
      error: function(error){
        console.log("there was an error liking it");
      }
    })
    
  });



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
  
  function createTweetElement(tweet){
    console.log("test ",tweet)
    let postTime = moment(tweet.created_at).fromNow();
    let logo = tweet.user.avatars.small;
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    let $tweetElem ="";
    if(tweet.IsLike===0 || tweet.IsLike===undefined){
      $tweetElem = $("<article>").addClass("tweet").html(
        `
        <header class="header">
          <img src=${logo}>
          <name>${tweet.user.name}</name>
          <handel>${tweet.user.handle}</handel>
        </header>
        <hr>
        <h4>
          ${safeHTML}
        </h4>
        <hr>
        <footer>
          <div>
            <h5>
              ${postTime}
              <span class="icon" data-id=${tweet._id} >
                <button><i class="fas fa-flag"></i></button>
                <button><i class="fas fa-retweet"></i></button>
                <button class="like" data-id="0"><i class="far fa-heart"></i></button>
              </span>
            </h5>
          </div>
        </footer>
        `
      )
    
    }
    else{
      $tweetElem = $("<article>").addClass("tweet").html(
    
        `
        <header class="header">
          <img src=${logo}>
          <name>${tweet.user.name}</name>
          <handel>${tweet.user.handle}</handel>
        </header>
        <hr>
        <h4>
          ${safeHTML}
        </h4>
        <hr>
        <footer>
          <div>
            <h5>
              ${postTime}
              <span class="icon" data-id=${tweet._id} >
                <button><i class="fas fa-flag"></i></button>
                <button><i class="fas fa-retweet"></i></button>
                <button class="like" data-id="1"><i class="fas fa-heart"></i></button>
              </span>
            </h5>
          </div>
        </footer>
        `
      )
    }
    
    return $tweetElem;
  }

  loadTweets();

});