const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://daqaiqplus:M98iYMOmfunK8WHL@cluster0.oqol4.mongodb.net/daqaiq?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function insertCategories() {
  try {
    await client.connect();
    const db = client.db("daqaiq");
    const categoriesCollection = db.collection("categories");

    const categories = [
      {
        id: "car-accessories",
        name: "إكسسوارات السيارات",
        slug: "car-accessories",
        description: "إكسسوارات لتحسين وتجميل سيارتك",
        image: "/images/categories/car-accessories.jpg",
        featuredOrder: 5,
        subcategories: [
          { name: "إكسسوارات داخلية", slug: "interior-accessories" },
          { name: "إكسسوارات خارجية", slug: "exterior-accessories" },
          { name: "إكسسوارات ترفيهية", slug: "entertainment-accessories" }
        ]
      },
      {
        id: "spare-parts",
        name: "قطع غيار",
        slug: "spare-parts",
        description: "قطع غيار أصلية وعالية الجودة لجميع أنواع السيارات",
        image: "/images/categories/spare-parts.jpg",
        featuredOrder: 2,
        subcategories: [
          { name: "محركات", slug: "engines" },
          { name: "نظام التعليق", slug: "suspension" },
          { name: "نظام الفرامل", slug: "braking-system" }
        ]
      },
      {
        id: "car-care",
        name: "العناية بالسيارة",
        slug: "car-care",
        description: "منتجات العناية والتنظيف للسيارات",
        image: "/images/categories/car-care.jpg",
        featuredOrder: 3,
        subcategories: [
          { name: "مواد تنظيف", slug: "cleaning-products" },
          { name: "زيوت تشحيم", slug: "lubricants" },
          { name: "منتجات العناية الداخلية", slug: "interior-care" }
        ]
      },
      {
        id: "tires-wheels",
        name: "إطارات وعجلات",
        slug: "tires-wheels",
        description: "إطارات وجنوط لجميع أنواع السيارات",
        image: "/images/categories/tires-wheels.jpg",
        featuredOrder: 4,
        subcategories: [
          { name: "إطارات صيفية", slug: "summer-tires" },
          { name: "إطارات شتوية", slug: "winter-tires" },
          { name: "جنوط", slug: "wheels" }
        ]
      }
    ];

    // Insert categories
    const result = await categoriesCollection.insertMany(categories);
    console.log(`Successfully inserted ${result.insertedCount} categories`);
  } catch (error) {
    console.error("Error inserting categories:", error);
  } finally {
    await client.close();
  }
}

insertCategories();
