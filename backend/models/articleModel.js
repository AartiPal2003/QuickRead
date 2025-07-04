const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  urlToImage: { type: String },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Article', articleSchema);
