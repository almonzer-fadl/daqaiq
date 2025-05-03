import { connectToDatabase } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

// Add segment config to explicitly mark as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
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
    
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 