import { useState } from 'react';

export default function LoginPage({ onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    onClose(); // Close the popup after submission
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-header">
          <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fb964d3e6d165a571306324c2c0e36a50.cdn.bubble.io%2Ff1725258577246x438990874746645360%2Flock.png?w=192&h=192&auto=compress&dpr=1.25&fit=max" alt="Lock Icon" className="lock-icon" />
        </div>
        <h2 className="popup-title">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
          <label className="input-label">
             الايميل او رقم الجوال:
            <input type="text" name="username" className="input-field" placeholder="الايميل او رقم الجوال" inputMode="numeric" />
          </label>
          <br />
          <label className="input-label">
            كلمة المرور:
            <input type="password" name="password" className="input-field" placeholder="كلمة المرور" />
          </label>
          <br />
          <div className="checkbox-container">
            <input type="checkbox" id="rememberMe" className="checkbox" />
            <label htmlFor="rememberMe" className="checkbox-label">تذكرني</label>
          </div>
          <button type="submit" className="submit-button">تسجيل الدخول</button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>

      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-inner {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          width: 300px;
        }
        .popup-header {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }
        .lock-icon {
          width: 150px;
          height: 150px;
        }
        .popup-title {
          font-family: Cairo, sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #252525;
          margin-bottom: 35px;
        }
        .input-label {
          display: block;
          text-align: right;
          font-family: Tajawal, sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #6b6b6b;
          margin-bottom: 10px;
        }
        .input-field {
          width: 100%;
          padding: 10px;
          background-color: #ffffff; /* Set background color to white */
          border: 1px solid rgba(171, 171, 171, 0.41);
          border-radius: 5px;
          font-family: Tajawal, sans-serif;
          font-size: 16px;
          color: #6b6b6b;
          text-align: right;
          margin-bottom: 10px;
        }
        .checkbox-container {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 20px;
        }
        .checkbox {
          margin-right: 5px;
        }
        .checkbox-label {
          font-family: Barlow, sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #252525;
        }
        .submit-button {
          width: 100%;
          padding: 15px;
          background-color: #fb804a;
          color: white;
          font-family: Cairo, sans-serif;
          font-size: 14px;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 45px;
        }
        .close-button {
          background: none;
          border: none;
          color: #fb804a;
          cursor: pointer;
          font-family: Cairo, sans-serif;
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}