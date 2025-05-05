import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import Forex from '../components/Forex';
import Stock from '../components/Stock';
import Weather from '../components/Crypto';
import GoldSilver from '../components/GoldSilver';

import StockIndicesCatImg from '../assets/images/category/stock-and-indices.png';
import ManagementSkillsCatImg from '../assets/images/category/management-and-skills.jpg';
import ResearchAnalysisCatImg from '../assets/images/category/research-and-analysis.jpg';
import InnovationTechCatImg from '../assets/images/category/innovation-and-technology.jpg';
import TradeBusinessCatImg from '../assets/images/category/trade-and-business.jpg';
import ComplianceRegulationsCatImg from '../assets/images/category/compliance-and-regulations.jpg';
import OpinionsImpactCatImg from '../assets/images/category/opinions-and-impact.jpg';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Article = {
    _id: number;
    title: string;
    snippet?: string;
    createdAt: string;
    thumbnailUrl: string;
    category: string;
    views?: number;
};

const Home = () => {
    const [activeSection, setActiveSection] = useState<string>('Forex');
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 600);

    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [currentArticleIndex, setCurrentArticleIndex] = useState<number>(0);

    const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
    const [latestArticles, setLatestArticles] = useState<Article[]>([]);

    const [emailInput, setEmailInput] = useState('');
    const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);
    const [subscribeMessageType, setSubscribeMessageType] = useState<'success' | 'error' | null>(null);
    const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

    let SERVER_IP = import.meta.env.VITE_SERVER_IP;

    const truncateTitle = (title: string, maxLength: number = 200) => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
        return title;
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 600);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const trendingRes = await fetch(`${SERVER_IP}/trending`);
            const latestRes = await fetch(`${SERVER_IP}/latest`);
            const allArticlesRes = await fetch(`${SERVER_IP}/articles`);

            const trendingData = await trendingRes.json();
            const latestData = await latestRes.json();
            const allData = await allArticlesRes.json();

            setTrendingArticles(trendingData);
            setLatestArticles(latestData);
            setAllArticles(allData);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        if (allArticles.length > 0) {
            const interval = setInterval(() => {
                setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % allArticles.length);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [allArticles]);

    const handleTitleClick = (section: string) => {
        setActiveSection(section);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleSubscribe = async () => {
        if (!emailInput) {
            setSubscribeMessage('Please enter your email.');
            setSubscribeMessageType('error');
            return;
        }

        setIsSubscribing(true);
        try {
            const response = await fetch(`${SERVER_IP}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput }),
            });

            const data = await response.json();
            if (response.ok) {
                setSubscribeMessage(data.message || 'Successfully subscribed!');
                setSubscribeMessageType('success');
                setEmailInput('');
            } else {
                setSubscribeMessage(data.message || 'Failed to subscribe.');
                setSubscribeMessageType('error');
            }
        } catch (error) {
            console.error('Subscribe error:', error);
            setSubscribeMessage('Something went wrong.');
            setSubscribeMessageType('error');
        } finally {
            setIsSubscribing(false);
        }
    };

    return (
        <div className='home-wrapper'>
            {/* Row 1 */}
            <div className="row-1">
                {/* Col 1 */}
                <div className="col-1">
                    {/* First Row: Main Changing Article */}
                    <div className='first-row'>
                        {allArticles.length > 0 ? (
                            <a href={`/article/${allArticles[currentArticleIndex]._id}`}>
                                <img src={allArticles[currentArticleIndex].thumbnailUrl} alt={allArticles[currentArticleIndex].title} />
                                <div className="overlay"></div>
                                <div className="content">
                                    <div className="badge">{allArticles[currentArticleIndex].category}</div>
                                    <div className="title">{truncateTitle(allArticles[currentArticleIndex].title, 70)}</div>
                                    <div className="date">
                                        <i className="fa-solid fa-calendar-days"></i> {formatDate(allArticles[currentArticleIndex].createdAt)}
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <div className='hero-skeleton-wrapper'>
                                <Skeleton width={150} height={30} borderRadius={20} />
                                <Skeleton width={"100%"} height={30} />
                                <Skeleton width={90} height={20} />
                            </div>
                        )}
                    </div>

                    {/* Second Row: Forex/Stock/Weather/GoldSilver */}
                    <div className="second-row">
                        <div className="top">
                            <div
                                className={`title ${activeSection === 'Forex' ? 'active' : ''}`}
                                onClick={() => handleTitleClick('Forex')}
                            >
                                <i className="fas fa-dollar-sign"></i> Forex
                            </div>
                            <div
                                className={`title ${activeSection === 'Stock' ? 'active' : ''}`}
                                onClick={() => handleTitleClick('Stock')}
                            >
                                <i className="fas fa-chart-line"></i> {isMobile ? 'Stock' : 'Stock Market'}
                            </div>
                            <div
                                className={`title ${activeSection === 'Weather' ? 'active' : ''}`}
                                onClick={() => handleTitleClick('Weather')}
                            >
                                <i className="fab fa-bitcoin"></i> Crypto
                            </div>
                            <div
                                className={`title ${activeSection === 'GoldSilver' ? 'active' : ''}`}
                                onClick={() => handleTitleClick('GoldSilver')}
                            >
                                <i className="fas fa-coins"></i> {isMobile ? 'G. & S.' : 'Gold & Silver'}
                            </div>
                        </div>


                        <div className="content">
                            {activeSection === 'Forex' && <Forex />}
                            {activeSection === 'Stock' && <Stock />}
                            {activeSection === 'Weather' && <Weather />}
                            {activeSection === 'GoldSilver' && <GoldSilver />}
                        </div>
                    </div>
                </div>

                {/* Col 2 */}
                <div className="col-2">
                    {/* Trending */}
                    <div className="inner-row-1">
                        <div className="header">TRENDING NOW</div>
                        <div className="list">
                            {trendingArticles.length > 0 ? trendingArticles.map((item) => (
                                <a href={`/article/${item._id}`} key={item._id}>
                                    <div className="item">
                                        <div className="item-img">
                                            <img src={item.thumbnailUrl} alt={item.title} />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-title">{truncateTitle(item.title, 30)}</div>
                                            <div className="item-date">
                                                <i className="fa-solid fa-calendar-days"></i> {formatDate(item.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )) :
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                        <Skeleton height={65} width={85} />
                                        <div style={{ width: "100%" }}>
                                            <Skeleton height={20} width={"100%"} />
                                            <Skeleton width={60} height={10} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                        <Skeleton height={65} width={85} />
                                        <div style={{ width: "100%" }}>
                                            <Skeleton height={20} width={"100%"} />
                                            <Skeleton width={60} height={10} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                        <Skeleton height={65} width={85} />
                                        <div style={{ width: "100%" }}>
                                            <Skeleton height={20} width={"100%"} />
                                            <Skeleton width={60} height={10} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Subscribe */}
                    <div className="inner-row-2">
                        <div className="header">SUBSCRIBE</div>
                        <div className="content">
                            <p>Get the latest news delivered to your inbox</p>
                            {subscribeMessage && (
                                <div className={`subscribe-message ${subscribeMessageType}`}>
                                    <i className={`fa ${subscribeMessageType === 'success' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                                    {subscribeMessage}
                                </div>
                            )}
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                            <div className="sub-button" onClick={handleSubscribe}>
                                {isSubscribing ? 'Subscribing...' : 'SUBSCRIBE NOW'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Latest Articles */}
            <div className="row-2">
                <div className="header">LATEST ARTICLES</div>
                <div className="list">
                    {latestArticles.length > 0 ? latestArticles.map((item) => (
                        <a href={`/article/${item._id}`} key={item._id}>
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
                    )) :
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between", width: "100%" }}>
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
                    }
                </div>
            </div>

            {/* Row 3: Categories */}
            <div className="row-3">
                <div className="header">CATEGORIES</div>
                <div className="list">
                    <a href="/articles/stock-and-indices">
                        <div className="item">
                            <img src={StockIndicesCatImg} alt="Stock & Indices" />
                            <div className="type">STOCK & INDICES</div>
                        </div>
                    </a>
                    <a href="/articles/management-and-skills">
                        <div className="item">
                            <img src={ManagementSkillsCatImg} alt="Management & Skills" />
                            <div className="type">MANAGEMENT & SKILLS</div>
                        </div>
                    </a>
                    <a href="/articles/research-and-analysis">
                        <div className="item">
                            <img src={ResearchAnalysisCatImg} alt="Research & Analysis" />
                            <div className="type">RESEARCH & ANALYSIS</div>
                        </div>
                    </a>
                    <a href="/articles/innovation-and-technology">
                        <div className="item">
                            <img src={InnovationTechCatImg} alt="Innovation & Technology" />
                            <div className="type">INNOVATION & TECHNOLOGY</div>
                        </div>
                    </a>
                    <a href="/articles/trade-and-business">
                        <div className="item">
                            <img src={TradeBusinessCatImg} alt="Trade & Business" />
                            <div className="type">TRADE & BUSINESS</div>
                        </div>
                    </a>
                    <a href="/articles/compliance-and-regulations">
                        <div className="item">
                            <img src={ComplianceRegulationsCatImg} alt="Compliance & Regulations" />
                            <div className="type">COMPLIANCE & REGULATIONS</div>
                        </div>
                    </a>
                    <a href="/articles/opinions-and-impact">
                        <div className="item">
                            <img src={OpinionsImpactCatImg} alt="Opinions & Impact" />
                            <div className="type">OPINIONS & IMPACT</div>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Home;
