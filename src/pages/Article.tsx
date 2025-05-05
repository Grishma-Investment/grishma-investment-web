import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GILogo from '../assets/images/author/gi.png';
import '../styles/Article.css';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState();
  const SERVER_IP = import.meta.env.VITE_SERVER_IP;
  const CLIENT_IP = import.meta.env.VITE_CLIENT_IP;
  let [redirect, setRedirect] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${SERVER_IP}/articles/${id}`);
        const data = await response.json();
        if (response.ok) {
          setArticle(data);
          setCategory(data.category);
          fetchRelatedArticles(data.category); // fetch related after article loaded
        } else {
          setError('Article not found');
        }
      } catch (error) {
        setError('Failed to load article');
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedArticles = async (category: string) => {
      try {
        const response = await fetch(`${SERVER_IP}/articles`);
        const data = await response.json();
        if (response.ok) {
          const filtered = data.filter((item: any) => item._id !== id && item.category === category);
          setRelatedArticles(filtered);
        }
      } catch (error) {
        console.error('Failed to load related articles');
      }
    };

    const incrementView = async () => {
      try {
        await fetch(`${SERVER_IP}/articles/${id}/views`, {
          method: 'PUT',
        });
      } catch (error) {
        console.error('Failed to increment view count');
      }
    };

    fetchArticle();
    incrementView();
  }, [id]);

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return (
    <div className='skeleton-wrapper'>
      <Skeleton height={50} width={"100%"} />
      <div style={{display: "flex", width: "100%", flexDirection:"row", flexWrap: "wrap", gap: "25px", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "center", gap:"10px"}}>
        <Skeleton height={50} width={50} circle={true}  />
        <Skeleton height={25} width={170} />
        </div>
        <Skeleton height={25} width={110} />
        <Skeleton height={25} width={80} />
      </div>
      <Skeleton height={500} width={"100%"} />
      <div>
        {/* Paragraph 1 */}
        <Skeleton height={25} width="100%" />
        <Skeleton height={25} width="100%" />
        <Skeleton height={25} width="80%" />
        <br />

        {/* Paragraph 2 */}
        <Skeleton height={25} width="90%" />
        <Skeleton height={25} width="70%" />
        <Skeleton height={25} width="95%" />
        <br />

        {/* Paragraph 3 */}
        <Skeleton height={25} width="98%" />
        <Skeleton height={25} width="85%" />
        <Skeleton height={25} width="65%" />
        <br />

        {/* Paragraph 4 */}
        <Skeleton height={25} width="88%" />
        <Skeleton height={25} width="75%" />
        <Skeleton height={25} width="82%" />
      </div>

    </div>
  );
  if (error) return (
  <div style={{padding: "50px"}}>{"Error: " + error}</div>
);

  return (
    <div className="article-wrapper">
      <div className="title">{article.title}</div>
      <div className="info">
        <div className="author">
          <div className="img">
            <img src={GILogo} alt="Author" />
          </div>
          <div className="name">Grishma Investment</div>
        </div>
        <div className="date">
          <i className="fa-solid fa-calendar-days"></i> {formatDate(article.createdAt)}
        </div>
        <div className="views">
          <i className="fa-solid fa-eye"></i> {article.views} Views
        </div>
      </div>

      <div className="thumbnail">
        <img src={article.thumbnailUrl} alt="Article Thumbnail" />
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="share-div">
        <div className="left">
          <i className="fa-solid fa-share-nodes"></i>
          <span>SHARE THIS ARTICLE</span>
        </div>
        <div className="right">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${CLIENT_IP}/article/${id}`} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href={`https://wa.me/?text=${CLIENT_IP}/article/${id}`} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${CLIENT_IP}/article/${id}`} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href={`mailto:?subject=Check this out&body=Check out this Article: ${CLIENT_IP}/article/${id}`} target="_blank" rel="noopener noreferrer">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>

      <div className="related-articles">
        <div className="header">RELATED ARTICLES</div>
        <div className="list">
          {relatedArticles.length > 0 ? relatedArticles.map((item) => (
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
            <div className="loading">
              :No articles related to <strong>"{category}"</strong> found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
