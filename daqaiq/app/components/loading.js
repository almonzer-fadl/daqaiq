"use client";
import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="car">🚗</div>
      </div>
      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #e2e9f5;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .loading-spinner {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .car {
          position: absolute;
          font-size: 2rem;
          animation: drive 2s infinite linear;
        }

        @keyframes drive {
          0% {
            transform: translateX(-50px) translateY(0);
          }
          25% {
            transform: translateX(0) translateY(-25px);
          }
          50% {
            transform: translateX(50px) translateY(0);
          }
          75% {
            transform: translateX(0) translateY(25px);
          }
          100% {
            transform: translateX(-50px) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;