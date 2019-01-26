"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();



module.exports = function(DataHelpers) {
  //get all the tweets
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  //update the tweet "like" button
  tweetsRoutes.post("/like",function(req,res){
    let tweetId = req.body.tweetId;
    let isLike = req.body.isLike;
    DataHelpers.likeTweet(tweetId,isLike,(err) => {
      if (err){
        res.status(500).json({ error: err.message });
      } else {
        
        res.send({result:"True"});
      }
    });
  });

  //adding new tweet
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
