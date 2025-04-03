// ./app/data/productData.js

export const carProducts = {
  Offers: {
    title: "عروض السيارات",
    services: [
      {
        id: "car-offer-1",
        title: "زيت محرك سينثيتك",
        description: "زيت محرك عالي الجودة لجميع أنواع السيارات",
        image: "/images/car-oil.jpg",
        rating: 4.5,
        reviewCount: 120,
        discountPrice: 75,
        originalPrice: 95,
        discountPercentage: 21,
        badge: "الأكثر مبيعاً",
        badgeColor: "#FF6B6B",
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "car-offer-2",
        title: "منظف داخلي للسيارة",
        description: "منظف داخلي متعدد الاستخدامات للسيارة",
        image: "/images/car-cleaner.jpg",
        rating: 4.2,
        reviewCount: 84,
        discountPrice: 45,
        originalPrice: 60,
        discountPercentage: 25,
        freeShipping: false
      },
      {
        id: "car-offer-3",
        title: "شاحن سيارة USB",
        description: "شاحن سريع للسيارة مع منفذين USB",
        image: "/images/car-charger.jpg",
        rating: 4.7,
        reviewCount: 156,
        discountPrice: 35,
        originalPrice: 50,
        discountPercentage: 30,
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "car-offer-4",
        title: "حامل هاتف للسيارة",
        description: "حامل هاتف مغناطيسي لتثبيت الهاتف أثناء القيادة",
        image: "/images/car-phone-holder.jpg",
        rating: 4.0,
        reviewCount: 92,
        discountPrice: 40,
        originalPrice: 65,
        discountPercentage: 38,
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "car-offer-5",
        title: "مضخة هواء محمولة",
        description: "مضخة هواء رقمية لإطارات السيارة",
        image: "/images/car-air-pump.jpg",
        rating: 4.6,
        reviewCount: 78,
        discountPrice: 120,
        originalPrice: 150,
        discountPercentage: 20,
        badge: "عرض محدود",
        badgeColor: "#5CB85C",
        freeShipping: false
      }
    ]
  },
  SpareParts: {
    title: "قطع غيار السيارات",
    services: [
      {
        id: "spare-part-1",
        title: "فلتر زيت بريميوم",
        description: "فلتر زيت عالي الجودة يناسب معظم السيارات",
        image: "/images/oil-filter.jpg",
        rating: 4.8,
        reviewCount: 203,
        discountPrice: 25,
        originalPrice: 35,
        discountPercentage: 29,
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "spare-part-2",
        title: "شمعات إشعال إيريديوم",
        description: "مجموعة من 4 شمعات إشعال عالية الأداء",
        image: "/images/spark-plugs.jpg",
        rating: 4.5,
        reviewCount: 117,
        discountPrice: 85,
        originalPrice: 110,
        discountPercentage: 23,
        badge: "توصية الخبراء",
        badgeColor: "#428BCA",
        freeShipping: false
      },
      {
        id: "spare-part-3",
        title: "مساحات زجاج أمامي",
        description: "مساحات سيليكون عالية الجودة مقاومة للماء",
        image: "/images/wipers.jpg",
        rating: 4.3,
        reviewCount: 94,
        discountPrice: 55,
        originalPrice: 75,
        discountPercentage: 27,
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "spare-part-4",
        title: "فلتر هواء رياضي",
        description: "فلتر هواء عالي الأداء للسيارات الرياضية",
        image: "/images/air-filter.jpg",
        rating: 4.7,
        reviewCount: 142,
        discountPrice: 110,
        originalPrice: 150,
        discountPercentage: 27,
        freeShipping: false
      },
      {
        id: "spare-part-5",
        title: "بطارية سيارة 12 فولت",
        description: "بطارية سيارة ذات أداء عالي مع ضمان لمدة 3 سنوات",
        image: "/images/car-battery.jpg",
        rating: 4.9,
        reviewCount: 231,
        discountPrice: 320,
        originalPrice: 400,
        discountPercentage: 20,
        badge: "الأفضل مبيعاً",
        badgeColor: "#FF6B6B",
        freeShipping: true,
        shippingText: "شحن مجاني"
      }
    ]
  },
  Accessories: {
    title: "اكسسوارات السيارات",
    services: [
      {
        id: "accessory-1",
        title: "دعاسات أرضية فاخرة",
        description: "مجموعة دعاسات أرضية مقاومة للماء وسهلة التنظيف",
        image: "/images/floor-mats.jpg",
        rating: 4.4,
        reviewCount: 87,
        discountPrice: 95,
        originalPrice: 120,
        discountPercentage: 21,
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "accessory-2",
        title: "غطاء مقود جلد",
        description: "غطاء مقود من الجلد الفاخر مريح ومقاوم للانزلاق",
        image: "/images/steering-cover.jpg",
        rating: 4.2,
        reviewCount: 63,
        discountPrice: 65,
        originalPrice: 90,
        discountPercentage: 28,
        freeShipping: false
      },
      {
        id: "accessory-3",
        title: "مصابيح LED داخلية",
        description: "مجموعة إضاءة LED داخلية للسيارة مع تحكم عن بعد",
        image: "/images/interior-lights.jpg",
        rating: 4.6,
        reviewCount: 105,
        discountPrice: 75,
        originalPrice: 100,
        discountPercentage: 25,
        badge: "موصى به",
        badgeColor: "#5CB85C",
        freeShipping: true,
        shippingText: "شحن مجاني"
      },
      {
        id: "accessory-4",
        title: "وسادة مسند رقبة",
        description: "وسادة مسند رقبة مريحة للرحلات الطويلة",
        image: "/images/neck-pillow.jpg",
        rating: 4.3,
        reviewCount: 78,
        discountPrice: 40,
        originalPrice: 55,
        discountPercentage: 27,
        freeShipping: false
      },
      {
        id: "accessory-5",
        title: "حقيبة تنظيم الأمتعة",
        description: "حقيبة متينة لتنظيم الأمتعة في صندوق السيارة",
        image: "/images/trunk-organizer.jpg",
        rating: 4.5,
        reviewCount: 92,
        discountPrice: 85,
        originalPrice: 110,
        discountPercentage: 23,
        freeShipping: true,
        shippingText: "شحن مجاني"
      }
    ]
  }
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