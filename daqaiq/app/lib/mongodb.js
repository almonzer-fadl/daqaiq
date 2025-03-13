import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local or in your Vercel project settings'
  );
}

if (!process.env.MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local or in your Vercel project settings'
  );
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    });
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Unable to connect to database. Please check your MongoDB configuration.');
  }
} 