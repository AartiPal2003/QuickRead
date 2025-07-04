import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, InputGroup, FormControl, ListGroup, Container, Pagination } from 'react-bootstrap';
import { FaThumbsUp, FaShareAlt, FaBookmark, FaExternalLinkAlt, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import '../styles/style.css';

function NewsFeed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [points, setPoints] = useState(0); // Track points
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 15;

  const categories = ['All', 'Business', 'Technology', 'Health', 'Sports'];

  // Fetch news based on category
  const fetchNewsByCategory = async (category) => {
    setLoading(true);
    try {
      const url = category === 'All'
        ? `http://localhost:5000/api/news`
        : `http://localhost:5000/api/news?category=${category}`;
      
      const response = await axios.get(url);
      const newsWithImages = response.data.filter((news) => news.urlToImage && news.urlToImage.trim() !== '');
      setFilteredNewsData(newsWithImages);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsByCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const savedArticlesFromLocalStorage = JSON.parse(localStorage.getItem('savedArticles')) || [];
    setSavedArticles(savedArticlesFromLocalStorage);

    const savedPoints = Number(localStorage.getItem('points')) || 0;
    setPoints(savedPoints); // Load saved points from localStorage
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filterNews = () => {
    let filteredNews = filteredNewsData;

    if (searchTerm) {
      filteredNews = filteredNews.filter((news) => {
        const title = news.title ? news.title.toLowerCase() : '';
        const description = news.description ? news.description.toLowerCase() : '';
        return title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
      });
    }

    return filteredNews;
  };

  const filteredResults = filterNews();

  const handleSave = (news) => {
    if (!savedArticles.some((article) => article.title === news.title)) {
      const newSavedArticles = [...savedArticles, news];
      setSavedArticles(newSavedArticles);
      localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles));
      alert('Article saved!');
    } else {
      alert('Article is already saved!');
    }
  };

  const handleShare = async (news) => {
    const token = localStorage.getItem('token'); // Check for login token

    if (!token) {
        alert('Please log in to share articles.');
        return;
    }

    const shareData = {
        title: news.title,
        text: news.description,
        url: news.url,
    };

    if (navigator.share) {
        // If Web Share API is supported
        try {
            await navigator.share(shareData);
           
           
        } catch (error) {
            console.error('Error sharing news:', error);
        }
    } else {
        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(news.url);
           
            alert('URL copied to clipboard! Points added.');
        } catch (error) {
            console.error('Error copying URL:', error);
            alert('Failed to copy URL to clipboard.');
        }
    }
};

  

  const handleReadMore = (news) => {
    
    window.open(news.url, '_blank');
  };

  const removeSavedArticle = (index) => {
    const newSavedArticles = [...savedArticles];
    newSavedArticles.splice(index, 1);
    setSavedArticles(newSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles));
  };

  const paginateArticles = (articles) => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return articles.slice(startIndex, endIndex);
  };

  const currentArticles = paginateArticles(filteredResults);

  const totalPages = Math.ceil(filteredResults.length / articlesPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="px-0">
      <Row className="my-4 px-3">
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search News"
              aria-label="Search News"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="my-4 px-3">
        <Col md={3}>
          <h5>Categories</h5>
          <ListGroup>
            {categories.map((category, index) => (
              <ListGroup.Item
                key={index}
                action
                active={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={9}>
          <Row>
            {loading ? (
              <Col>
                <p>Loading news...</p>
              </Col>
            ) : currentArticles.length > 0 ? (
              currentArticles.map((news, index) => (
                <Col key={index} md={4} className="mb-4">
                  <Card className="news-card h-100">
                    <Card.Img variant="top" src={news.urlToImage} alt={news.title} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{news.title}</Card.Title>
                      <Card.Text>{news.description}</Card.Text>
                      <div className="d-flex justify-content-start mt-auto">
                        <Button variant="primary" onClick={() => handleReadMore(news)} className="me-2" size="sm">
                          <FaExternalLinkAlt /> Read More
                        </Button>
                        {/* <Button variant="info" onClick={() => handleSave(news)} className="me-2" size="sm">
                          <FaBookmark />
                        </Button> */}
                        <Button variant="outline-secondary" onClick={() => handleShare(news)} className="btn-share" size="sm">
                          <FaShareAlt /> Share
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>No news found. Please try again later.</Col>
            )}
          </Row>

          <Row className="my-4">
            <Col>
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default NewsFeed;
