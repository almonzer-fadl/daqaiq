import { MongoClient } from 'mongodb';

// Check if MongoDB URI is defined
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please add your Mongo URI to .env.local');
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

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then((client) => {
        console.log('MongoDB connected successfully');
        return client;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'daqaiq');
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB database:', db.databaseName);
    
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
} 