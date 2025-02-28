"use client";
import React from 'react';
import Image from 'next/image';
import herolower from '@/public/herolower.jpg'; // Correctly import the image

const LowerHero = () => {
    return (
        <div>
            <div className="top-banner"></div>
            <div className="container">
                <div className="image-container">
                    <Image 
                        src={herolower} // Use the imported image
                        alt="Inspection Technology"
                        layout="responsive" // Use responsive layout
                        objectFit="cover" // Use cover for object fit
                        width={500} // Increased width
                        height={520} // Increased height
                        quality={100} // Added for better image quality
                        priority // Added to load image with priority
                    />
                </div>
                <div className="text-container">
                    <div className="text-block">
                        <h3>تقنية الفحص:</h3>
                        <p>لوريم إيبسوم دولار سيت أميت, كونسيكتيتور أديباسكينج أليت, سيد دو أيوسمود تيمبور أنكايديد يونت لابوري ات دولار ماجنا أليكيوا. يوت انيم أد مينيم فينايم, كيواس نوستريد أكسير سيتاشن يللامكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات.</p>
                    </div>
                    <div className="text-block">
                        <h3>مهندسون ذوو خبرة:</h3>
                        <p>لوريم إيبسوم دولار سيت أميت, كونسيكتيتور أديباسكينج أليت, سيد دو أيوسمود تيمبور أنكايديد يونت لابوري ات دولار ماجنا أليكيوا. يوت انيم أد مينيم فينايم, كيواس نوستريد أكسير سيتاشن يللامكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات.</p>
                    </div>
                    <div className="text-block">
                        <h3>أجهزة الفحص:</h3>
                        <p>لوريم إيبسوم دولار سيت أميت, كونسيكتيتور أديباسكينج أليت, سيد دو أيوسمود تيمبور أنكايديد يونت لابوري ات دولار ماجنا أليكيوا. يوت انيم أد مينيم فينايم, كيواس نوستريد أكسير سيتاشن يللامكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات.</p>
                    </div>
                    <div className="text-block">
                        <h3>تقرير شامل:</h3>
                        <p>لوريم إيبسوم دولار سيت أميت, كونسيكتيتور أديباسكينج أليت, سيد دو أيوسمود تيمبور أنكايديد يونت لابوري ات دولار ماجنا أليكيوا. يوت انيم أد مينيم فينايم, كيواس نوستريد أكسير سيتاشن يللامكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات.</p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .top-banner {
                    background-color: rgb(255, 90, 39);
                    box-shadow: rgb(170, 170, 170) 2px 2px 4px 0px;
                    overflow: visible;
                    justify-content: center;
                    border-radius: 5px;
                    opacity: 1;
                    align-self: center;
                    min-width: 300px;
                    max-width: 300px;
                    order: 2;
                    min-height: 10px;
                    max-height: 10px;
                    height: 10px;
                    flex-grow: 1;
                    width: 300px;
                    margin: 0 auto 20px; /* Center the div and add margin */
                    z-index: 6;
                }
                .container {
                    display: flex;
                    flex-direction: row-reverse; // Changed to row-reverse to put image on right
                    justify-content: space-between;
                    align-items: center;
                    margin: 0 auto 50px;
                    max-width: 1200px;
                    width: 100%;
                    padding: 0 20px;
                }
                .text-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: 498px;
                    padding: 0 20px;
                }
                .text-block {
                    margin-bottom: 30px;
                }
                .text-block h3 {
                    font-family: Cairo;
                    font-size: 18px;
                    font-weight: bold;
                    color: rgb(37, 37, 37);
                    text-align: right;
                    letter-spacing: 1px;
                    line-height: 1;
                    margin-bottom: 10px;
                }
                .text-block p {
                    font-family: Cairo;
                    font-size: 16px;
                    font-weight: 400;
                    color: rgb(37, 37, 37);
                    text-align: right;
                    line-height: 1.5;
                }
                .image-container {
                    position: relative;
                    width: 500px; // Increased from 430px
                    height: 520px; // Increased from 440px
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 40px; // Added margin to separate from text
                    flex-shrink: 0; // Prevent image from shrinking
                }
                @media (max-width: 768px) {
                    .container {
                        flex-direction: column;
                        gap: 20px; // Added small gap for mobile view
                        padding: 0 10px; // Reduce padding for mobile
                    }
                    .image-container {
                        width: 100%;
                        height: auto;
                        margin: 0; // Removed all margins
                        margin-bottom: 20px;
                    }
                    .text-container {
                        margin: 0; // Removed all margins
                        padding: 0 10px; // Reduced padding for mobile
                    }
                }
                @media (min-width: 769px) {
                    .container {
                        flex-direction: row-reverse;
                        gap: 40px; // Added gap between image and text
                    }
                }
            `}</style>
        </div>
    );
};

export default LowerHero;