import { seedDatabase } from '@/lib/seed';

export async function POST() {
  try {
    const result = await seedDatabase();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Seed database error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 