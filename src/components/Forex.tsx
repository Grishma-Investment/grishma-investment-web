import React, { useEffect, useState } from 'react';
import '../styles/Widget.css';

const Forex = () => {
    let [rates, SetRates] = useState(null);

    useEffect(() => {
        const fetchForex = async () => {
            let res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            let data = await res.json();
            SetRates(data.rates);
        };

        fetchForex();
    }, []);

    return (
        <div className="widget-wrapper">
            <div className="item">
                <div className='head'>USD/NPR</div>
                <div className='rate'>
                    {
                        rates &&
                        <div>
                            {rates.NPR}
                        </div>
                    }
                </div>
            </div>
            <div className="item">
                <div className='head'>INR/NPR</div>
                <div className='rate'>
                    {
                        rates &&
                        <div>
                            {(rates.NPR / rates.INR).toFixed(4)}
                        </div>
                    }
                </div>
            </div>
            <div className="item">
                <div className='head'>AUD/NPR</div>
                <div className='rate'>
                    {
                        rates &&
                        <div>
                            {(rates.NPR / rates.AUD).toFixed(4)}
                        </div>
                    }
                </div>
            </div>
            {/* Added sections for more countries */}
            <div className="item">
                <div className='head'>GBP/NPR</div>
                <div className='rate'>
                    {
                        rates &&
                        <div>
                            {(rates.NPR / rates.GBP).toFixed(4)}
                        </div>
                    }
                </div>
            </div>
            <div className="item">
                <div className='head'>JPY/NPR</div>
                <div className='rate'>
                    {
                        rates &&
                        <div>
                            {(rates.NPR / rates.JPY).toFixed(4)}
                        </div>
                    }
                </div>
            </div>
            <div className="item">
                <div className='head'>CAD/NPR</div>
                <div className='rate'>
                    {
                        rates &&
                        <div>
                            {(rates.NPR / rates.CAD).toFixed(4)}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Forex;
