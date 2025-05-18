import Link from 'next/link';
import Image from 'next/image';

export default function FooterMain() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo-white.png"
                alt="Daqaiq Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400">
              نقدم خدمات صيانة السيارات بأعلى جودة وأفضل الأسعار
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  منتجاتنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/oil-change" className="text-gray-400 hover:text-white">
                  تغيير الزيت
                </Link>
              </li>
              <li>
                <Link href="/category/brake-service" className="text-gray-400 hover:text-white">
                  صيانة الفرامل
                </Link>
              </li>
              <li>
                <Link href="/category/battery-service" className="text-gray-400 hover:text-white">
                  خدمة البطارية
                </Link>
              </li>
              <li>
                <Link href="/category/tire-service" className="text-gray-400 hover:text-white">
                  خدمة الإطارات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <i className="fas fa-map-marker-alt mr-2"></i>
                الرياض، المملكة العربية السعودية
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-phone mr-2"></i>
                +966 50 000 0000
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-envelope mr-2"></i>
                info@daqaiq.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} دقائق. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
} 