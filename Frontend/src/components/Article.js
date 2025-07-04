import React, { useContext } from 'react';
import { UserContext } from './UserProvider';

const Article = ({ article }) => {
  const { addPoints } = useContext(UserContext);

  const handleRead = () => {
    addPoints(5); // Add 5 points for reading
  };

  const handleShare = () => {
    addPoints(10); // Add 10 points for sharing
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <button onClick={handleRead} style={{ marginRight: '10px', background: 'blue', color: 'white', border: 'none', padding: '5px' }}>
        Mark as Read
      </button>
      <button onClick={handleShare} style={{ background: 'green', color: 'white', border: 'none', padding: '5px' }}>
        Share
      </button>
    </div>
  );
};

export default Article;
