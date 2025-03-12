import { Suspense } from 'react';
import CategoryLayout from '../CategoryLayout';
import CategorySidebar from '@/app/components/category/CategorySidebar';
import CategoryProducts from '@/app/components/category/CategoryProducts';
import CategoryHeader from '@/app/components/category/CategoryHeader';
import Loading from '@/app/components/loading';
import styles from '@/app/components/category/category.module.css';
import { getCategoryProducts } from '@/app/lib/data';

export async function generateMetadata({ params }) {
  const categoryName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return {
    title: `${categoryName} | Daqaiq`,
    description: `Explore our collection of ${categoryName} products at Daqaiq`
  };
}

export default async function CategoryPage({ params }) {
  const products = await getCategoryProducts(params.slug);
  const categoryName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <CategoryLayout>
      <div className={styles.categoryPage}>
        <CategoryHeader categoryName={categoryName} productCount={products.length} />
        <div className={styles.categoryContent}>
          <aside className={styles.sidebar}>
            <CategorySidebar category={params.slug} />
          </aside>
          <main className={styles.productsArea}>
            <Suspense fallback={<Loading />}>
              <CategoryProducts products={products} />
            </Suspense>
          </main>
        </div>
      </div>
    </CategoryLayout>
  );
} 