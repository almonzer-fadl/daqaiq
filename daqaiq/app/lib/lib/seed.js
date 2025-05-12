import mongoose from 'mongoose';
import Product from './models/Product';

const products = [
  {
    name: "فحص شامل للسيارة",
    slug: "full-car-inspection",
    description: "فحص شامل لجميع أنظمة السيارة يشمل المحرك، الفرامل، التعليق، والكهرباء",
    price: 299,
    category: "inspections",
    subcategory: "full-inspection",
    images: ["/services/full-inspection.jpg"],
    features: [
      "فحص المحرك وناقل الحركة",
      "فحص نظام التعليق والفرامل",
      "فحص النظام الكهربائي",
      "تقرير مفصل عن حالة السيارة"
    ],
    specifications: {
      "مدة الفحص": "ساعتان",
      "الضمان": "30 يوم",
      "عدد النقاط المفحوصة": "100+"
    },
    isFeatured: true
  },
  {
    name: "صيانة دورية",
    slug: "periodic-maintenance",
    description: "خدمة الصيانة الدورية الشاملة لسيارتك تشمل تغيير الزيت والفلاتر",
    price: 199,
    category: "maintenance",
    subcategory: "periodic",
    images: ["/services/periodic-maintenance.jpg"],
    features: [
      "تغيير زيت المحرك",
      "تغيير فلتر الزيت",
      "فحص مستويات السوائل",
      "فحص الإطارات"
    ],
    specifications: {
      "مدة الخدمة": "ساعة",
      "الضمان": "15 يوم",
      "نوع الزيت": "اصلي"
    },
    isFeatured: true
  },
  {
    name: "فحص ما قبل الشراء",
    slug: "pre-purchase-inspection",
    description: "فحص شامل للسيارات المستعملة قبل الشراء لضمان سلامة قرار الشراء",
    price: 349,
    category: "inspections",
    subcategory: "pre-purchase",
    images: ["/services/pre-purchase.jpg"],
    features: [
      "فحص تاريخ السيارة",
      "فحص الهيكل والصدمات",
      "فحص المحرك والأداء",
      "تقرير مفصل بالصور"
    ],
    specifications: {
      "مدة الفحص": "3 ساعات",
      "تقرير مفصل": "نعم",
      "فحص كمبيوتر": "نعم"
    },
    isFeatured: true
  }
];

export async function seedProducts() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Delete existing products
    await Product.deleteMany({});
    console.log('Deleted existing products.');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Seeded ${insertedProducts.length} products.`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');

    return { success: true, count: insertedProducts.length };
  } catch (error) {
    console.error('Error seeding products:', error);
    return { success: false, error: error.message };
  }
} 