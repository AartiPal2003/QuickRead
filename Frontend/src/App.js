import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext'; // Import UserProvider
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import NewsFeed from './components/NewsFeed';
import NewsCard from './components/NewsCard';
import ResetPasswordPage from './components/ResetPasswordPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news');
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  // const userId = "your-logged-in-user-id"; // Replace with actual user ID from context/auth

  return (
    <UserProvider>
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<NewsFeed news={news} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

           
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
