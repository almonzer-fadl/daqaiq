"use client"; // Ensures this component is treated as a Client Component

import React from 'react'; // Import React library

const Hero = () => { // Define the Hero functional component
    return (
        <div className="hero-container"> 
        
            {/* Main container with flexbox layout */}
            <div className="hero-image"> 
                {/* Image container with flex property */}
                <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1725809087109x403311892363749950%2Fabout_320_220.png?w=384&amp;h=216&amp;auto=compress&amp;dpr=1.25&amp;fit=max" alt="Hero" />
                {/* Hero image */}
            </div>
            <div className="hero-text-container">
                {/* Text container with flex property */}
                <h1>دقائق دقه في دقائق</h1>
                {/* Main heading */}
                <div>
                    <p>نقدم خدمات فحص وصيانة السيارات بسرعة ودقة،<br></br> باستخدام أحدث التقنيات وفريق متخصص لضمان أفضل أداء لسيارتك. دقة في دقائق – لأن وقتك ثمين!</p>
                    {/* Paragraph text */}
                </div>
                <div className="hero-buttons">
                    {/* Buttons container with flexbox layout */}
                    <button className="primary-button"> تست</button>
                    {/* Primary button */}
                    <button className="secondary-button">نست</button> 
                    {/* Secondary button */}
                </div>
            </div>
            <style jsx>{`
                .hero-container {
                    display: flex; // Use flexbox layout
                    align-items: center; // Center items vertically
                    margin: 80px 0; // Add vertical margin
                    z-index: 4; // Set stacking order
                    flex-direction: row; // Arrange items in a row
                }
                .hero-image {
                    flex: 1; // Allow image container to take up one part of the available space
                    margin-right: 20px; // Add right margin
                    z-index: 10; // Set stacking order
                }
                .hero-image img {
                    width: 100%; // Make image take up full width of container
                    height: auto; // Maintain aspect ratio
                }
                .hero-text-container {
                    flex: 2; // Allow text container to take up two parts of the available space
                    z-index: 5; // Set stacking order
                    text-align: center; // Center text
                }
                .hero-text-container h1 {
                    font-family: Cairo; // Set font family
                    font-size: 24px; // Set font size
                    color: #252525; // Set text color
                    margin: 30px 0; // Add vertical margin
                }
                .hero-text-container p {
                    font-family: Cairo; // Set font family
                    font-size: 14px; // Set font size
                    color: #252525; // Set text color
                    margin: 30px 0; // Add vertical margin
                }
                .hero-buttons {
                    display: flex; // Use flexbox layout
                    justify-content: center; // Center buttons horizontally
                    z-index: 6; // Set stacking order
                }
                .primary-button {
                    background-color: #FF9030; // Set background color
                    font-family: Cairo; // Set font family
                    font-size: 14px; // Set font size
                    font-weight: bold; // Set font weight
                    color: #FFF; // Set text color
                    margin: 0 10px; // Add horizontal margin
                    border-radius: 5px; // Round corners
                    cursor: pointer; // Change cursor on hover
                }
                .secondary-button {
                    background-color: #FFF; // Set background color
                    font-family: Cairo; // Set font family
                    font-size: 14px; // Set font size
                    font-weight: bold; // Set font weight
                    color: #FF5A27; // Set text color
                    margin: 0 10px; // Add horizontal margin
                    border: 2px solid #FF5A27; // Set border color and width
                    border-radius: 5px; // Round corners
                    cursor: pointer; // Change cursor on hover
                }
                @media (max-width: 768px) {
                    .hero-container {
                        flex-direction: column; // Arrange items in a column
                        align-items: center; // Center items horizontally
                    }
                    .hero-image {
                        margin-right: 0; // Remove right margin
                        margin-bottom: 20px; // Add bottom margin
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero; // Export the Hero component