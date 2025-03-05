"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "/images/120riyaloffer.jpg",
        "/images/320riyaloffer.jpg",
        "/images/120riyalOffer2.jpg",
        // Add more image URLs here
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-container">                                                        
            <div className="hero-image">
                {slides.map((slide, index) => (
                    <Image
                        key={index}
                        src={slide}
                        alt={`Hero ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        style={{
                            opacity: index === currentSlide ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out'
                        }}
                    />
                ))}
            </div>
            <div className="hero-text-container">
                <h1>دقائق دقه في دقائق</h1>
                <p>نقدم خدمات فحص وصيانة السيارات بسرعة ودقة، باستخدام أحدث التقنيات وفريق متخصص لضمان أفضل أداء لسيارتك. دقة في دقائق – لأن وقتك ثمين!</p>
                <div className="hero-buttons">
                    <button className="primary-button"><Link href="/contact">تواصل معنا</Link></button>
                    <button className="secondary-button"><Link href="/prices">الأسعار</Link></button>
                </div>
            </div>
            <style jsx>{`
                .hero-container {
                    display: flex;
                    align-items: center;
                    margin: 40px 0;
                    z-index: 4;
                    flex-direction: row;
                    height: 400px;
                    overflow: hidden;
                }
                .hero-image {
                    flex: 1;
                    margin-right: 20px;
                    margin-left: 20px;
                    z-index: 10;
                    position: relative;
                    height: 100%;
                }
                .hero-text-container {
                    flex: 2;
                    z-index: 5;
                    text-align: center;
                    padding: 20px;
                }
                .hero-text-container h1 {
                    font-family: Cairo;
                    font-size: 24px;
                    color: #252525;
                    margin: 15px 0;
                }
                .hero-text-container p {
                    font-family: Cairo;
                    font-size: 14px;
                    color: #252525;
                    margin: 15px 0;
                }
                .hero-buttons {
                    display: flex;
                    justify-content: center;
                    z-index: 6;
                    margin-top: 15px;
                }
                .primary-button, .secondary-button {
                    font-family: Cairo;
                    font-size: 16px;
                    font-weight: bold;
                    margin: 0 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    padding: 10px 20px;
                    transition: all 0.3s ease;
                }
                .primary-button {
                    background-color: #FF9030;
                    color: #FFF;
                    border: none;
                }
                .primary-button:hover {
                    background-color: #FF7A00;
                    transform: translateY(-2px);
                }
                .secondary-button {
                    background-color: #FFF;
                    color: #FF5A27;
                    border: 2px solid #FF5A27;
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
                        margin-top: 60px;
                        margin-left: 0px;
                        height: auto;
                    }
                    .hero-image {
                        margin-right: 0;
                        margin-bottom: 20px;
                        height: 200px;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero;