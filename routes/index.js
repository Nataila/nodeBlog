/* GET home page. */
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models/db');
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
  });
};
