import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';
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

    // Validate required fields
    if (!name || !email || !password || !companyName || !phone || !businessType || !taxId) {
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

    // Check if supplier already exists
    const existingSupplier = await Supplier.findOne({ 
      $or: [
        { email },
        { taxId }
      ]
    });
    
    if (existingSupplier) {
      if (existingSupplier.email === email) {
        return NextResponse.json(
          { message: 'البريد الإلكتروني مسجل مسبقاً' },
          { status: 400 }
        );
      }
      if (existingSupplier.taxId === taxId) {
        return NextResponse.json(
          { message: 'الرقم الضريبي مسجل مسبقاً' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new supplier
    const supplier = await Supplier.create({
      name,
      email,
      password: hashedPassword,
      companyName,
      phone,
      businessType,
      taxId,
      role: 'supplier',
      status: 'pending', // Suppliers need approval before they can start selling
    });

    // Remove sensitive data from response
    const supplierResponse = {
      _id: supplier._id,
      name: supplier.name,
      email: supplier.email,
      companyName: supplier.companyName,
      phone: supplier.phone,
      businessType: supplier.businessType,
      role: supplier.role,
      status: supplier.status,
    };

    return NextResponse.json(
      { 
        message: 'تم التسجيل بنجاح. سيتم مراجعة حسابك وتفعيله قريباً', 
        user: supplierResponse 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    );
  }
} 