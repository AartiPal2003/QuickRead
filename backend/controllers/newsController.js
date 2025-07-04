const axios = require('axios');

exports.getNews = async (req, res) => {
  const { page = 1, pageSize = 100, category = 'general' } = req.query; // Add category with a default value
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us',
        page,
        pageSize,
        category, // Pass the category to the API
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    // Filter articles to include only those with images
    const articlesWithImages = response.data.articles.filter(
      (article) => article.urlToImage
    );

    res.json(articlesWithImages);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};
