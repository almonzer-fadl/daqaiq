// ./app/data/productData.js

export const carProducts = {
  Offers: [
    {
      id: 1,
      name: 'Premium Brake Kit',
      slug: 'premium-brake-kit',
      description: 'Complete brake kit with high-performance pads and rotors',
      price: 299.99,
      oldPrice: 399.99,
      discount: 25,
      image: '/images/products/brake-kit.webp',
      category: 'car-parts',
      subcategory: 'brake-system'
    },
    {
      id: 2,
      name: 'LED Headlight Set',
      slug: 'led-headlight-set',
      description: 'Ultra-bright LED headlight conversion kit',
      price: 199.99,
      oldPrice: 249.99,
      discount: 20,
      image: '/images/products/led-headlights.webp',
      category: 'accessories',
      subcategory: 'exterior-accessories'
    }
  ],
  SpareParts: [
    {
      id: 3,
      name: 'Oil Filter Pack',
      slug: 'oil-filter-pack',
      description: 'High-quality oil filters for all major car brands',
      price: 24.99,
      image: '/images/products/oil-filter.webp',
      category: 'maintenance',
      subcategory: 'filters'
    },
    {
      id: 4,
      name: 'Spark Plug Set',
      slug: 'spark-plug-set',
      description: 'Premium spark plugs for optimal engine performance',
      price: 49.99,
      image: '/images/products/spark-plugs.webp',
      category: 'car-parts',
      subcategory: 'engine-parts'
    }
  ],
  Accessories: [
    {
      id: 5,
      name: 'Car Cover Deluxe',
      slug: 'car-cover-deluxe',
      description: 'All-weather protection for your vehicle',
      price: 89.99,
      image: '/images/products/car-cover.webp',
      category: 'accessories',
      subcategory: 'exterior-accessories'
    },
    {
      id: 6,
      name: 'Diagnostic Scanner',
      slug: 'diagnostic-scanner',
      description: 'Professional-grade OBD2 scanner',
      price: 159.99,
      image: '/images/products/scanner.webp',
      category: 'tools',
      subcategory: 'diagnostic-tools'
    }
  ]
};

export const electronicsProducts = {
  Electronics: {
    title: "الإلكترونيات",
    services: [
      {
        id: "electronics-1",
        title: "سماعات بلوتوث لاسلكية",
        description: "سماعات بلوتوث مع إلغاء الضوضاء وبطارية طويلة الأمد",
        image: "/images/wireless-earbuds.jpg",
        rating: 4.7,
        reviewCount: 214,
        discountPrice: 180,
        originalPrice: 250,
        discountPercentage: 28,
        badge: "الأكثر مبيعاً",
        badgeColor: "#FF6B6B",
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "electronics-2",
        title: "شاحن لاسلكي سريع",
        description: "شاحن لاسلكي سريع متوافق مع جميع الهواتف الذكية",
        image: "/images/wireless-charger.jpg",
        rating: 4.5,
        reviewCount: 168,
        discountPrice: 90,
        originalPrice: 120,
        discountPercentage: 25,
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "electronics-3",
        title: "كاميرا مراقبة ذكية",
        description: "كاميرا مراقبة منزلية ذكية مع رؤية ليلية واتصال واي فاي",
        image: "/images/smart-camera.jpg",
        rating: 4.6,
        reviewCount: 132,
        discountPrice: 220,
        originalPrice: 280,
        discountPercentage: 21,
        freeShipping: false
      },
      {
        id: "electronics-4",
        title: "ساعة ذكية متعددة الوظائف",
        description: "ساعة ذكية لتتبع النشاط البدني والإشعارات",
        image: "/images/smart-watch.jpg",
        rating: 4.4,
        reviewCount: 187,
        discountPrice: 150,
        originalPrice: 199,
        discountPercentage: 25,
        badge: "عرض محدود",
        badgeColor: "#5CB85C",
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "electronics-5",
        title: "مكبر صوت بلوتوث محمول",
        description: "مكبر صوت بلوتوث محمول مقاوم للماء مع صوت قوي",
        image: "/images/bluetooth-speaker.jpg",
        rating: 4.8,
        reviewCount: 203,
        discountPrice: 130,
        originalPrice: 180,
        discountPercentage: 28,
        freeShipping: false
      }
    ]
  }
};

export const homeProducts = {
  Home: {
    title: "منتجات المنزل",
    services: [
      {
        id: "home-1",
        title: "خلاط كهربائي متعدد الوظائف",
        description: "خلاط كهربائي قوي لتحضير العصائر والمشروبات",
        image: "/images/blender.jpg",
        rating: 4.5,
        reviewCount: 156,
        discountPrice: 220,
        originalPrice: 300,
        discountPercentage: 27,
        badge: "توصية الخبراء",
        badgeColor: "#428BCA",
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "home-2",
        title: "مكنسة كهربائية لاسلكية",
        description: "مكنسة كهربائية لاسلكية خفيفة الوزن وقوية",
        image: "/images/vacuum-cleaner.jpg",
        rating: 4.7,
        reviewCount: 198,
        discountPrice: 350,
        originalPrice: 450,
        discountPercentage: 22,
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "home-3",
        title: "غلاية ماء كهربائية",
        description: "غلاية ماء كهربائية من الستانلس ستيل مع إيقاف تلقائي",
        image: "/images/electric-kettle.jpg",
        rating: 4.4,
        reviewCount: 142,
        discountPrice: 85,
        originalPrice: 120,
        discountPercentage: 29,
        freeShipping: false
      },
      {
        id: "home-4",
        title: "طقم أواني طهي نون ستيك",
        description: "طقم أواني طهي مكون من 10 قطع مع طلاء نون ستيك",
        image: "/images/cookware-set.jpg",
        rating: 4.8,
        reviewCount: 215,
        discountPrice: 420,
        originalPrice: 550,
        discountPercentage: 24,
        badge: "الأكثر مبيعاً",
        badgeColor: "#FF6B6B",
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "home-5",
        title: "مصباح طاولة ذكي",
        description: "مصباح طاولة ذكي مع تحكم باللون والسطوع",
        image: "/images/smart-lamp.jpg",
        rating: 4.3,
        reviewCount: 87,
        discountPrice: 110,
        originalPrice: 150,
        discountPercentage: 27,
        freeShipping: false
      }
    ]
  }
};