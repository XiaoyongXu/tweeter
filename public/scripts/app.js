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
    for(tweet of tweets){
      $('#tweets-container').append(createTweetElement(tweet));
    }
  }

  $('#new').submit(function(){
    event.preventDefault();
    const serialized = $(this).serialize();
    console.log(serialized);
    $.ajax({
      method: "POST",
      url:"/tweets",
      data: serialized,

    }).done(function(){
      console.log(this.data);
    })
  });
  
  function createTweetElement(User){
    let postTime = moment(User.created_at).fromNow();
    let logo = User.user.avatars.small;
    let $tweetElem = $("<article>").addClass("tweet").html(
    
      `
      <header>
        <img src=${logo}>
        <name>${User.user.name}</name>
        <handel>${User.user.handle}</handel>
      </header>
      <hr>
      <h4>
        ${User.content.text}
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