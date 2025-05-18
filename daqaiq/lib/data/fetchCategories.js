import { connectToDatabase } from './mongodb'; // Adjust the path if necessary

export async function getCategories() {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('categories').find({}).toArray();
    
    // Convert ObjectId to string
    return categories.map(category => ({
      ...category,
      _id: category._id.toString(), // Convert ObjectId to string
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
} 