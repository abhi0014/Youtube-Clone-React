import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Search.css'; // Make sure your CSS file is correctly imported
import { API_KEY } from '../../data';

const SearchResults = () => {
  const { query } = useParams(); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true); 
        setError(null); 

        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&channelType=any&maxResults=50&key=${API_KEY}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error.message || 'Error fetching search results');
          setResults([]);
        } else if (data.items && Array.isArray(data.items)) {
          setResults(data.items);
        } else {
          setResults([]); 
        }
      } catch (error) {
        setError('Error fetching search results');
      } finally {
        setLoading(false); 
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="search-page-container">
      <h2 className="search-results-header">Search Results for: {query}</h2>
      <div className="search-results-container">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} className="search-result-item">
              <Link to={`/video/${item.snippet.categoryId || 'default'}/${item.id.videoId}`} className="search-result-link">
                <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className="search-result-thumbnail" />
              </Link>
              <div className="search-result-info">
                <Link to={`/video/${item.snippet.categoryId || 'default'}/${item.id.videoId}`} className="search-result-title">
                  {item.snippet.title}
                </Link>
                <p className="search-result-description">{item.snippet.description}</p>
                <div className="search-result-meta">
                  {item.snippet.channelTitle} • {new Date(item.snippet.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
