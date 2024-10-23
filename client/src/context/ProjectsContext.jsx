import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projects]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  return useContext(ProjectsContext);
};

