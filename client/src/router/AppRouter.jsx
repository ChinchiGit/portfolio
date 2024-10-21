import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import NewsPage from '../pages/NewsPage';
import ProjectsPage from '../pages/ProjectsPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;