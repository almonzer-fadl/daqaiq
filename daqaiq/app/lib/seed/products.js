const generateTiresAndWheels = () => {
  const products = [];
  const tireTypes = ['summer-tires', 'winter-tires', 'wheels'];
  const brands = ['ميشلان', 'بريدجستون', 'كونتيننتال', 'جودير', 'دنلوب', 'بيريللي', 'هانكوك', 'يوكوهاما', 'تويو', 'نيتو'];
  const sizes = ['225/45R17', '235/45R18', '245/40R19', '255/35R20', '265/35R21'];
  
  for (let i = 0; i < 30; i++) {
    const subcategory = tireTypes[i % tireTypes.length];
    const brand = brands[i % brands.length];
    const size = sizes[i % sizes.length];
    const basePrice = subcategory === 'wheels' ? 2500 : 700;
    const price = basePrice + (Math.random() * 500);
    const originalPrice = price + (Math.random() * 200);
    
    products.push({
      name: `${brand} ${subcategory === 'wheels' ? 'جنوط رياضية' : 'إطارات'} ${size}`,
      slug: `${brand.toLowerCase()}-${subcategory}-${size.replace('/', '-')}`,
      description: `إطارات ${brand} عالية الأداء مقاس ${size} - ${subcategory === 'summer-tires' ? 'صيفي' : subcategory === 'winter-tires' ? 'شتوي' : 'جنوط رياضية'}`,
      price: Math.round(price),
      originalPrice: Math.round(originalPrice),
      discountPrice: Math.round(price),
      discountPercentage: Math.round(((originalPrice - price) / originalPrice) * 100),
      category: "tires-wheels",
      subcategory: subcategory,
      categorySlug: "tires-wheels",
      images: [`https://placehold.co/600x400/eee/999?text=${brand}+${size}`],
      features: [
        "تحكم ممتاز في المنعطفات",
        "أداء عالي على الطرق",
        "مقاومة منخفضة للدوران",
        "عمر افتراضي طويل"
      ],
      specifications: {
        "المقاس": size,
        "النوع": subcategory === 'summer-tires' ? 'صيفي' : subcategory === 'winter-tires' ? 'شتوي' : 'جنوط',
        "الضمان": "سنتين"
      },
      inStock: true,
      isFeatured: true,
      rating: 4 + (Math.random() * 1),
      reviewCount: Math.floor(Math.random() * 200) + 50,
      badge: "جديد",
      badgeColor: "#00A046",
      freeShipping: price > 1000,
      shippingText: price > 1000 ? "شحن مجاني" : "شحن سريع"
    });
  }
  return products;
};

const generateCarCare = () => {
  const products = [];
  const types = ['cleaning-products', 'lubricants', 'interior-care'];
  const brands = ['3M', 'Meguiars', 'Turtle Wax', 'Chemical Guys', 'Mothers', 'Sonax', 'Auto Finesse', 'Gtechniq', 'Koch Chemie'];
  
  for (let i = 0; i < 30; i++) {
    const subcategory = types[i % types.length];
    const brand = brands[i % brands.length];
    const basePrice = subcategory === 'lubricants' ? 150 : 80;
    const price = basePrice + (Math.random() * 100);
    const originalPrice = price + (Math.random() * 50);
    
    products.push({
      name: `${brand} ${subcategory === 'cleaning-products' ? 'منظف سيارات' : subcategory === 'lubricants' ? 'زيت محرك' : 'منظف داخلي'}`,
      slug: `${brand.toLowerCase()}-${subcategory}-${i}`,
      description: `منتجات ${brand} عالية الجودة للعناية بسيارتك`,
      price: Math.round(price),
      originalPrice: Math.round(originalPrice),
      discountPrice: Math.round(price),
      discountPercentage: Math.round(((originalPrice - price) / originalPrice) * 100),
      category: "car-care",
      subcategory: subcategory,
      categorySlug: "car-care",
      images: [`https://placehold.co/600x400/eee/999?text=${brand}+${subcategory}`],
      features: [
        "جودة عالية",
        "سهل الاستخدام",
        "نتائج فورية",
        "آمن للاستخدام"
      ],
      specifications: {
        "الحجم": subcategory === 'lubricants' ? '4 لتر' : '500 مل',
        "المنشأ": "أصلي",
        "الضمان": "سنة"
      },
      inStock: true,
      isFeatured: true,
      rating: 4 + (Math.random() * 1),
      reviewCount: Math.floor(Math.random() * 150) + 30,
      badge: "موصى به",
      badgeColor: "#4CAF50",
      freeShipping: false,
      shippingText: "شحن سريع"
    });
  }
  return products;
};

const generateSpareParts = () => {
  const products = [];
  const types = ['engines', 'suspension', 'braking-system'];
  const brands = ['Bosch', 'Denso', 'NGK', 'Valeo', 'TRW', 'Sachs', 'Brembo', 'KYB', 'Monroe'];
  
  for (let i = 0; i < 30; i++) {
    const subcategory = types[i % types.length];
    const brand = brands[i % brands.length];
    const basePrice = subcategory === 'engines' ? 1000 : 400;
    const price = basePrice + (Math.random() * 500);
    const originalPrice = price + (Math.random() * 200);
    
    products.push({
      name: `${brand} ${subcategory === 'engines' ? 'قطع محرك' : subcategory === 'suspension' ? 'نظام تعليق' : 'نظام فرامل'}`,
      slug: `${brand.toLowerCase()}-${subcategory}-${i}`,
      description: `قطع غيار ${brand} أصلية عالية الجودة`,
      price: Math.round(price),
      originalPrice: Math.round(originalPrice),
      discountPrice: Math.round(price),
      discountPercentage: Math.round(((originalPrice - price) / originalPrice) * 100),
      category: "spare-parts",
      subcategory: subcategory,
      categorySlug: "spare-parts",
      images: [`https://placehold.co/600x400/eee/999?text=${brand}+${subcategory}`],
      features: [
        "قطع أصلية",
        "جودة عالية",
        "ضمان شامل",
        "متوافق مع معظم السيارات"
      ],
      specifications: {
        "الماركة": brand,
        "النوع": "أصلي",
        "الضمان": "سنتين"
      },
      inStock: true,
      isFeatured: true,
      rating: 4 + (Math.random() * 1),
      reviewCount: Math.floor(Math.random() * 100) + 20,
      badge: "أصلي",
      badgeColor: "#FF6B6B",
      freeShipping: price > 800,
      shippingText: price > 800 ? "شحن مجاني" : "شحن سريع"
    });
  }
  return products;
};

const generateCarAccessories = () => {
  const products = [];
  const types = ['interior-accessories', 'exterior-accessories', 'entertainment-accessories'];
  const accessories = [
    { name: 'شاشة أندرويد', price: 1200 },
    { name: 'حساسات خلفية', price: 200 },
    { name: 'كاميرا خلفية', price: 300 },
    { name: 'دعاسات أرضية', price: 150 },
    { name: 'حامل جوال', price: 50 },
    { name: 'إضاءة LED', price: 100 },
    { name: 'مخرج USB', price: 80 },
    { name: 'جناح خلفي', price: 500 },
    { name: 'غطاء مقود', price: 70 },
    { name: 'عتبات جانبية', price: 400 }
  ];
  
  for (let i = 0; i < 30; i++) {
    const subcategory = types[i % types.length];
    const accessory = accessories[i % accessories.length];
    const price = accessory.price + (Math.random() * 100);
    const originalPrice = price + (Math.random() * 50);
    
    products.push({
      name: accessory.name,
      slug: `${accessory.name.replace(/ /g, '-')}-${i}`,
      description: `إكسسوار عالي الجودة لتحسين مظهر وأداء سيارتك`,
      price: Math.round(price),
      originalPrice: Math.round(originalPrice),
      discountPrice: Math.round(price),
      discountPercentage: Math.round(((originalPrice - price) / originalPrice) * 100),
      category: "car-accessories",
      subcategory: subcategory,
      categorySlug: "car-accessories",
      images: [`https://placehold.co/600x400/eee/999?text=${accessory.name}`],
      features: [
        "سهل التركيب",
        "جودة عالية",
        "تصميم عصري",
        "متوافق مع معظم السيارات"
      ],
      specifications: {
        "المادة": "عالية الجودة",
        "التركيب": "سهل",
        "الضمان": "سنة"
      },
      inStock: true,
      isFeatured: true,
      rating: 4 + (Math.random() * 1),
      reviewCount: Math.floor(Math.random() * 120) + 30,
      badge: "جديد",
      badgeColor: "#FFD700",
      freeShipping: price > 500,
      shippingText: price > 500 ? "شحن مجاني" : "شحن سريع"
    });
  }
  return products;
};

const generateElectronics = () => {
  const products = [];
  const types = ['headphones', 'smartwatches', 'smartphones'];
  const brands = ['Samsung', 'Apple', 'Sony', 'Huawei', 'Xiaomi', 'OnePlus', 'Garmin', 'Bose', 'JBL'];
  
  for (let i = 0; i < 30; i++) {
    const subcategory = types[i % types.length];
    const brand = brands[i % brands.length];
    const basePrice = subcategory === 'smartphones' ? 2000 : 500;
    const price = basePrice + (Math.random() * 1000);
    const originalPrice = price + (Math.random() * 300);
    
    products.push({
      name: `${brand} ${subcategory === 'headphones' ? 'سماعة بلوتوث' : subcategory === 'smartwatches' ? 'ساعة ذكية' : 'هاتف ذكي'}`,
      slug: `${brand.toLowerCase()}-${subcategory}-${i}`,
      description: `إلكترونيات ${brand} عالية الجودة`,
      price: Math.round(price),
      originalPrice: Math.round(originalPrice),
      discountPrice: Math.round(price),
      discountPercentage: Math.round(((originalPrice - price) / originalPrice) * 100),
      category: "electronics",
      subcategory: subcategory,
      categorySlug: "electronics",
      images: [`https://placehold.co/600x400/eee/999?text=${brand}+${subcategory}`],
      features: [
        "تقنية حديثة",
        "جودة صوت عالية",
        "بطارية طويلة العمر",
        "تصميم عصري"
      ],
      specifications: {
        "الماركة": brand,
        "البلوتوث": "5.0",
        "الضمان": "سنتين"
      },
      inStock: true,
      isFeatured: true,
      rating: 4 + (Math.random() * 1),
      reviewCount: Math.floor(Math.random() * 200) + 50,
      badge: "جديد",
      badgeColor: "#4CAF50",
      freeShipping: true,
      shippingText: "شحن مجاني"
    });
  }
  return products;
};

const products = [
  ...generateTiresAndWheels(),
  ...generateCarCare(),
  ...generateSpareParts(),
  ...generateCarAccessories(),
  ...generateElectronics()
];

export { products }; 