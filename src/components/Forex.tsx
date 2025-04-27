import React, { useEffect, useState } from 'react'
import '../styles/Forex.css'

const Forex = () => {
    let [rates, SetRates] = useState(null)
    useEffect(() => {
        const fetchForex = async () => {
            let res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            let data = await res.json();
            SetRates(data.rates);
        }

        fetchForex();
    }, [])
    return (
        <div className="forex-wrapper">
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
                            {(rates.NPR/rates.INR).toFixed(4)}
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
                            {(rates.NPR/rates.AUD).toFixed(4)}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Forex;