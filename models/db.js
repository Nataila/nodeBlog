 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/nodeBlog');
 
 // var PostSchema = new mongoose.Schema({
 //   title: String,
 //   content: String,
 //   created_at: {type: Date, default: Date.now}
 // }, {
 //   collection: 'post'
 // });
 // 
 // var PostModel = db.model('Post', PostSchema);

function Post(post) {
  console.log(123);
  // this.title = post.title;
  // this.content = post.content;
  // this.created_at = post.created_at;
}

// Post.prototype.save = function (callback) {
//   var post = {
//     title: this.title,
//     content: this.content,
//     created_at: this.created_at
//   };
//   var newPost = new PostModel(post);
//   newPost.save(function (err, post) {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, post);
//   });
// };

module.exports = Post;
