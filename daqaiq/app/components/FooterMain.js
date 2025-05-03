"use client"; // Ensures this component is treated as a Client Component
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <div className="icon-container">
                    <div className="icon">
                        <button className="icon-button">
                        <Image 
                                src="/whatsapp.png" // Remove /public from the path
                                alt="Facebook" 
                                width={25} 
                                height={25}
                                style={{ objectFit: 'contain' }} // Add style for better image fitting
                            />
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                            <Image 
                                src="/facebook.png" // Remove /public from the path
                                alt="Facebook" 
                                width={25} 
                                height={25}
                                style={{ objectFit: 'contain' }} // Add style for better image fitting
                            />
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                        <Image 
                                src="/twitter.png" // Remove /public from the path
                                alt="Facebook" 
                                width={25} 
                                height={25}
                                style={{ objectFit: 'contain' }} // Add style for better image fitting
                            />
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                        <Image 
                                src="/instagram.png" // Remove /public from the path
                                alt="Facebook" 
                                width={25} 
                                height={25}
                                style={{ objectFit: 'contain' }} // Add style for better image fitting
                            />
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                        <Image 
                                src="/snapchat.png" // Remove /public from the path
                                alt="Facebook" 
                                width={25} 
                                height={25}
                                style={{ objectFit: 'contain' }} // Add style for better image fitting
                            />
                        </button>
                    </div>
                </div>
                <div className="links-container">
                    <div className="link">الشروط والأحكام</div>
                    <div className="link">سياسة الخصوصية</div>
                    <div className="link">شهادة الاعمال</div>
                    <div className="link">شهادة الضريبة</div>
                </div>
            </div>
            <div className="services mb-1">
               <div className="service-column">
                 <Link href="/location" className="link text-white no-underline">موقعنا</Link>
                 <Link href="/faq" className="link text-white no-underline">الأسئلة الشائعة</Link>
            </div>
            <div className="service-column">
                <Link href="/prices" className="link text-white no-underline">الأسعار</Link>
                 <Link href="/about" className="link text-white no-underline">من نحن</Link>
                 <Link href="/contact" className="link text-white no-underline">تواصل معنا</Link>
             </div>
                 </div>
            <div className="company-info">
                <div className="description">
                   <p> نقدم خدمات فحص وصيانة السيارات بسرعة ودقة، باستخدام أحدث التقنيات وفريق متخصص لضمان أفضل أداء لسيارتك. دقة في دقائق – لأن وقتك ثمين!</p>
                </div>
                
            </div>
            <div className="payment-methods">
                <div className="payment-icon">
                    <Image
                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876020494x314215901836736500%2Fmastercard.png?w=64&h=64&auto=compress&dpr=1.25&fit=max"
                        alt="Mastercard"
                        width={64}
                        height={64}
                    />
                </div>
                <div className="payment-icon">
                    <Image
                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876002797x964458829668657500%2Fmada.png?w=64&h=64&auto=compress&dpr=1.25&fit=max"
                        alt="Mada"
                        width={64}
                        height={64}
                    />
                </div>
                <div className="payment-icon">
                    <Image
                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704875985340x184211040869700860%2Fvisa.png?w=64&h=64&auto=compress&dpr=1.25&fit=max"
                        alt="Visa"
                        width={64}
                        height={64}
                    />
                </div>
                <div className="payment-icon">
                    <Image
                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876043214x376189721648559700%2Fsaso.png?w=64&h=64&auto=compress&dpr=1.25&fit=max"
                        alt="Saso"
                        width={64}
                        height={64}
                    />
                </div>
                <div className="payment-icon">
                    <Image
                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876059386x205838921129571260%2Fiso.png?w=64&h=64&auto=compress&dpr=1.25&fit=max"
                        alt="ISO"
                        width={64}
                        height={64}
                    />
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright">© 2025 جميع الحقوق محفوظة لشركة دقائق</div>
            </div>
            <style jsx>{`
                .footer {
                    background-color: #013376;
                    padding: 3px 3%; /* Further reduced padding */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    margin-bottom: 0;
                }

                .social-icons {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 1200px;
                    margin: 3px auto; /* Further reduced margin */
                    flex-wrap: wrap;
                }

                .icon-container {
                    display: flex;
                    gap: 5px; /* Further reduced gap */
                }

                .links-container {
                    display: flex;
                    gap: 5px; /* Further reduced gap */
                    flex-wrap: wrap;
                }

                .services {
                    width: 100%;
                    max-width: 1200px;
                    margin: 3px auto;
                    display: flex;
                    justify-content: center;
                    gap: 5px;
                    flex-wrap: wrap;
                }

                .service-column {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .service-column div a {
                    color: white;
                    text-decoration: none;
                    font-family: Cairo;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 1;
                }

                .service-column div a:hover {
                    color: rgb(196, 196, 196);
                }

                .company-info {
                    width: 100%;
                    max-width: 1200px;
                    margin: 3px auto; /* Further reduced margin */
                    text-align: center;
                }

                .description {
                    width: 100%;
                    max-width: 768px;
                    margin: 0 auto;
                    text-align: center;
                    color: white; /* Add this line to make text color white */
                }

                .description p {
                    color: white; /* Add this line to ensure paragraph text is white */
                }

                .payment-methods {
                    display: flex;
                    justify-content: center;
                    gap: 5px; /* Further reduced gap */
                    margin: 3px 0; /* Further reduced margin */
                    flex-wrap: wrap;
                }

                .footer-bottom {
                    width: 100%;
                    text-align: center;
                    margin: 2px 0; /* Further reduced margin */
                }

                @media (max-width: 768px) {
                    .social-icons {
                        flex-direction: column;
                        align-items: center;
                        gap: 3px; /* Further reduced gap for mobile */
                    }

                    .icon-container {
                        justify-content: center;
                    }

                    .links-container {
                        justify-content: center;
                    }

                    .services {
                        flex-direction: column;
                        align-items: center;
                        gap: 3px; /* Further reduced gap for mobile */
                    }

                    .description {
                        padding: 0 3px; /* Further reduced padding */
                    }

                    .payment-methods {
                        flex-wrap: wrap;
                    }
                }

                .link, .service {
                    font-family: Cairo;
                    font-size: 14px; /* Increased from 11px */
                    font-weight: 400;
                    color: white; /* Changed from rgb(196, 196, 196) to white */
                    text-align: center;
                    line-height: 1;
                    cursor: pointer;
                    padding: 2px 5px; /* Further reduced padding */
                    text-decoration: none; /* Add this line to remove underline */
                }

                .service-column .link {
                    color: white;
                    text-decoration: none;
                    font-family: Cairo;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 1;
                }

                .service-column .link:hover {
                    color: rgb(196, 196, 196);
                }

                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 35px; /* Increased from 25px */
                    height: 35px; /* Increased from 25px */
                    border: 1px solid rgb(196, 196, 196); /* Thinner border */
                    border-radius: 20px; /* Adjusted border radius */
                    cursor: pointer;
                }

                .icon-button {
                    display: flex;
                    color: rgb(196, 196, 196);
                    border-radius: 4px;
                    width: 25px; /* Increased from 18px */
                    height: 25px; /* Increased from 18px */
                }

                .payment-icon {
                    width: 40px; /* Increased from 30px */
                    height: 40px; /* Increased from 30px */
                }

                .payment-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .phone-number {
                    font-family: Cairo;
                    font-size: 16px; /* Increased from 11px */
                    font-weight: 400;
                    color: white; /* Changed from rgb(196, 196, 196) to white */
                    text-align: center;
                    line-height: 1;
                    padding: 0px 5px; /* Further reduced padding */
                    margin: 3px 0; /* Further reduced margin */
                    display: flex;
                    justify-content: center; /* Center the phone number */
                    align-items: center; /* Center vertically */
                }

                .copyright {
                    font-family: Cairo;
                    font-size: 14px; /* Increased from 11px */
                    font-weight: 400;
                    color: white; /* Changed from rgb(196, 196, 196) to white */
                    text-align: center;
                    line-height: 1;
                    padding: 2px 0; /* Further reduced padding */
                }

                .text-block h3 {
                    font-size: 16px; /* Added for consistent text sizing */
                    margin-bottom: 5px;
                }

                .text-block p {
                    font-size: 14px; /* Added for consistent text sizing */
                }
                    
            `}</style>
        </footer>
    );
};

export default Footer;