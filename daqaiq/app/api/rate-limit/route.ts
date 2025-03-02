import { NextResponse } from 'next/server';

const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 100; // per window
const store = new Map();

export async function POST(request: Request) {
  try {
    const { ip } = await request.json();
    const now = Date.now();
    const windowStart = now - WINDOW_MS;
    
    // Clean old entries
    store.forEach((value, key) => {
      if (value.timestamp < windowStart) {
        store.delete(key);
      }
    });

    const current = store.get(ip) || { count: 0, timestamp: now };
    
    if (current.timestamp < windowStart) {
      current.count = 0;
      current.timestamp = now;
    }
    
    current.count++;
    store.set(ip, current);

    if (current.count > MAX_REQUESTS) {
      return new NextResponse(null, { status: 429 });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Rate limit error:', error);
    return new NextResponse(null, { status: 500 });
  }
}