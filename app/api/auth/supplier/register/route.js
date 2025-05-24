import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '../../../../../models/User';
import Supplier from '../../../../../models/Supplier';
import { validateEmail, validatePhone } from '@/lib/utils';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { 
      name,
      email, 
      password, 
      companyName, 
      phone,
      businessType,
      taxId
    } = body;

    // Add console.log for debugging
    console.log('Received registration data:', {
      name,
      email,
      companyName,
      phone,
      businessType,
      taxId
    });

    // Validate required fields
    if (!name || !email || !password || !companyName || !phone || !businessType || !taxId) {
      console.log('Missing required fields');
      return NextResponse.json(
        { message: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: 'صيغة البريد الإلكتروني غير صحيحة' },
        { status: 400 }
      );
    }

    // Validate phone number (Saudi format)
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { message: 'رقم الجوال غير صحيح' },
        { status: 400 }
      );
    }

    // Validate business type
    const validBusinessTypes = ['manufacturer', 'distributor', 'retailer', 'other'];
    if (!validBusinessTypes.includes(businessType)) {
      return NextResponse.json(
        { message: 'نوع النشاط التجاري غير صحيح' },
        { status: 400 }
      );
    }

    try {
      // Check if user/supplier already exists
      const existingUser = await User.findOne({ email });
      const existingSupplier = await Supplier.findOne({ taxId });
      
      if (existingUser) {
        return NextResponse.json(
          { message: 'البريد الإلكتروني مسجل مسبقاً' },
          { status: 400 }
        );
      }

      if (existingSupplier) {
        return NextResponse.json(
          { message: 'الرقم الضريبي مسجل مسبقاً' },
          { status: 400 }
        );
      }

      // Create user first
      const user = await User.create({
        name,
        email,
        password, // Password will be hashed by the pre-save middleware
        roles: ['supplier'],
        phoneNumber: phone,
        businessName: companyName,
        businessType,
        taxId,
        isVerified: false
      });

      console.log('User created:', user._id);

      // Create supplier profile
      const supplier = await Supplier.create({
        user: user._id,
        email,
        companyName,
        phone,
        businessType,
        taxId,
        isVerified: false
      });

      console.log('Supplier created:', supplier._id);

      // Remove sensitive data from response
      const responseData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        companyName,
        phone,
        businessType,
        status: 'pending'
      };

      return NextResponse.json(
        { 
          message: 'تم التسجيل بنجاح. سيتم مراجعة حسابك وتفعيله قريباً', 
          user: responseData 
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    );
  }
} 