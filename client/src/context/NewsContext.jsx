import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news`);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [news]);

  return (
    <NewsContext.Provider value={{ news, setNews, loading }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  return useContext(NewsContext);
};
