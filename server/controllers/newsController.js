const News = require('../models/News');

exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

exports.createNews = async (req, res) => {
  try {
    const newNews = new News(req.body);
    const news = await newNews.save();
    res.json(news);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(news);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Noticia eliminada' });
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};
