const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  summary: String,
  imageUrl: String,
  videoUrl: String,
  description: String,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
