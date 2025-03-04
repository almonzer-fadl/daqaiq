'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Parts = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check initial window size
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="inspection-parts" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '50px 0 0',
            minWidth: '360px',
            width: '100%'
        }}>
            <h2 style={{
                fontFamily: 'Cairo',
                fontSize: isMobile ? '24px' : '32px',
                fontWeight: 600,
                color: '#252525',
                textAlign: 'center',
                letterSpacing: '1px',
                lineHeight: 1,
                padding: '10px 0',
                marginBottom: '2rem'
            }}>
                ماهي الأجزاء التي يتم فحصها في السيارة؟
            </h2>
            {isMobile ? (
                // Mobile image container
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    maxWidth: '90%',
                    margin: '0 auto'
                }}>
                    <Image
                        src="/parts-phone.png"
                        alt="Car inspection parts diagram mobile"
                        fill
                        sizes="90vw"
                        style={{
                            objectFit: 'contain'
                        }}
                        priority
                    />
                </div>
            ) : (
                // Desktop image container
                <div style={{
                    position: 'relative',
                    width: '600px',
                    height: '300px',
                    maxWidth: '90%',
                    margin: '0 auto'
                }}>
                    <Image
                        src="/parts.png"
                        alt="Car inspection parts diagram"
                        fill
                        sizes="600px"
                        style={{
                            objectFit: 'contain'
                        }}
                        priority
                    />
                </div>
            )}
        </section>
    );
};

export default Parts;