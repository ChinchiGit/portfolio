import React, { useState } from "react";
import { useProjects } from '../context/ProjectsContext';
import AdminItem from '../components/AdminItem';
import ProjectForm from '../components/ProjectsForm';
import axios from 'axios';

const ProjectsPage = () => {
  const { projects, loading, setProjects } = useProjects();
  const [editData, setEditData] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar/ocultar el formulario
  const [editId, setEditId] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este proyecto?");
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
        setProjects(prevProjects => prevProjects.filter(item => item._id !== id));
        alert("Proyecto eliminado correctamente.");
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      const response = data._id
        ? await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${data._id}`, data)
        : await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, data);
      alert("Noticia guardada correctamente.");
      setProjects(prevProjects => {
        if (data._id) {
          return prevProjects.map(item => (item._id === data._id ? response.data : item));
        }
        return [...prevProjects, response.data];
      });
    } catch (error) {
      console.error("Error saving project:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Proyectos</h1>

      {projects.map(item => (
        <div key={item._id}>
          <AdminItem
            item={item}
            editForm={editId === item._id} // Mostrar el formulario solo si el ID coincide
            onEdit={() => {
              setEditId(editId === item._id ? null : item._id); // Alternar el ID de edición
              setEditData(item); // Establecer los datos a editar
            }} 
            onDelete={handleDelete}
            onEditData={setEditData}
          />
          {editId === item._id && ( // Mostrar el formulario solo si el ID coincide
            <ProjectForm
              onSubmit={handleSubmit}
              initialData={editData || {}} // Pasar datos de edición o un objeto vacío
            />
          )}
        </div>
      ))}

      <button onClick={() => setShowCreateForm(!showCreateForm)}>{showCreateForm ? "Cancelar" : "Nuevo Proyecto"}</button>
      {showCreateForm && (
        <ProjectForm
          onSubmit={handleSubmit}
          // initialData={editData || {}} // Pasar datos de edición o un objeto vacío
        />
      )}
    </div>
  );
};


export default ProjectsPage;
