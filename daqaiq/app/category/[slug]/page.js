import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CategoryLayout from '../CategoryLayout';
import CategorySidebar from '../../components/category/CategorySidebar.js';
import CategoryProducts from '../../components/category/CategoryProducts.js';
import CategoryHeader from '../../components/category/CategoryHeader.js';
import Loading from '../../components/loading';
import styles from '../../components/category/category.module.css';
import { categories } from '../../data/categories';

export async function generateMetadata({ params, searchParams }) {
  // Await params and searchParams to fix the Next.js error
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  
  const slug = resolvedParams.slug;
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return {
      title: 'Category Not Found | Daqaiq',
      description: 'The requested category could not be found.'
    };
  }
  
  const subcategorySlug = resolvedSearchParams?.subcategory;
  let title = category.name;
  
  if (subcategorySlug) {
    const subcategory = category.subcategories.find(sub => sub.slug === subcategorySlug);
    if (subcategory) {
      title = `${subcategory.name} - ${category.name}`;
    }
  }
  
  return {
    title: `${title} | Daqaiq`,
    description: category.description
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params, searchParams }) {
  // Await params and searchParams to fix the Next.js error
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  
  const slug = resolvedParams.slug;
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    notFound();
  }

  // Filter products by category slug and optionally by subcategory
  let products = sampleProducts.filter(product => product.categorySlug === slug);
  const subcategorySlug = resolvedSearchParams?.subcategory;
  
  if (subcategorySlug) {
    const subcategory = category.subcategories.find(sub => sub.slug === subcategorySlug);
    if (subcategory) {
      // This is where you would filter products by subcategory
    }
  }

  return (
    <CategoryLayout>
      <div className={styles.categoryPage}>
        <CategoryHeader 
          categoryName={subcategorySlug 
            ? category.subcategories.find(sub => sub.slug === subcategorySlug)?.name || category.name
            : category.name
          } 
          productCount={products.length}
        />
        <div className={styles.categoryContent}>
          <aside className={`${styles.sidebar} ${styles.filterSidebar}`}>
            <CategorySidebar category={slug} />
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