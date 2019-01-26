"use strict";
const ObjectID = require('mongodb').ObjectID


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      
      db.collection("tweets").insertOne(newTweet,(err, result) => {
        if(err){
          callback(err);
        } else {
          callback(null, true);
        }
      });  
    },

    //user can like a tweet or unlike
    likeTweet: function(tweetID,isLike,callback){
      let flag;
      if(isLike==="1"){
        flag = 0;
      } else if(isLike==="0"){
        flag = 1;
      }
      db.collection("tweets").update({_id:ObjectID(tweetID)}, {$set: {IsLike:flag}},(err,result) => {
        if(err){
          callback(err);
        } else {
          callback(null, result);
        }
      });
    },
    
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets.sort(sortNewestFirst));
      });
      // callback(null, db.collection("tweets").sort(sortNewestFirst));
      
    }

  };
}
