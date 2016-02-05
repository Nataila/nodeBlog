var mongoose = require('mongoose');

var TagsSchema = new mongoose.Schema({
  name: String,
  count: {type: Number, default: 1},
  created_at: {type: Date, default: Date.now}
}, {
  collection: 'tags'
});

var TagsModel = mongoose.model('Tags', TagsSchema);
module.exports = TagsModel;
