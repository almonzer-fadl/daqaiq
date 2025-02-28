"use client"; // Ensures this component is treated as a Client Component

import React from 'react'; // Import React library
import Link from 'next/link'; // Import Link component from Next.js

const Hero = () => { // Define the Hero functional component
    return (
        <div className="hero-container"> 
            <div className="hero-image"> 
                <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1725809087109x403311892363749950%2Fabout_320_220.png?w=384&amp;h=216&amp;auto=compress&amp;dpr=1.25&amp;fit=max" alt="Hero" />
            </div>
            <div className="hero-text-container">
                <h1>دقائق دقه في دقائق</h1>
                <div>
                    <p>نقدم خدمات فحص وصيانة السيارات بسرعة ودقة،<br></br> باستخدام أحدث التقنيات وفريق متخصص لضمان أفضل أداء لسيارتك. دقة في دقائق – لأن وقتك ثمين!</p>
                </div>
                <div className="hero-buttons">
                    <button className="primary-button"><Link href="/contact">تواصل معنا</Link></button>
                    <button className="secondary-button"><Link href="/prices">الأسعار</Link></button> 
                </div>
            </div>
            <style jsx>{`
                .hero-container {
                    display: flex;
                    align-items: center;
                    margin: 80px 0;
                    z-index: 4;
                    flex-direction: row;
                }
                .hero-image {
                    flex: 1;
                    margin-right: 20px;
                    margin-left: 20px;
                    z-index: 10;
                }
                .hero-image img {
                    width: 100%;
                    height: auto;
                }
                .hero-text-container {
                    flex: 2;
                    z-index: 5;
                    text-align: center;
                }
                .hero-text-container h1 {
                    font-family: Cairo;
                    font-size: 24px;
                    color: #252525;
                    margin: 30px 0;
                }
                .hero-text-container p {
                    font-family: Cairo;
                    font-size: 14px;
                    color: #252525;
                    margin: 30px 0;
                }
                .hero-buttons {
                    display: flex;
                    justify-content: center;
                    z-index: 6;
                }
                .primary-button {
                    background-color: #FF9030;
                    font-family: Cairo;
                    font-size: 16px;
                    font-weight: bold;
                    color: #FFF;
                    margin: 0 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    padding: 12px 24px;
                    transition: all 0.3s ease;
                    border: none;
                }
                .primary-button:hover {
                    background-color: #FF7A00;
                    transform: translateY(-2px);
                }
                .secondary-button {
                    background-color: #FFF;
                    font-family: Cairo;
                    font-size: 16px;
                    font-weight: bold;
                    color: #FF5A27;
                    margin: 0 10px;
                    border: 2px solid #FF5A27;
                    border-radius: 5px;
                    cursor: pointer;
                    padding: 12px 24px;
                    transition: all 0.3s ease;
                }
                .secondary-button:hover {
                    background-color: #FF5A27;
                    color: #FFF;
                    transform: translateY(-2px);
                }
                .primary-button a, .secondary-button a {
                    text-decoration: none;
                    color: inherit;
                    display: block;
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .hero-container {
                        flex-direction: column;
                        align-items: center;
                        margin-top: 120px;
                        margin-left: 0px;
                    }
                    .hero-image {
                        margin-right: 0;
                        margin-bottom: 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero; // Export the Hero component