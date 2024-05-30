const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  summary: String,
  imageUrl: String,
  videoUrl: String,
  description: String,
  technologies: [String],
  deploymentUrl: String,
  repositoryUrl: String,
  backendUrl: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

