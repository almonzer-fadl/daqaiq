import { NextResponse } from 'next/server';
import { seedProducts } from '@/lib/seed/seedProducts';

export async function POST() {
  try {
    const result = await seedProducts();
    
    if (result.success) {
      return NextResponse.json({
        message: `Successfully seeded ${result.count} products`,
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to seed products' },
      { status: 500 }
    );
  }
} 