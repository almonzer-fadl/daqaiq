import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '../../../../../models/User';
import Supplier from '../../../../../models/Supplier';
import { validateEmail, validatePhone } from '@/lib/utils';
import mongoose from 'mongoose';

export async function POST(req) {
  let session;
  
  try {
    // First try to parse the request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { message: 'خطأ في تنسيق البيانات المرسلة' },
        { status: 400 }
      );
    }

    // Log the received data (excluding password)
    console.log('Received registration data:', {
      ...body,
      password: '[REDACTED]'
    });

    const { 
      name,
      email, 
      password, 
      companyName, 
      phone,
      businessType,
      taxId
    } = body;

    // Detailed validation logging
    const validationErrors = [];
    
    if (!name) validationErrors.push('Name is missing');
    if (!email) validationErrors.push('Email is missing');
    if (!password) validationErrors.push('Password is missing');
    if (!companyName) validationErrors.push('Company name is missing');
    if (!phone) validationErrors.push('Phone is missing');
    if (!businessType) validationErrors.push('Business type is missing');
    if (!taxId) validationErrors.push('Tax ID is missing');

    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return NextResponse.json(
        { 
          message: 'جميع الحقول مطلوبة', 
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { message: 'صيغة البريد الإلكتروني غير صحيحة' },
        { status: 400 }
      );
    }

    // Validate phone number (Saudi format)
    if (!validatePhone(phone)) {
      console.log('Invalid phone format:', phone);
      return NextResponse.json(
        { message: 'رقم الجوال غير صحيح' },
        { status: 400 }
      );
    }

    // Validate business type
    const validBusinessTypes = ['manufacturer', 'distributor', 'retailer', 'other'];
    if (!validBusinessTypes.includes(businessType)) {
      console.log('Invalid business type:', businessType);
      return NextResponse.json(
        { message: 'نوع النشاط التجاري غير صحيح' },
        { status: 400 }
      );
    }

    // Connect to database
    try {
      await dbConnect();
      console.log('Successfully connected to database');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { message: 'خطأ في الاتصال بقاعدة البيانات' },
        { status: 500 }
      );
    }

    // Check for existing email and taxId before starting transaction
    try {
      const existingEmail = await User.findOne({ email }).lean();
      if (existingEmail) {
        console.log('Email already exists:', email);
        return NextResponse.json(
          { message: 'البريد الإلكتروني مسجل مسبقاً' },
          { status: 400 }
        );
      }

      const existingTaxId = await Supplier.findOne({ taxId }).lean();
      if (existingTaxId) {
        console.log('Tax ID already exists:', taxId);
        return NextResponse.json(
          { message: 'الرقم الضريبي مسجل مسبقاً' },
          { status: 400 }
        );
      }
    } catch (lookupError) {
      console.error('Error checking for existing user/supplier:', lookupError);
      return NextResponse.json(
        { message: 'حدث خطأ أثناء التحقق من البيانات' },
        { status: 500 }
      );
    }

    // Start transaction
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create user
      const user = await User.create([{
        name,
        email,
        password: hashedPassword,
        roles: ['supplier'],
        phoneNumber: phone,
        businessName: companyName,
        businessType,
        taxId,
        isVerified: false
      }], { session });

      console.log('User created successfully:', user[0]._id);

      // Create supplier profile
      const supplier = await Supplier.create([{
        user: user[0]._id,
        email,
        companyName,
        phone,
        businessType,
        taxId,
        isVerified: false,
        status: 'pending'
      }], { session });

      console.log('Supplier profile created successfully:', supplier[0]._id);

      // Commit the transaction
      await session.commitTransaction();
      console.log('Transaction committed successfully');

      return NextResponse.json(
        { 
          message: 'تم التسجيل بنجاح. سيتم مراجعة حسابك وتفعيله قريباً',
          user: {
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            companyName,
            phone,
            businessType,
            status: 'pending'
          }
        },
        { status: 201 }
      );
    } catch (dbError) {
      if (session) {
        await session.abortTransaction();
        console.log('Transaction aborted due to error');
      }

      console.error('Database operation error:', {
        error: dbError.message,
        stack: dbError.stack,
        code: dbError.code
      });

      // Handle specific MongoDB error codes
      if (dbError.code === 11000) {
        const field = Object.keys(dbError.keyPattern)[0];
        return NextResponse.json(
          { message: `${field === 'email' ? 'البريد الإلكتروني' : 'الرقم الضريبي'} مسجل مسبقاً` },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: 'حدث خطأ أثناء إنشاء الحساب في قاعدة البيانات' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unhandled registration error:', {
      error: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { message: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    );
  } finally {
    if (session) {
      await session.endSession();
      console.log('Database session ended');
    }
  }
} 