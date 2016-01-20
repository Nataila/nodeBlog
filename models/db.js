var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeBlog');

var PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: {type: Date, default: Date.now}
}, {
  collection: 'post'
});

var PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
