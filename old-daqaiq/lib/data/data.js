import { connectToDatabase } from './mongodb';

// Get all products
export async function getProducts(limit = 12, skip = 0) {
  try {
    const { db } = await connectToDatabase();
    const products = await db
      .collection('products')
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();
    
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Get products by category
export async function getCategoryProducts(categorySlug) {
  try {
    const { db } = await connectToDatabase();
    const products = await db
      .collection('products')
      .find({ categorySlug })
      .toArray();
    
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
}

// Get product by slug
export async function getProductBySlug(slug) {
  try {
    const { db } = await connectToDatabase();
    const product = await db.collection('products').findOne({ slug });
    
    if (!product) {
      return null;
    }
    
    return {
      ...product,
      _id: product._id.toString(),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Get categories with counts
export async function getCategories() {
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