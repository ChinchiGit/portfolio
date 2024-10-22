import React, { useState } from "react";
import { useNews } from '../context/NewsContext';
import AdminItem from '../components/AdminItem';
import NewsForm from '../components/NewsForm';
import axios from 'axios';

const NewsPage = () => {
  const { news, loading, setNews } = useNews();
  const [editData, setEditData] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editId, setEditId] = useState(null); // Cambiar a un estado que almacene el ID de la noticia en edición

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta noticia?");
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/news/${id}`);
        setNews(prevNews => prevNews.filter(item => item._id !== id));
        alert("Noticia eliminada correctamente.");
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      const response = data._id
        ? await axios.put(`${import.meta.env.VITE_API_URL}/api/news/${data._id}`, data)
        : await axios.post(`${import.meta.env.VITE_API_URL}/api/news`, data);
      alert("Noticia guardada correctamente.");
      setNews(prevNews => {
        if (data._id) {
          return prevNews.map(item => (item._id === data._id ? response.data : item));
        }
        return [...prevNews, response.data];
      });
    } catch (error) {
      console.error("Error saving news:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Noticias</h1>

      {news.map(item => (
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
            <NewsForm
              onSubmit={handleSubmit}
              initialData={editData || {}} // Pasar datos de edición o un objeto vacío
            />
          )}
        </div>
      ))}

      <button onClick={() => setShowCreateForm(!showCreateForm)}>{showCreateForm ? "Cancelar" : "Nueva noticia"}</button>
      {showCreateForm && (
        <NewsForm
          onSubmit={handleSubmit}
          // initialData={editData || {}} // Pasar datos de edición o un objeto vacío
        />
      )}
    </div>
  );
};

export default NewsPage;