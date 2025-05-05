import React, { useEffect, useState } from 'react';
import '../styles/Widget.css';

const GoldSilver = () => {
  const [rates, setRates] = useState<{
    fineGold: string,
    tejabiGold: string,
    silver: string
  } | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/fenegosida/');
        const html = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Get the fine gold, tejabi gold, and silver rate elements
        const fineGoldRateElem = doc.querySelector('.rate-gold b');
        const tejabiGoldRateElem = doc.querySelector('.rate-gold + .rate-gold b');
        const silverRateElem = doc.querySelector('.rate-silver b');

        // Extract the values or set them as 'N/A' if not found
        const fineGoldRate = fineGoldRateElem?.textContent?.trim() || 'N/A';
        const tejabiGoldRate = tejabiGoldRateElem?.textContent?.trim() || 'N/A';
        const silverRate = silverRateElem?.textContent?.trim() || 'N/A';

        setRates({ fineGold: fineGoldRate, tejabiGold: tejabiGoldRate, silver: silverRate });
      } catch (error) {
        console.error('Error fetching rates:', error);
        setRates({ fineGold: 'Error', tejabiGold: 'Error', silver: 'Error' });
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="widget-wrapper">
      <div className="item">
        <div className="head">Fine Gold (per 1 Tola)</div>
        <div className="rate">
          {rates ? <span>{"NRS " + rates.fineGold}</span> : <span>Loading...</span>}
        </div>
      </div>
      <div className="item">
        <div className="head">Tejabi Gold (per 1 Tola)</div>
        <div className="rate">
          {rates ? <span>{"NRS " + rates.tejabiGold}</span> : <span>Loading...</span>}
        </div>
      </div>
      <div className="item">
        <div className="head">Silver (per 1 Tola)</div>
        <div className="rate">
          {rates ? <span>{"NRS " + rates.silver}</span> : <span>Loading...</span>}
        </div>
      </div>
    </div>
  );
};

export default GoldSilver;
