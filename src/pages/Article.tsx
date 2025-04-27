import React, { useState, useEffect } from 'react';
import '../styles/Article.css';
import { useParams } from 'react-router-dom';
import GILogo from '../assets/images/author/gi.png'

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch article data when the component is mounted
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://192.168.1.68:5000/articles/${id}`);
        const data = await response.json();
        if (response.ok) {
          setArticle(data);
        } else {
          setError('Article not found');
        }
      } catch (error) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();

    // Increment the view count when the article is viewed
    const incrementView = async () => {
      try {
        await fetch(`http://192.168.1.68:5000/articles/${id}/views`, {
          method: 'PUT',
        });
      } catch (error) {
        console.error('Failed to increment view count');
      }
    };

    incrementView();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Format the date as "April 24, 2025"
  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='article-wrapper'>
      <div className="title">{article.title}</div>
      <div className="info">
        <div className="author">
          <div className="img">
            <img src={GILogo} alt="Author" />
          </div>
          <div className="name">{'Grishma Investment'}</div>
        </div>
        <div className="date">
          <i className='fa-solid fa-calendar-days'></i> {formattedDate}
        </div>
        <div className="views">
          <i className='fa-solid fa-eye'></i> {article.views + ' ' + 'Views'}
        </div>
      </div>
      <div className="thumbnail">
        <img src={article.thumbnailUrl} alt="Article Thumbnail" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: article.content }} // Render HTML content
      />
      <div className="share-div">
        <div className="left">
          <i className="fa-solid fa-share-nodes"></i>
          <span>SHARE THIS ARTICLE</span>
        </div>
        <div className="right">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=pearlsoftech.com/blog/${id}`} target='_blank' rel="noopener noreferrer">
            <i className='fa-brands fa-facebook'></i>
          </a>
          <a href={`https://wa.me/?text=pearlsoftech.com/blog/${id}`} target='_blank' rel="noopener noreferrer">
            <i className='fa-brands fa-whatsapp'></i>
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=pearlsoftech.com/blog/${id}&title=Optional%20Title&summary=Optional%20Summary&source=Optional%20Source`} target='_blank' rel="noopener noreferrer">
            <i className='fa-brands fa-linkedin'></i>
          </a>
          <a href={`mailto:?subject=Check%20this%20out&body=Check%20out%20this%20Blog%3A%20pearlsoftech.com/blog/${id}`} target='_blank' rel="noopener noreferrer">
            <i className='fa-solid fa-envelope'></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Article;
