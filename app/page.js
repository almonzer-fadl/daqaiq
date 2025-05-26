import { headers } from 'next/headers';
import SupplierLanding from './supplier/page';
import HeroSlider from '@/components/HeroSlider';
import CategorySlider from '@/components/category-slider/CategorySlider';
import ProductSlider from '@/components/products/ProductSlider';

// Dummy data for initial render
const dummyProducts = [
  {
    id: 1,
    name: "زيت محرك سينثيتك",
    price: 149.99,
    image: "/images/products/oil.jpg",
    category: "oils"
  },
  {
    id: 2,
    name: "فلتر زيت عالي الجودة",
    price: 49.99,
    image: "/images/products/filter.jpg",
    category: "filters"
  },
  {
    id: 3,
    name: "بطارية سيارة متميزة",
    price: 599.99,
    image: "/images/products/battery.jpg",
    category: "batteries"
  }
];

export default function RootPage() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const isSupplierSubdomain = host.startsWith('supplier.');

  if (isSupplierSubdomain) {
    return <SupplierLanding />;
  }

  // Your main website landing page here
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <HeroSlider />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 mb-12">
        <CategorySlider />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-12">
        <ProductSlider 
          categoryData={{
            title: "منتجات مميزة",
            products: dummyProducts
          }}
          sectionId="featured"
        />
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 mb-12">
        <ProductSlider 
          categoryData={{
            title: "وصل حديثاً",
            products: dummyProducts
          }}
          sectionId="new-arrivals"
        />
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 mb-12">
        <ProductSlider 
          categoryData={{
            title: "الأكثر مبيعاً",
            products: dummyProducts
          }}
          sectionId="best-sellers"
        />
      </section>

    </main>
  );
}