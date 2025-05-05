import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMarketsDropdown, setShowMarketsDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showResearchDropdown, setShowResearchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleHamburgerClick = () => {
    setShowMobileMenu(prev => !prev);
  };

  const handleLinkClick = () => {
    setShowMobileMenu(false);
    setShowMarketsDropdown(false);
    setShowBusinessDropdown(false);
    setShowResearchDropdown(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    handleLinkClick();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='nav-wrapper'>
      <div className="first-row">
        <div className="logo">
          <a href="/">GRISHMA INVESTMENT</a>
        </div>

        <div className="hamburger" onClick={handleHamburgerClick}>
          {showMobileMenu ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search for Article"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="button" onClick={handleSearch}>
            <i className='fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
      </div>

      <div className='links-sec'>
        <a href="/articles/stock-and-indices" onClick={handleLinkClick}>
          Stock & Indices
        </a>
        <a href="/articles/trade-and-business" onClick={handleLinkClick}>
          Trade & Business
        </a>
        <a href="/articles/management-and-skills" onClick={handleLinkClick}>
          Management & Skills
        </a>
        <a href="/articles/innovation-and-technology" onClick={handleLinkClick}>
          Innovation & Technology
        </a>
        <a href="/articles/research-and-analysis" onClick={handleLinkClick}>
          Research & Analysis
        </a>
        <a href="/articles/compliance-and-regulations" onClick={handleLinkClick}>
          Compliance & Regulations
        </a>
        <a href="/articles/opinions-and-impact" onClick={handleLinkClick}>
          Opinions & Impact
        </a>

      </div>

      {showMobileMenu && (
        <div className="second-row">
          <div className="links">
            <div className="search">
              <input
                type="text"
                placeholder="Search for Article"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <div className="button" onClick={handleSearch}>
                <i className='fa-solid fa-magnifying-glass'></i>
              </div>
            </div>

            <a href="/articles/stock-and-indices" onClick={handleLinkClick}>
              <i className="fas fa-chart-line"></i> Stock & Indices
            </a>
            <a href="/articles/trade-and-business" onClick={handleLinkClick}>
              <i className="fas fa-briefcase"></i> Trade & Business
            </a>
            <a href="/articles/management-and-skills" onClick={handleLinkClick}>
              <i className="fas fa-tasks"></i> Management & Skills
            </a>
            <a href="/articles/innovation-and-technology" onClick={handleLinkClick}>
              <i className="fas fa-lightbulb"></i> Innovation & Technology
            </a>
            <a href="/articles/research-and-analysis" onClick={handleLinkClick}>
              <i className="fas fa-search"></i> Research & Analysis
            </a>
            <a href="/articles/compliance-and-regulations" onClick={handleLinkClick}>
              <i className="fas fa-balance-scale"></i> Compliance & Regulations
            </a>
            <a href="/articles/opinions-and-impact" onClick={handleLinkClick}>
              <i className="fas fa-comment-dots"></i> Opinions & Impact
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
