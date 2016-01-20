/* GET home page. */
var express = require('express');
var bodyParser = require('body-parser');
var PostModel = require('../models/post');
var _ = require('underscore');
var moment = require('moment');
module.exports = function (app) {
  app.get('/', function(req, res) {
    var postList = PostModel.find({title: 'asdf'});
    postList.exec(function (err, post) {
      _.each(post, function (item) {
        item.created_time = moment(item.created_at).format('YYYY-MM-DD');
      });
      res.render('index', {'postList': post});
    });
  });
  app.get('/admin', function (req, res) {
    res.render('admin', {});
  });

  app.post('/post', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var post = new PostModel({
      title: title,
      content: content
    });
    post.save(function (err, post) {
      console.log(post);
    });
  });
};
