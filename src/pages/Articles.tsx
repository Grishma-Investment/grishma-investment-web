import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Category.css';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Articles: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  let SERVER_IP = import.meta.env.VITE_SERVER_IP;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${SERVER_IP}/articles`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();

        const urlCategory = decodeURIComponent(category || '').toLowerCase();

        const slugify = (text: string) => {
          return text
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        };

        const filteredArticles = data.filter((article: any) => {
          const articleSlug = slugify(article.category);
          return articleSlug === urlCategory;
        });

        setArticles(filteredArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [category]);

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCategory = (text: string) => {
    const smallWords = ['and', 'or', 'the', 'of', 'in', 'on', 'at', 'to', 'with', 'a', 'an', 'for'];
    return text
      .replace(/-/g, ' ')
      .split(' ')
      .map((word, index) => {
        if (index === 0 || !smallWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word.toLowerCase();
        }
      })
      .join(' ');
  };

  return (
    <div className='category-wrapper'>
      <h1 className="header">
        {category ? formatCategory(category) : 'Articles'}
      </h1>
      <div className="list">
        {
          loading ?
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between" }}>
              <div style={{ width: "330px", display: "flex", flexDirection: "column", gap: "5px", border: "0.1px solid #e4e5ed", padding: "15px", borderRadius: "8px" }}>
                <Skeleton height={200} width={"100%"} />
                <Skeleton height={25} width={90} borderRadius={20} />
                <Skeleton height={20} width={"100%"} />
                <Skeleton height={15} width={60} />
              </div>
              <div style={{ width: "330px", display: "flex", flexDirection: "column", gap: "5px", border: "0.1px solid #e4e5ed", padding: "15px", borderRadius: "8px" }}>
                <Skeleton height={200} width={"100%"} />
                <Skeleton height={25} width={90} borderRadius={20} />
                <Skeleton height={20} width={"100%"} />
                <Skeleton height={15} width={60} />
              </div>
              <div style={{ width: "330px", display: "flex", flexDirection: "column", gap: "5px", border: "0.1px solid #e4e5ed", padding: "15px", borderRadius: "8px" }}>
                <Skeleton height={200} width={"100%"} />
                <Skeleton height={25} width={90} borderRadius={20} />
                <Skeleton height={20} width={"100%"} />
                <Skeleton height={15} width={60} />
              </div>
              <div style={{ width: "330px", display: "flex", flexDirection: "column", gap: "5px", border: "0.1px solid #e4e5ed", padding: "15px", borderRadius: "8px" }}>
                <Skeleton height={200} width={"100%"} />
                <Skeleton height={25} width={90} borderRadius={20} />
                <Skeleton height={20} width={"100%"} />
                <Skeleton height={15} width={60} />
              </div>
            </div>
            :
            <>
              {articles.length > 0 ? articles.map((item) => (
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
                  :No articles related to <strong>"{category ? formatCategory(category) : ''}"</strong> found.
                </div>
              )}
            </>
        }
      </div>
    </div>
  );
};

export default Articles;
