import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('categories').find({}).toArray();

    // Convert ObjectId to string
    const formattedCategories = categories.map(category => ({
      ...category,
      
      _id: category._id.toString(),
    }));

    return new Response(JSON.stringify(formattedCategories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response('Error fetching categories', { status: 500 });
  }
} 