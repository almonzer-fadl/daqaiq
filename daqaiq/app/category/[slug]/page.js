import { connectToDatabase } from '../../lib/mongodb';
import CategorySidebar from '../../components/CategorySidebar';
import ProductGridSection from '../../components/ProductGridSection';
import { notFound } from 'next/navigation';

async function getCategoryProducts(categorySlug, subcategorySlug = null) {
  try {
    const { db } = await connectToDatabase();
    
    // Build query
    const query = { categorySlug };
    if (subcategorySlug) {
      query.subcategorySlug = subcategorySlug;
    }
    
    // Get products
    const products = await db.collection('products').find(query).toArray();
    
    // Format products
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const { db } = await connectToDatabase();
    
    // Get distinct category slugs
    const categorySlugs = await db.collection('products').distinct('categorySlug');
    
    // Get category details with product counts
    const categories = await Promise.all(
      categorySlugs.map(async (slug) => {
        const count = await db.collection('products').countDocuments({ categorySlug: slug });
        
        // Get subcategories for this category
        const subcategorySlugs = await db.collection('products')
          .distinct('subcategorySlug', { categorySlug: slug });
        
        // Get subcategory details with product counts
        const subcategories = await Promise.all(
          subcategorySlugs.map(async (subSlug) => {
            if (!subSlug) return null;
            
            const subCount = await db.collection('products')
              .countDocuments({ categorySlug: slug, subcategorySlug: subSlug });
            
            return {
              slug: subSlug,
              name: subSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              count: subCount
            };
          })
        );
        
        // Filter out null subcategories
        const filteredSubcategories = subcategories.filter(sub => sub !== null);
        
        return {
          slug,
          name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          count,
          subcategories: filteredSubcategories
        };
      })
    );
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const categorySlug = params.slug;
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${categoryName} - Shop our Collection`,
    description: `Browse our collection of ${categoryName.toLowerCase()} products.`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const categorySlug = params.slug;
  const subcategorySlug = searchParams.subcategory;
  
  const products = await getCategoryProducts(categorySlug, subcategorySlug);
  const categories = await getCategories();
  
  // Find the current category
  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  
  if (!currentCategory) {
    notFound();
  }
  
  const categoryName = currentCategory.name;
  
  // Find the current subcategory if applicable
  let subcategoryName = null;
  if (subcategorySlug && currentCategory.subcategories) {
    const subcategory = currentCategory.subcategories.find(sub => sub.slug === subcategorySlug);
    if (subcategory) {
      subcategoryName = subcategory.name;
    }
  }
  
  const title = subcategoryName ? `${subcategoryName} - ${categoryName}` : categoryName;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <CategorySidebar 
            categories={categories} 
            currentCategorySlug={categorySlug}
            currentSubcategorySlug={subcategorySlug}
          />
        </div>
        
        <div className="md:w-3/4">
          {products.length > 0 ? (
            <ProductGridSection products={products} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">No products found</h2>
              <p className="mt-2 text-gray-500">
                We couldn't find any products in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 