import React, { useState, useEffect } from 'react';
import axios from 'axios';

const technologiesList = [
  'JavaScript', 'HTML5', 'CSS3', 'React', 'Redux', 'Express.js', 'NPM', 'NodeJS', 'Pug', 'Bootstrap', 'Jest', 'SQLite', 'Postgres', 'MongoDB', 'Firebase'
];

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    imageUrl: '',
    videoUrl: '',
    description: '',
    technologies: [],
    deploymentUrl: '',
    repositoryUrl: '',
    backendUrl: ''
  });

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        ...initialData,
        technologies: initialData.technologies || [] // Ensure technologies is an array
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => {
      const newTechnologies = checked
        ? [...prevState.technologies, value]
        : prevState.technologies.filter(tech => tech !== value);
      return { ...prevState, technologies: newTechnologies };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = initialData._id
        ? await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${initialData._id}`, formData)
        : await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, formData);
      onSubmit(response.data); // Callback to handle the response
      setFormData({
        title: '',
        summary: '',
        imageUrl: '',
        videoUrl: '',
        description: '',
        technologies: [],
        deploymentUrl: '',
        repositoryUrl: '',
        backendUrl: ''
      });
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData._id ? `Editando ${initialData.title}` : 'Nuevo Proyecto'}</h2>
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
      <div>
        <label>Technologies:</label>
        {technologiesList.map(tech => (
          <div key={tech}>
            <input
              type="checkbox"
              name="technologies"
              value={tech}
              checked={formData.technologies.includes(tech)}
              onChange={handleCheckboxChange}
            />
            <label>{tech}</label>
          </div>
        ))}
      </div>
      <div>
        <label>Deployment URL:</label>
        <input type="text" name="deploymentUrl" value={formData.deploymentUrl} onChange={handleChange} />
      </div>
      <div>
        <label>Repository URL:</label>
        <input type="text" name="repositoryUrl" value={formData.repositoryUrl} onChange={handleChange} />
      </div>
      <div>
        <label>Backend URL:</label>
        <input type="text" name="backendUrl" value={formData.backendUrl} onChange={handleChange} />
      </div>
      <button type="submit">{initialData._id ? 'Update' : 'Submit'}</button>
    </form>
  );
};

export default ProjectForm;

