"use client";
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('تم التسجيل بنجاح! 🎉');
      }
    } catch (error) {
      alert('عذراً، حدث خطأ 😢');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="الاسم" 
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input 
        type="email" 
        placeholder="البريد الإلكتروني" 
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input 
        type="password" 
        placeholder="كلمة المرور" 
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />
      <button type="submit">تسجيل</button>
    </form>
  );
}