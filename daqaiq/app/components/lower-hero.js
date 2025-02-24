"use client";
import React from 'react';
import Image from 'next/image';
import herolower from '@/public/herolower.jpeg'; // Correctly import the image

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
                        width={430} // Set width
                        height={440} // Set height
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
                    flex-direction: row;
                    justify-content: center; // Changed from space-between to center
                    align-items: center;
                    margin: 0 auto 50px;
                    gap: 0px; // Added to remove gap between elements
                    max-width: 1200px; /* Add max-width to contain the content */
                    width: 100%;
                    padding: 0 20px; /* Add padding for smaller screens */
                }
                .text-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: 498px;
                    margin-right: 20px; // Added margin for spacing
                    padding: 0 20px; // Added padding instead of margin
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
                    width: 430px;
                    height: 440px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0; // Removed all margins
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
                    }
                    .text-container {
                        margin: 0; // Removed all margins
                        padding: 0 10px; // Reduced padding for mobile
                    }
                }
                @media (min-width: 769px) {
                    .container {
                        flex-direction: row-reverse;
                        gap: 0; // Ensure no gap in desktop view
                    }
                }
            `}</style>
        </div>
    );
};

export default LowerHero;