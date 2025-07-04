import React from 'react';
import '../styles/style.css'; // Adjust the path based on your file structure


// const NewsCard = ({ article }) => {
//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card h-100">
//         <img
//           className="card-img-top"
//           src={article.urlToImage || "https://via.placeholder.com/150"}
//           alt="News"
//           style={{ height: '150px', objectFit: 'cover' }}
//         />
//         <div className="card-body">
//           <h5 className="card-title">{article.title}</h5>
//           <p
//             className="card-text"
//             style={{
//               maxHeight: '60px',
//               overflow: 'hidden',
//               textOverflow: 'ellipsis',
//               whiteSpace: 'nowrap',
//             }}
//           >
//             {article.description}
//           </p>
//           <a
//             href={article.url}
//             className="btn btn-primary"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read More
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

function NewsCard({ title, description, onRead, onShare }) {
  return (
    <div className="card news-card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button className="read-btn" onClick={onRead} >
          Read More
        </button>
        <button className="share-btn" onClick={onShare}>
          Share
        </button>
       
      </div>
    </div>
  );
}


export default NewsCard;
