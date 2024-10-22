import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    imageUrl: '',
    videoUrl: '',
    description: ''
  });

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = initialData._id
        ? await axios.put(`${import.meta.env.VITE_API_URL}/api/news/${initialData._id}`, formData)
        : await axios.post(`${import.meta.env.VITE_API_URL}/api/news`, formData);
      onSubmit(response.data); // Callback to handle the response
      setFormData({
        title: '',
        summary: '',
        imageUrl: '',
        videoUrl: '',
        description: ''
      });
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData._id ? `Editando ${initialData.title}`  : 'Nueva Noticia'}</h2>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Summary:</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange} />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
      </div>
      <div>
        <label>Video URL:</label>
        <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
      <button type="submit">{initialData._id ? 'GUARDAR' : 'CREAR'}</button>
    </form>
  );
};

export default NewsForm;

