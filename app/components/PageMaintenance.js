'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PageMaintenance() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
            <div className="max-w-3xl w-full text-center space-y-8 bg-white rounded-2xl shadow-xl p-8 mx-4">
                {/* Maintenance Icon */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900">Website Under Construction</h1>
                
                <p className="text-xl text-gray-600 max-w-xl mx-auto">
                    We're working hard to improve our website and bring you a better experience.
                    In the meantime, you can visit our store or contact us directly.
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* Store Visit Section */}
                    <div className="bg-blue-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold text-blue-900 mb-3">Visit Our Store</h2>
                        <p className="text-blue-700">
                            123 Store Street<br />
                            City, State 12345<br />
                            <span className="font-semibold">Hours:</span> 9AM - 9PM
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-green-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold text-green-900 mb-3">Contact Us</h2>
                        <p className="text-green-700">
                            Phone: (123) 456-7890<br />
                            Email: contact@store.com<br />
                            <span className="font-semibold">Support:</span> 24/7
                        </p>
                    </div>
                </div>

                <div className="pt-6">
                    <p className="text-sm text-gray-500">
                        Thank you for your patience! We'll be back online soon.
                    </p>
                </div>
            </div>
        </div>
    );
} 