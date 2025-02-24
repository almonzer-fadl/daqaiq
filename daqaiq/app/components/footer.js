"use client"; // Ensures this component is treated as a Client Component
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <div className="icon-container">
                    <div className="icon">
                        <button className="icon-button">
                            <svg viewBox="0 0 32 32" data-icon-set="fa">
                                <use href="/static/icon_libraries/fontawesome-4.7.0.svg#fa-youtube-play"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                            <svg viewBox="0 0 32 32" data-icon-set="fa">
                                <use href="/static/icon_libraries/fontawesome-4.7.0.svg#fa-twitter"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                            <svg viewBox="0 0 32 32" data-icon-set="fa">
                                <use href="/static/icon_libraries/fontawesome-4.7.0.svg#fa-linkedin"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                            <svg viewBox="0 0 32 32" data-icon-set="fa">
                                <use href="/static/icon_libraries/fontawesome-4.7.0.svg#fa-instagram"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="icon">
                        <button className="icon-button">
                            <svg viewBox="0 0 32 32" data-icon-set="fa">
                                <use href="/static/icon_libraries/fontawesome-4.7.0.svg#fa-phone"></use>
                            </svg>
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
            <div className="services">
                <div className="service-column">
                    <div className="service">خدماتنا</div>
                    <div className="service">مواقعنا</div>
                    <div className="service">الأسئلة الشائعة</div>
                </div>
                <div className="service-column">
                    <div className="service">المدونة</div>
                    <div className="service">من نحن</div>
                    <div className="service">تواصل معنا</div>
                </div>
            </div>
            <div className="company-info">
                <div className="description">
                    فاحص هي شركة سعودية رائدة متخصصة في مجال فحص السيارات المستعملة قبل الشراء - وتشمل خدماتنا الفحص الشامل للسيارات، وتقييم السيارات المستعملة بالإضافة إلى خدمة تقرير موجز
                </div>
                <div className="phone-number">920031814</div>
            </div>
            <div className="payment-methods">
                <div className="payment-icon">
                    <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876020494x314215901836736500%2Fmastercard.png?w=64&h=64&auto=compress&dpr=1.25&fit=max" alt="Mastercard" />
                </div>
                <div className="payment-icon">
                    <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876002797x964458829668657500%2Fmada.png?w=64&h=64&auto=compress&dpr=1.25&fit=max" alt="Mada" />
                </div>
                <div className="payment-icon">
                    <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704875985340x184211040869700860%2Fvisa.png?w=64&h=64&auto=compress&dpr=1.25&fit=max" alt="Visa" />
                </div>
                <div className="payment-icon">
                    <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876043214x376189721648559700%2Fsaso.png?w=64&h=64&auto=compress&dpr=1.25&fit=max" alt="Saso" />
                </div>
                <div className="payment-icon">
                    <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1704876059386x205838921129571260%2Fiso.png?w=64&h=64&auto=compress&dpr=1.25&fit=max" alt="ISO" />
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright">© 2024 جميع الحقوق محفوظة لشركة فاحص</div>
            </div>
            <style jsx>{`
                .footer {
                    background-color: rgb(0, 49, 69);
                    width: 100%;
                    padding: 10px 5%;
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
                    margin: 0 auto;
                    flex-wrap: wrap;
                }

                .icon-container {
                    display: flex;
                    gap: 10px;
                }

                .links-container {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .services {
                    width: 100%;
                    max-width: 1200px;
                    margin: 10px auto;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .company-info {
                    width: 100%;
                    max-width: 1200px;
                    margin: 10px auto;
                    text-align: center;
                }

                .description {
                    width: 100%;
                    max-width: 768px;
                    margin: 0 auto;
                    text-align: center;
                }

                .payment-methods {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin: 10px 0;
                    flex-wrap: wrap;
                }

                .footer-bottom {
                    width: 100%;
                    text-align: center;
                    margin: 5px 0;
                }

                @media (max-width: 768px) {
                    .social-icons {
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
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
                        gap: 10px;
                    }

                    .description {
                        padding: 0 10px;
                    }

                    .payment-methods {
                        flex-wrap: wrap;
                    }
                }

                .link, .service {
                    font-family: Cairo;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgb(196, 196, 196);
                    text-align: center;
                    line-height: 1;
                    cursor: pointer;
                    padding: 5px 10px;
                }

                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 35px;
                    height: 35px;
                    border: 2px solid rgb(196, 196, 196);
                    border-radius: 25px;
                    cursor: pointer;
                }

                .icon-button {
                    display: flex;
                    color: rgb(196, 196, 196);
                    border-radius: 4px;
                    width: 20px;
                    height: 20px;
                }

                .payment-icon {
                    width: 40px;
                    height: 40px;
                }

                .payment-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .phone-number {
                    font-family: Cairo;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgb(196, 196, 196);
                    text-align: center;
                    line-height: 1;
                    padding: 0px 10px;
                    margin: 10px 0px;
                }

                .copyright {
                    font-family: Cairo;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgb(196, 196, 196);
                    text-align: center;
                    line-height: 1;
                    padding: 5px 0px;
                }
            `}</style>
        </footer>
    );
};

export default Footer;