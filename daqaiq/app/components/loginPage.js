"use client"; // Ensures this component is treated as a Client Component

import React from 'react'; // Import React library

const LoginPage = ({ onClose }) => { // Define the LoginPage functional component with onClose prop
    return (
        <div className="login-page-container">
            {/* Main container for the login page */}
            <div className="login-page-content">
                {/* Content container for the login form */}
                <div className="login-image">
                    <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1725258577246x438990874746645360%2Flock.png?w=192&amp;h=192&amp;auto=compress&amp;dpr=1.25&amp;fit=max" alt="Lock" />
                </div>
                <div className="login-form">
                    <h2>تسجيل الدخول</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" id="username" name="username" placeholder=" رقم الجوال او الايميل" required />
                        </div>
                        <div className="form-group">
                            <input type="password" id="password" name="password" placeholder="كلمة المرور" required />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">تذكرني</label>
                        </div>
                        <button type="submit" className="login-button">تسجيل الدخول</button>
                    </form>
                    <button className="close-button" onClick={onClose}>إغلاق</button>
                </div>
            </div>
            <style jsx>{`
                .login-page-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                }
                .login-page-content {
                    background-color: #f0efed;
                    box-shadow: 2px 2px 4px rgba(170, 170, 170, 0.5);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 30px;
                }
                .login-image {
                    width: 150px;
                    height: 150px;
                    margin: 30px 0;
                }
                .login-image img {
                    width: 100%;
                    height: 100%;
                }
                .login-form {
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .login-form h2 {
                    font-family: Cairo;
                    font-size: 16px;
                    font-weight: 600;
                    color: #252525;
                    margin-bottom: 35px;
                    text-align: center;
                }
                .form-group {
                    width: 100%;
                    margin-bottom: 15px;
                }
                .form-group input[type="text"],
                .form-group input[type="password"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #d62755;
                    border-radius: 5px;
                    background-color: #fcfcfc;
                    font-family: Tajawal;
                    font-size: 16px;
                    color: #6b6b6b;
                    text-align: right;
                }
                .form-group input[type="checkbox"] {
                    margin-right: 10px;
                }
                .form-group label {
                    font-family: Barlow;
                    font-size: 14px;
                    font-weight: 500;
                    color: #252525;
                }
                .login-button {
                    background-color: #fb804a;
                    color: #fff;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: Cairo;
                    font-size: 14px;
                    font-weight: bold;
                    width: 280px;
                    margin-bottom: 45px;
                }
                .close-button {
                    background-color: transparent;
                    color: #FF5A27;
                    border: none;
                    cursor: pointer;
                    font-family: Cairo;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};

export default LoginPage; // Export the LoginPage component