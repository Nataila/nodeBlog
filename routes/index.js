/* GET home page. */
var express = require('express');
var bodyParser = require('body-parser');
var Post = require('../models/post');
module.exports = function (app) {
  app.get('/', function(req, res) {
    res.render('index', {'title': 'Express'});
  });
  app.get('/admin', function (req, res) {
    res.render('admin', {});
  });

  app.post('/post', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var post = new Post({
      title: title,
      content: content
    });
    post.save(function (err, post) {
      console.log(post);
    });
  });
};
