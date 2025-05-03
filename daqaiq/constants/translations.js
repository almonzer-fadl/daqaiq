export const translations = {
  // Auth
  auth: {
    register: {
      title: 'تسجيل حساب جديد',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      submit: 'تسجيل',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      login: 'تسجيل الدخول',
      success: 'تم إنشاء الحساب بنجاح',
      error: 'حدث خطأ أثناء إنشاء الحساب',
      supplier: {
        title: 'تسجيل حساب مورد جديد',
        companyName: 'اسم الشركة',
        commercialRegister: 'السجل التجاري',
        phoneNumber: 'رقم الهاتف',
        address: 'العنوان',
        city: 'المدينة',
        success: 'تم إنشاء حساب المورد بنجاح',
        error: 'حدث خطأ أثناء إنشاء حساب المورد'
      }
    },
    login: {
      title: 'تسجيل الدخول',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      submit: 'دخول',
      forgotPassword: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      register: 'تسجيل حساب جديد',
      error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    },
    forgotPassword: {
      title: 'نسيت كلمة المرور',
      email: 'البريد الإلكتروني',
      submit: 'إرسال رابط إعادة التعيين',
      success: 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني',
      error: 'حدث خطأ أثناء إرسال رابط إعادة التعيين'
    },
    resetPassword: {
      title: 'إعادة تعيين كلمة المرور',
      password: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      submit: 'إعادة تعيين',
      success: 'تم إعادة تعيين كلمة المرور بنجاح',
      error: 'حدث خطأ أثناء إعادة تعيين كلمة المرور'
    }
  },

  // Validation
  validation: {
    required: 'هذا الحقل مطلوب',
    email: 'البريد الإلكتروني غير صالح',
    minLength: 'يجب أن يكون الحقل على الأقل {min} حروف',
    maxLength: 'يجب أن لا يتجاوز الحقل {max} حروف',
    passwordMatch: 'كلمات المرور غير متطابقة',
    phoneNumber: 'رقم الهاتف غير صالح'
  },

  // Common
  common: {
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تمت العملية بنجاح',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    confirm: 'تأكيد',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق'
  }
}; 