export const SUPPLIER_TRANSLATIONS = {
  // Auth
  auth: {
    signin: {
      title: 'تسجيل دخول المورد',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      submit: 'تسجيل الدخول',
      forgotPassword: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      register: 'قم بإنشاء حساب جديد',
      error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      rememberMe: 'تذكرني',
      loading: 'جاري تسجيل الدخول...'
    },
    signup: {
      title: 'تسجيل حساب مورد جديد',
      name: 'اسم المسؤول',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      companyName: 'اسم الشركة',
      phone: 'رقم الجوال',
      phonePlaceholder: '05xxxxxxxx أو +9665xxxxxxxx',
      businessType: 'نوع النشاط التجاري',
      businessTypes: {
        manufacturer: 'مصنع',
        distributor: 'موزع',
        retailer: 'تاجر تجزئة',
        other: 'أخرى'
      },
      taxId: 'الرقم الضريبي',
      submit: 'إنشاء حساب',
      haveAccount: 'لديك حساب بالفعل؟',
      login: 'قم بتسجيل الدخول',
      loading: 'جاري إنشاء الحساب...',
      success: 'تم إنشاء الحساب بنجاح',
      successMessage: 'تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.'
    },
    forgotPassword: {
      title: 'نسيت كلمة المرور؟',
      subtitle: 'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور',
      email: 'البريد الإلكتروني',
      submit: 'إرسال رابط إعادة التعيين',
      backToLogin: 'العودة إلى تسجيل الدخول',
      success: 'تم إرسال رابط إعادة التعيين',
      loading: 'جاري الإرسال...'
    },
    resetPassword: {
      title: 'إعادة تعيين كلمة المرور',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      submit: 'إعادة تعيين كلمة المرور',
      success: 'تم إعادة تعيين كلمة المرور بنجاح',
      loading: 'جاري إعادة التعيين...'
    }
  },

  // Landing Page
  landing: {
    title: 'ابدأ البيع مع دقائق',
    subtitle: 'وانمي تجارتك',
    description: 'انضم إلى مجتمع الموردين في دقائق وواصل إلى آلاف العملاء المحتملين. نوفر لك منصة متكاملة لإدارة مبيعاتك وتنمية اعمالك',
    startNow: 'ابدأ الآن',
    login: 'تسجيل الدخول',
    featuresTitle: 'مميزات المنصة',
    featuresDescription: 'كل ما تحتاجه لإدارة وتنمية تجارتك في مكان واحد',
    feature1Title: 'نمو سريع',
    feature1Description: 'اصل إلى آلاف العملاء المحتملين وانمي مبيعاتك بشكل سريع',
    feature2Title: 'إدارة سهلة',
    feature2Description: 'لوحة تحكم متكاملة لإدارة منتجاتك وطلباتك بكل سهولة',
    feature3Title: 'دعم متواصل',
    feature3Description: 'فريق دعم متخصص لمساعدتك في كل خطوة'
  },

  // Navigation
  nav: {
    dashboard: 'لوحة التحكم',
    products: 'المنتجات',
    orders: 'الطلبات',
    inventory: 'المخزون',
    analytics: 'التحليلات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    editProfile: 'تعديل الملف الشخصي'
  },

  // Dashboard
  dashboard: {
    welcome: 'مرحباً',
    metrics: {
      totalSales: 'إجمالي المبيعات',
      monthlyRevenue: 'الإيرادات الشهرية',
      averageOrderValue: 'متوسط قيمة الطلب',
      totalOrders: 'إجمالي الطلبات',
      totalProducts: 'إجمالي المنتجات',
      pendingOrders: 'الطلبات المعلقة',
      rating: 'التقييم',
      reviews: 'التقييمات',
      totalRevenue: 'إجمالي الإيرادات'
    },
    quickActions: {
      title: 'إجراءات سريعة',
      viewOrders: 'عرض الطلبات',
      manageProducts: 'إدارة المنتجات',
      manageInventory: 'إدارة المخزون',
      viewAnalytics: 'عرض التحليلات'
    }
  },

  // Products
  products: {
    title: 'المنتجات',
    add: {
      title: 'إضافة منتج جديد',
      images: {
        main: 'الصورة الرئيسية',
        additional: 'صور إضافية',
        upload: 'رفع صور',
        add: 'إضافة المزيد'
      },
      details: {
        title: 'تفاصيل المنتج',
        name: 'اسم المنتج',
        description: 'وصف المنتج',
        price: 'السعر',
        category: 'الفئة',
        status: 'الحالة',
        stock: 'المخزون'
      }
    },
    status: {
      active: 'نشط',
      inactive: 'غير نشط',
      draft: 'مسودة'
    },
    actions: {
      edit: 'تعديل',
      delete: 'حذف',
      save: 'حفظ',
      cancel: 'إلغاء'
    }
  },

  // Orders
  orders: {
    title: 'الطلبات',
    details: {
      title: 'طلب',
      placed: 'تم الطلب في',
      orderNumber: 'رقم الطلب',
      orderDate: 'تاريخ الطلب',
      status: 'الحالة',
      customer: 'العميل',
      customerInfo: 'معلومات العميل',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الجوال',
      total: 'المجموع',
      items: 'المنتجات',
      quantity: 'الكمية',
      shipping: 'الشحن',
      payment: 'الدفع',
      summary: 'ملخص الطلب',
      subtotal: 'المجموع الفرعي'
    },
    status: {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      shipped: 'تم الشحن',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي'
    },
    actions: {
      viewDetails: 'عرض التفاصيل',
      updateStatus: 'تحديث الحالة'
    },
    notFound: 'الطلب غير موجود',
    notFoundMessage: 'الطلب الذي تبحث عنه غير موجود أو ليس لديك صلاحية لعرضه.'
  },

  // Inventory
  inventory: {
    title: 'إدارة المخزون',
    stock: {
      current: 'المخزون الحالي',
      low: 'مخزون منخفض',
      out: 'نفذ المخزون',
      threshold: 'حد المخزون المنخفض'
    },
    actions: {
      increase: 'زيادة',
      decrease: 'نقصان',
      set: 'تعيين',
      update: 'تحديث',
      bulkUpdate: 'تحديث جماعي'
    }
  },

  // Analytics
  analytics: {
    title: 'التحليلات',
    sections: {
      salesOverview: 'نظرة عامة على المبيعات',
      topProducts: 'أفضل المنتجات',
      salesByCategory: 'المبيعات حسب الفئة',
      recentSales: 'المبيعات الأخيرة'
    },
    periods: {
      weekly: 'أسبوعي',
      monthly: 'شهري',
      yearly: 'سنوي'
    }
  },

  // Common
  common: {
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    retry: 'إعادة المحاولة',
    success: 'تمت العملية بنجاح',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    all: 'الكل',
    noData: 'لا توجد بيانات',
    loadMore: 'تحميل المزيد',
    required: 'مطلوب',
    optional: 'اختياري',
    back: 'رجوع',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    passwordTooShort: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    passwordMismatch: 'كلمة المرور غير متطابقة',
    invalidPhone: 'رقم الجوال غير صالح',
    invalidTaxId: 'الرقم الضريبي غير صالح',
    profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
    profileUpdateFailed: 'فشل تحديث الملف الشخصي'
  }
}; 