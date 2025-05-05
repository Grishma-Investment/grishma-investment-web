import React, { useEffect, useState } from 'react';
import '../styles/Widget.css'; // Add your styles

const Crypto = () => {
    const [cryptoData, setCryptoData] = useState<any>([]); // Initialize as empty array
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [error, setError] = useState<string | null>(null); // Track error state

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                // Using a valid currency code like 'usd'
                const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1');
                if (!res.ok) throw new Error('Failed to fetch crypto data');
                const data = await res.json();
                setCryptoData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCrypto();
    }, []); // Empty dependency array so it runs once on mount

    if (loading) return <div>Loading...</div>; // Show loading state

    if (error) return <div>Error: {error}</div>; // Show error message

    return (
        <div className="widget-wrapper">
            {cryptoData.length > 0 ? (
                cryptoData.map((crypto: any) => (
                    <div key={crypto.id} className="item">
                        <div className="head">{`${crypto.name} (${crypto.symbol.toUpperCase()})`}</div>
                        <div className="rate">
                            {crypto.current_price ? `${crypto.current_price} USD` : 'Data not available'}
                        </div>
                    </div>
                ))
            ) : (
                <div>No data available</div> // Handle case when there is no data
            )}
        </div>
    );
};

export default Crypto;
