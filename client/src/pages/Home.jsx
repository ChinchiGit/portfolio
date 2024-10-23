import React from "react";
import { useNews } from '../context/NewsContext';
import { useProjects } from '../context/ProjectsContext';

const Home = () => {
  const { news, loading: loadingNews } = useNews();
  const { projects, loading: loadingProjects } = useProjects();

  if (loadingNews || loadingProjects) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>News</h2>
      <ul>
        {news.map(item => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
      <h2>Projects</h2>
      <ul>
        {projects.map(item => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
