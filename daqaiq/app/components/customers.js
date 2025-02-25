"use client";
import { useEffect, useState } from 'react';
import styles from './Customers.module.css'; // Import the CSS module

const Customers = () => {
    const customers = [
        {
            url: "https://taajeerfinance.com/ar/",
            img: "https://b964d3e6d165a571306324c2c0e36a50.cdn.bubble.io/f1704875599487x342878313301922000/tajeer.jpg",
            alt: "تأجير للتمويل"
        },
        {
            url: "https://www.mazadak.com/ar/",
            img: "https://b964d3e6d165a571306324c2c0e36a50.cdn.bubble.io/f1704875590729x481807278656937860/mazadak.jpg",
            alt: "مزادك"
        },
        {
            url: "https://autozone.com.sa/",
            img: "https://b964d3e6d165a571306324c2c0e36a50.cdn.bubble.io/f1704875582375x401132310634335000/autozone.png",
            alt: "اوتوزون"
        },
        {
            url: "https://kayishha.com/ar/home",
            img: "https://b964d3e6d165a571306324c2c0e36a50.cdn.bubble.io/f1704875574357x267782199695638430/kayishha.png",
            alt: "كيشها"
        },
        {
            url: "https://ksa.carswitch.com/",
            img: "https://b964d3e6d165a571306324c2c0e36a50.cdn.bubble.io/f1704875561225x498415014881266240/carswitch.png",
            alt: "كارسويتش"
        },
        {
            url: "https://rehlacar.com/",
            img: "https://b964d3e6d165a571306324c2c0e36a50.cdn.bubble.io/f1704875553446x849980452922893800/rehla.png",
            alt: "رحلة"
        },
        {
            url: "https://aljfinance.com/ar",
            img: "https://b964d3e6d165a571306324c2c0e36a50.cdn.bubble.io/f1727343021735x625383464872697400/Abdul_Latif_Jameel_Logo.svg.png",
            alt: "عبداللطيف جميل"
        }
    ];

    const duplicatedCustomers = [...customers, ...customers];

    return (
        <div className={styles.container}>
            <ul className={styles.cards}>
                {duplicatedCustomers.map((customer, index) => (
                    <li key={index} className={styles.card}>
                        <a href={customer.url} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={customer.img} 
                                alt={customer.alt} 
                                width={200} 
                                height={150}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Customers;