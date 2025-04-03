const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const sampleProducts = [
  {
    name: "Car Engine Oil Filter",
    description: "High-quality engine oil filter for optimal engine protection",
    price: 15.99,
    originalPrice: 19.99,
    discount: 20,
    images: [
      "/images/products/oil-filter-1.jpg",
      "/images/products/oil-filter-2.jpg"
    ],
    categorySlug: "car-parts",
    subcategorySlug: "filters",
    brand: "FilterPro",
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
    features: [
      "High filtration efficiency",
      "Durable construction",
      "Easy installation",
      "Long service life"
    ],
    specifications: [
      { name: "Size", value: "Standard" },
      { name: "Material", value: "Metal/Synthetic" },
      { name: "Compatibility", value: "Multiple vehicle types" }
    ]
  },
  {
    name: "Premium Brake Pads",
    description: "High-performance brake pads for reliable stopping power",
    price: 45.99,
    originalPrice: 59.99,
    discount: 23,
    images: [
      "/images/products/brake-pads-1.jpg",
      "/images/products/brake-pads-2.jpg"
    ],
    categorySlug: "car-parts",
    subcategorySlug: "brakes",
    brand: "BrakeMaster",
    rating: 4.8,
    reviewCount: 256,
    stock: 30,
    features: [
      "Superior stopping power",
      "Low noise operation",
      "Dust-free formula",
      "Extended wear life"
    ],
    specifications: [
      { name: "Position", value: "Front/Rear" },
      { name: "Material", value: "Ceramic" },
      { name: "Warranty", value: "2 years" }
    ]
  },
  // Add more products as needed
];

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);
    
    // Clear existing products
    await db.collection('products').deleteMany({});
    
    // Insert sample products
    const result = await db.collection('products').insertMany(sampleProducts);
    
    console.log(`Successfully inserted ${result.insertedCount} products`);
    
    await client.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 