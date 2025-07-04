const express = require('express');
const { getNews } = require('../controllers/newsController');
const router = express.Router();



// Route to get news articles
router.get('/', getNews);

module.exports = router;
