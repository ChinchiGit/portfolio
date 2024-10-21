import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import NewsPage from '../pages/NewsPage';
import ProjectsPage from '../pages/ProjectsPage';

const AppRouter = () => {
  const { user } = useAuth();
  console.log("comprobando user desde router: ", user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      {user ? (
        <>
          <Route path="/news" element={<NewsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </>
      ) : null}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
