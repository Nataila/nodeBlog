/* GET home page. */
var express = require('express');
var async = require('async');
var bodyParser = require('body-parser');
var md = require("node-markdown").Markdown;
var PostModel = require('../models/post');
var TagsModel = require('../models/tags');
var _ = require('underscore');
var moment = require('moment');
module.exports = function (app) {
  app.get('/', function(req, res) {
    async.parallel({
      postList: function(callback) {
        var query = PostModel.find().sort('-created_at');
        query.exec(function (err, post) {
          _.each(post, function (item) {
            item.created_time = moment(item.created_at).format('YYYY-MM-DD');
          });
          callback(null, post);
        });
      },
      tagList: function (callback) {
        var query = TagsModel.find();
        query.exec(function (err, tags) {
          callback(null, tags);
        });
      },
      newPostList: function (callback) {
        var query = PostModel.find().sort('-created_at').limit(5);
        query.exec(function (err, post) {
          callback(null, post);
        });
      }
    }, function (err, results) {
      res.render('postList', results);
    });
  });

  app.get('/admin', function (req, res) {
    var tagsList = TagsModel.find().sort('-created_at');
    tagsList.exec(function (err, tags) {
      res.render('admin', {'tags': tags});
    });
  });

  app.post('/post', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var tags = req.body.tags;
    var newPost = {};
    _.each(['title', 'description', 'content', 'tags'], function (item) {
      newPost[item] = req.body[item];
    });
    var post = new PostModel(newPost);
    post.save(function (err, post) {
      console.log(post);
    });
  });

  app.get('/detail/:id', function (req, res) {
    var postId = req.param('id');
    PostModel.findById(postId, function (err, post) {
       post.created_time = moment(post.created_at).format('YYYY-MM-DD');
      res.render('detail', {md: md, 'postDetail': post});
    });
  });

  app.post('/tags', function (req, res) {
    var name = req.body.name;
    var newTag = new TagsModel({'name': name});
    newTag.save(function (err,  tag) {
      res.send(tag);
    });
  });
};
