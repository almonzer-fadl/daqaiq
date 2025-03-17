import { MongoClient } from 'mongodb';

// Check if MongoDB URI is defined
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Check if MongoDB database name is defined
if (!process.env.MONGODB_DB) {
  console.error('MONGODB_DB is not defined in environment variables');
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

// Log the MongoDB connection string (with password redacted)
const redactedUri = process.env.MONGODB_URI.replace(
  /mongodb(\+srv)?:\/\/[^:]+:[^@]+@/,
  'mongodb$1://USERNAME:PASSWORD@'
);
console.log('MongoDB URI:', redactedUri);
console.log('MongoDB DB:', process.env.MONGODB_DB);

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log('Connecting to MongoDB...');
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
    });

    const db = client.db(process.env.MONGODB_DB);
    
    // Test the connection by listing collections
    const collections = await db.listCollections().toArray();
    console.log('Connected to MongoDB successfully');
    console.log('Available collections:', collections.map(c => c.name).join(', '));

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error(`Unable to connect to MongoDB: ${error.message}`);
  }
} 