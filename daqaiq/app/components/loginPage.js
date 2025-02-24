"use client"; // Ensures this component is treated as a Client Component

import React from 'react'; // Import React library

const LoginPage = ({ onClose }) => { // Define the LoginPage functional component with onClose prop
    return (
        <div className="login-page-container">
            {/* Main container for the login page */}
            <div className="login-page-content"> 
                {/* Content container for the login form */}
                <h2>تسجيل الدخول</h2> 
                {/* Login heading */}
                <form>
                    <div className="form-group"> 
                        {/* Form group for username input */}
                        <label htmlFor="username">اسم المستخدم</label> 
                        {/* Username label */}
                        <input type="text" id="username" name="username" required />     
                        {/* Username input */}
                    </div>
                    <div className="form-group"> 
                        {/* Form group for password input */}
                        <label htmlFor="password">كلمة المرور</label>
                        {/* Password label */}
                        <input type="password" id="password" name="password" required /> 
                        {/* Password input */}
                    </div>
                    <button type="submit" className="login-button">دخول</button> 
                    {/* Login button */}
                </form>
                <button className="close-button" onClick={onClose}>إغلاق</button> 
                {/* Close button */}
            </div>
            <style jsx>{`
                .login-page-container {
                    display: flex; // Use flexbox layout
                    justify-content: center; // Center items horizontally
                    align-items: center; // Center items vertically
                    position: fixed; // Fix position to the viewport
                    top: 0; // Align to the top
                    left: 0; // Align to the left
                    width: 100%; // Full width
                    height: 100%; // Full height
                    background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
                    z-index: 1000; // High stacking order
                }
                .login-page-content {
                    background-color: #fff; // White background
                    padding: 20px; // Padding around content
                    border-radius: 8px; // Rounded corners
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow
                    text-align: center; // Center text
                }
                .form-group {
                    margin-bottom: 15px; // Space between form groups
                }
                .form-group label {
                    display: block; // Block display for label
                    margin-bottom: 5px; // Space below label
                    font-family: Cairo; // Set font family
                }
                .form-group input {
                    width: 100%; // Full width input
                    padding: 10px; // Padding inside input
                    border: 1px solid #ccc; // Light gray border
                    border-radius: 4px; // Rounded corners
                    font-family: Cairo; // Set font family
                }
                .login-button {
                    background-color: #FF9030; // Set background color
                    color: #fff; // Set text color
                    padding: 10px 20px; // Padding inside button
                    border: none; // Remove border
                    border-radius: 4px; // Rounded corners
                    cursor: pointer; // Pointer cursor on hover
                    font-family: Cairo; // Set font family
                }
                .close-button {
                    background-color: transparent; // Transparent background
                    color: #FF5A27; // Set text color
                    border: none; // Remove border
                    cursor: pointer; // Pointer cursor on hover
                    font-family: Cairo; // Set font family
                    margin-top: 10px; // Space above button
                }
            `}</style>
        </div>
    );
};

export default LoginPage; // Export the LoginPage component