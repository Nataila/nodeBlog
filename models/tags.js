var mongoose = require('mongoose');

var TagsSchema = new mongoose.Schema({
  name: String,
  created_at: {type: Date, default: Date.now}
}, {
  collection: 'tags'
});

var TagsModel = mongoose.model('Tags', TagsSchema);
module.exports = TagsModel;
