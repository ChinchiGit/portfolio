import React from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, googleSignIn, logout } = useAuth(); // Obtiene las funciones del contexto
  const navigate = useNavigate(); // Inicializa useNavigate


  const handleLogin = async () => {
    try {
        await googleSignIn();
      } catch (error) {
        console.log(error);
      }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Llama a la función logout
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToNews = () => {
    navigate('/news'); // Redirige a la página de noticias
  };

  const handleNavigateToProjects = () => {
    navigate('/projects'); // Redirige a la página de proyectos
  };

  return (
    <div>
      <h1>Login</h1>
      {!user ? (
        <button onClick={handleLogin}>Iniciar Sesión</button> 
      ) : (
        <>
          <button onClick={handleLogout}>Cerrar Sesión</button> 
          <button onClick={handleNavigateToNews}>Ir a Noticias</button> 
          <button onClick={handleNavigateToProjects}>Ir a Proyectos</button> 
        </>
      )}
    </div>
  );
};

export default LoginPage;
