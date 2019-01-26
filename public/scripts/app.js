$(()=>{
  
  function createTweetElement(tweet){//creating single tweet 
    let postTime = moment(tweet.created_at).fromNow();
    let logo = tweet.user.avatars.small;
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    let $tweetElem ="";

    if(tweet.IsLike === 0 || tweet.IsLike === undefined){
    //add an unliked tweet when it has not been liked.
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
     //add an liked tweet when it has been liked.
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

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    for(tweet of tweets){
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  function loadTweets(){
    $.ajax({
      method: "get",
      url:"/tweets",
    }).done(function(res){
      renderTweets(res);
    });
  }
  
  //deal with the compose button
  $("#composeButton").click(function(){
    $('#err').empty();
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

  //deal with the like button
  $("#tweets-container").on('click','.like',function(){
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

  //call the main function
  loadTweets();

});