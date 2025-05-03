"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeaderTop = () => {
  return (
    <div className="uppersection bg-base-100 text-sm px-6 py-2 flex flex-row-reverse justify-between items-center">
      {/* Help Menu */}
      <ul className="flex gap-4 flex-row-reverse">
        <li>
          <Link href="/about" className="hover:underline">
          من نحن
          </Link>
        </li>
      </ul>
     <style jsx>{`
        .uppersection {
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          height: 40px;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--color-white);
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          
        }
        .header-top ul {
          display: flex;
          gap: 1rem;
        }
        .header-top a {
          color: var(--color-white);
          text-decoration: none;
        }
        .header-top a:hover {
          text-decoration: underline;
        }
        `}</style>
    </div>
  );
};

export default HeaderTop;
