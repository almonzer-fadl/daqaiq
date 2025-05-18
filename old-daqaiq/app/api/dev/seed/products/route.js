import { seedProducts } from '@/lib/seed/seedProducts';

export async function POST() {
  try {
    const result = await seedProducts();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Seed products error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 