import { connectToDatabase } from '@/lib/mongodb';
import CategorySidebar from '@/components/CategorySidebar';
import ProductGridSection from '@/components/ProductGridSection';
import { notFound } from 'next/navigation';

async function getCategoryProducts(categorySlug, subcategorySlug = null) {
  try {
    const { db } = await connectToDatabase();
    
    // Build query based on whether we're looking for a category or subcategory
    let query = {};
    
    // First check if the slug matches a subcategory
    const productsAsSubcategory = await db.collection('products')
      .find({ subcategory: categorySlug })
      .toArray();
    
    // If found as subcategory, return those products
    if (productsAsSubcategory.length > 0) {
      console.log(`Found ${productsAsSubcategory.length} products with subcategory ${categorySlug}`);
      return productsAsSubcategory.map(product => ({
        ...product,
        _id: product._id.toString()
      }));
    }
    
    // If not found as subcategory, look for it as main category
    query = { category: categorySlug };
    if (subcategorySlug) {
      query.subcategory = subcategorySlug;
    }
    
    console.log('Fetching products with query:', query);
    
    // Get products
    const products = await db.collection('products').find(query).toArray();
    console.log(`Found ${products.length} products for category ${categorySlug}`);
    
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
    
    // Get all categories from the categories collection
    const categories = await db.collection('categories').find({}).toArray();
    console.log('Found categories:', categories.length);
    
    // Get product counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        // Count products where either category matches or subcategory matches
        const count = await db.collection('products').countDocuments({
          $or: [
            { category: category.slug },
            { subcategory: category.slug }
          ]
        });
        console.log(`Category ${category.slug} has ${count} products`);
        
        // Get subcategories if they exist
        let subcategories = [];
        if (category.subcategories && category.subcategories.length > 0) {
          subcategories = await Promise.all(
            category.subcategories.map(async (sub) => {
              const subCount = await db.collection('products')
                .countDocuments({ subcategory: sub.slug });
              
              return {
                ...sub,
                count: subCount
              };
            })
          );
        }
        
        return {
          ...category,
          _id: category._id.toString(),
          count,
          subcategories
        };
      })
    );
    
    return categoriesWithCounts;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  const { db } = await connectToDatabase();
  const category = await db.collection('categories').findOne({ slug });
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    };
  }
  
  return {
    title: `${category.name} - Shop our Collection`,
    description: `Browse our collection of ${category.name.toLowerCase()} products.`,
  };
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params, searchParams }) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  
  const categorySlug = resolvedParams.slug;
  const subcategorySlug = resolvedSearchParams.subcategory;
  
  const [products, categories] = await Promise.all([
    getCategoryProducts(categorySlug, subcategorySlug),
    getCategories()
  ]);
  
  // Find the current category
  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  
  if (!currentCategory) {
    notFound();
  }
  
  // Find the current subcategory if applicable
  let subcategoryName = null;
  if (subcategorySlug && currentCategory.subcategories) {
    const subcategory = currentCategory.subcategories.find(sub => sub.slug === subcategorySlug);
    if (subcategory) {
      subcategoryName = subcategory.name;
    }
  }
  
  const title = subcategoryName 
    ? `${subcategoryName} - ${currentCategory.name}` 
    : currentCategory.name;
  
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