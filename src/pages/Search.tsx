import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Category.css';

// Assume your article type
interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  thumbnailUrl: string;
}

// Example helper functions
const truncateTitle = (title: string, length: number) => {
  return title.length > length ? title.substring(0, length) + '...' : title;
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const cleanQuery = (rawQuery: string) => {
  // Split the query into words, convert to lowercase for case-insensitive comparison
  return rawQuery.toLowerCase().split(/\s+/); // Split by spaces
};

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rawQuery = queryParams.get('q') || '';
  const query = rawQuery.toLowerCase();
  let SERVER_IP =import.meta.env.VITE_SERVER_IP;

  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`${SERVER_IP}/articles`); // example API
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (query && articles.length > 0) {
      const cleanedWords = cleanQuery(query);

      const filtered = articles.filter(article => {
        const content = (article.title + ' ' + article.content).toLowerCase();
        const contentWords = content.split(/\W+/); // Split on non-word characters (like spaces)

        // Check if all query words are in the content as whole words
        return cleanedWords.every(word => contentWords.includes(word));
      });

      setFilteredArticles(filtered);
    }
  }, [query, articles]);

  return (
    <div className='category-wrapper'>
      <div className="header">
        SEARCH RESULT FOR "{rawQuery}" {filteredArticles.length > 0 && `(${filteredArticles.length} results)`}
      </div>

      <div className="list">
        {filteredArticles.length > 0 ? filteredArticles.map((item) => (
          <a href={`/article/${item._id}`} key={item._id} className="item-link">
            <div className="item">
              <div className="item-img">
                <img src={item.thumbnailUrl} alt={item.title} />
              </div>
              <div className="item-info">
                <div className="item-badge">{item.category}</div>
                <div className="item-title">{truncateTitle(item.title, 50)}</div>
                <div className="item-date">
                  <i className="fa-solid fa-calendar-days"></i> {formatDate(item.createdAt)}
                </div>
              </div>
            </div>
          </a>
        )) : (
          <div className="loading">:No articles related to your search <strong>"{rawQuery}"</strong> found.</div>
        )}
      </div>
    </div>
  );
};

export default Search;
