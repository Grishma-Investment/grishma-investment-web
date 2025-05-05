import React, { useEffect, useState } from 'react';
import '../styles/Widget.css'; // Add your styles

const Nepse = () => {
    const [stockData, setStockData] = useState<any>([]); // Initialize as empty array
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [error, setError] = useState<string | null>(null); // Track error state

    useEffect(() => {
      const fetchStockData = async () => {
        try {
            const res = await fetch('/api/info');
            if (!res.ok) throw new Error('Failed to fetch stock data');
            
            const text = await res.text(); // Get the raw response as text
            console.log(text); // Log the raw response to see if it's HTML
    
            const data = JSON.parse(text); // Parse it manually if it's valid JSON
            setStockData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

        fetchStockData();
    }, []); // Empty dependency array so it runs once on mount

    if (loading) return <div>Loading...</div>; // Show loading state

    if (error) return <div>Error: {error}</div>; // Show error message

    return (
        <div className="widget-wrapper">
            {stockData && stockData.length > 0 ? (
                stockData.map((stock: any) => (
                    <div key={stock.symbol} className="item">
                        <div className="head">{`${stock.name} (${stock.symbol})`}</div>
                        <div className="rate">
                            {stock.close_price ? `${stock.close_price} NPR` : 'Data not available'}
                        </div>
                    </div>
                ))
            ) : (
                <div>No data available</div> // Handle case when there is no data
            )}
        </div>
    );
};

export default Nepse;
