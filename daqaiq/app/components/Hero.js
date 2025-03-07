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
                <div className="slider-container">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="slide"
                            style={{
                                transform: `translateX(${(index - currentSlide) * 100}%)`,
                            }}
                        >
                            <Image
                                src={slide}
                                alt={`Hero ${index + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
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
                    z-index: 4;
                    flex-direction: row-reverse;
                    height: 400px;
                    overflow: hidden;
                    margin-top: 100px;
                    margin-bottom: 2rem;
                    padding-bottom: 0;
                    background-image: url('/images/herobg.jpg');
                }
                .hero-image {
                    flex: 1;
                    margin-right: 20px;
                    margin-left: 20px;
                    z-index: 10;
                    position: relative;
                    height: 100%;
                    width: 50%; // Set width to 50% of the container
                    overflow: hidden;
                }
                .slider-container {
                    display: flex;
                    height: 100%;
                    width: 100%;
                    position: relative;
                }
                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.5s ease-in-out;
                }
                .hero-text-container {
                    flex: 1;
                    z-index: 5;
                    text-align: center;
                    padding: 20px;
                }
                .hero-text-container h1 {
                    font-family: Cairo;
                    font-size: 24px;
                    color: white;
                    margin: 15px 0;
                }
                .hero-text-container p {
                    font-family: Cairo;
                    font-size: 14px;
                    color: white;
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
                        height: 60vh; // Set to 60% of the viewport height
                        width: 100vw;
                        margin-top: 90px;
                        margin-bottom: 2rem;
                        padding-bottom: 0;
                    }
                    .hero-image {
                        margin: 0;
                        width: 100%; // Fill the width
                        height: 100%; // Fill the height
                        overflow: hidden;
                        position: relative;
                    }
                    .slider-container {
                        width: 100%; 
                        height: 90%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .slide {
                        position: absolute;
                        top: 5%;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .slide img {
                        object-fit: contain;
                        width: 100%;
                        height: 100%;
                    }
                    .hero-text-container {
                        display: none; // Hide text on mobile
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero;