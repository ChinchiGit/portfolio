const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Proyecto eliminado' });
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

