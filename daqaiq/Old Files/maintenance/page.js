"use client";
import React from 'react';

export default function MaintenancePage() {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <div className="icon-wrapper">
          <span className="maintenance-icon">🔧</span>
        </div>
        <h1 className="maintenance-title">نحن في طور التحديث!</h1>
        <p className="maintenance-message">
          نقوم حالياً بتحديث موقعنا لتقديم تجربة أفضل لكم. سنعود قريباً مع تحسينات جديدة.
        </p>
        <div className="loading-spinner"></div>
      </div>

      <style jsx>{`
        .maintenance-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
          padding: 1rem;
        }

        .maintenance-content {
          text-align: center;
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          max-width: 32rem;
          margin: 0 1rem;
          animation: fadeIn 0.5s ease-out;
        }

        .icon-wrapper {
          margin-bottom: 2rem;
        }

        .maintenance-icon {
          font-size: 4rem;
          animation: wrench 2s infinite;
          display: inline-block;
        }

        .maintenance-title {
          font-size: 1.875rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .maintenance-message {
          color: #4b5563;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .loading-spinner {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          border: 4px solid #e5e7eb;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes wrench {
          0% {
            transform: rotate(0deg);
          }
          20%, 90% {
            transform: rotate(-30deg);
          }
          35%, 75% {
            transform: rotate(30deg);
          }
          50% {
            transform: rotate(-30deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}