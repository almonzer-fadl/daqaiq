import Image from 'next/image';
import Link from 'next/link';

export default function HeroMain() {
  return (
    <div className="hero min-h-[70vh] bg-base-200 rounded-xl overflow-hidden relative">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="relative w-full max-w-[600px] h-[400px]">
          <Image
            src="/images/hero1.jpg"
            alt="Luxury Car"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="rounded-lg shadow-2xl object-cover"
            priority
            quality={90}
          />
        </div>
        <div className="max-w-md text-right">
          <h1 className="text-5xl font-bold mb-4">قطع غيار السيارات الفاخرة</h1>
          <p className="py-6">
            اكتشف مجموعتنا الواسعة من قطع غيار السيارات والإكسسوارات عالية الجودة.
            من ترقيات الأداء إلى قطع الصيانة الأساسية، لدينا كل ما تحتاجه لسيارتك.
          </p>
          <div className="flex gap-4 justify-end">
            <Link 
              href="/products" 
              className="btn btn-primary"
            >
              تصفح المنتجات
            </Link>
            <Link 
              href="/contact" 
              className="btn btn-outline"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 