import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { NewsProvider } from './context/NewsContext'
import { ProjectsProvider } from './context/ProjectsContext'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NewsProvider>
          <ProjectsProvider>
            <App />
          </ProjectsProvider>
        </NewsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)
