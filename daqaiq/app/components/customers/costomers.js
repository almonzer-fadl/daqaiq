"use client";
import { useEffect, useState, useRef } from 'react';
import styles from './Customers.module.css';

const Customers = () => {
    const containerRef = useRef(null);

    const customers = [
        {
            url: "https://taajeerfinance.com/ar/",
            img: "./logotera.png",
            alt: "تأجير للتمويل"
        },
        {
            url: "https://www.daqaiq.com/",
            img: "./logotera.png",
            alt: "مزادك"
        },
        {
            url: "https://daqaiq.com/",
            img: "./logo.png/",
            alt: "دقائق"
        },
        {
            url: "https://daqaiq.com/",
            img: "./logotera.png",
            alt: "تيرا"
        },
        {
            url: "https://daqaiq.com/",
            img: "./logo.png",
            alt: "دقائق"
        },
        {
            url: "https://daqaiq.com/",
            img: "./logotera.png",
            alt: "رحلة"
        },
        {
            url: "https://daqaiq.com/",
            img: "./logo.png",
            alt: "عبداللطيف جميل"
        }
    ];

    // Create three sets of cards for smooth infinite scroll
    const tripleCustomers = [...customers, ...customers, ...customers];

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>عملاؤنا</h2>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.track}>
                    <div className={styles.cards}>
                        {tripleCustomers.map((customer, index) => (
                            <div key={`${customer.alt}-${index}`} className={styles.card}>
                                <a href={customer.url} target="_blank" rel="noopener noreferrer">
                                    <img src={customer.img} alt={customer.alt} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Customers;