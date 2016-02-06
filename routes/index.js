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
    var searchParam = {};
    var page = req.query.page || 1;
    var search = req.query.search;
    if (search) {
      searchParam = {'$or': [{'title': {'$regex': search}}, {'content': {'$regex': search}}]};
    }
    async.parallel({
      postList: function(callback) {
        var query = PostModel
          .find(searchParam)
          .skip((page - 1) * 10)
          .limit(10)
          .sort('-created_at');
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
      },
      postCount: function (callback) {
        var query = PostModel.find(searchParam).count();
        query.exec(function (err, count) {
          callback(null, count);
        });
      },
      searchParam: function (callback) {
        var callbackValue = _.isUndefined(search) ? '' : search;
        callback(null, callbackValue);
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
    var search = req.query.search;
    async.parallel({
      postDetail: function (callback) {
        var postId = req.param('id');
        PostModel.findById(postId, function (err, post) {
          post.created_time = moment(post.created_at).format('YYYY-MM-DD');
          callback(null, post);
        });
      },
      md: function (callback) {
        callback(null, md);
      },
      tagList: function (callback) {
        var query = TagsModel.find();
        query.exec(function (err, tags) {
          callback(null, tags);
        });
      },
      searchParam: function (callback) {
        var callbackValue = _.isUndefined(search) ? '' : search;
        callback(null, callbackValue);
      },
      newPostList: function (callback) {
        var query = PostModel.find().sort('-created_at').limit(5);
        query.exec(function (err, post) {
          callback(null, post);
        });
      }
    }, function (err, results) {
      res.render('detail', results);
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
