"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function MaintenancePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-2xl mx-4">
        <div className="mb-8">
          <span className="text-6xl">🔧</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">نحن في طور التحديث!</h1>
        <p className="text-gray-600 mb-6">
          نقوم حالياً بتحديث موقعنا لتقديم تجربة أفضل لكم. سنعود قريباً مع تحسينات جديدة.
        </p>
        <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
      </div>
    </motion.div>
  );
}