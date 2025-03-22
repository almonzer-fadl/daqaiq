const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { connectToDatabase, User, Product, Order } = require('./test-config');

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function generateTestData() {
  try {
    await connectToDatabase();
    console.log('Connected to database');

    // Drop collections
    try {
      await mongoose.connection.dropCollection('products');
      await mongoose.connection.dropCollection('orders');
      console.log('Dropped existing collections');
    } catch (error) {
      console.log('Collections may not exist, continuing...');
    }

    // Create test supplier if not exists
    const hashedPassword = await bcrypt.hash('test123', 12);
    const supplier = await User.findOneAndUpdate(
      { email: 'supplier@test.com' },
      {
        name: 'Test Supplier',
        email: 'supplier@test.com',
        password: hashedPassword,
        role: 'supplier',
        companyName: 'Test Company',
        phone: '123-456-7890',
        address: '123 Test St, Test City, TS 12345',
      },
      { upsert: true, new: true }
    );
    console.log('Test supplier created/updated');

    // Create test customer if not exists
    const customer = await User.findOneAndUpdate(
      { email: 'customer@test.com' },
      {
        name: 'Test Customer',
        email: 'customer@test.com',
        password: hashedPassword,
        role: 'customer',
      },
      { upsert: true, new: true }
    );
    console.log('Test customer created/updated');

    // Create test products
    const products = [];
    const categories = ['Electronics', 'Clothing', 'Books', 'Home'];
    const productNames = [
      'Premium Laptop',
      'Wireless Headphones',
      'Designer T-Shirt',
      'Best-Selling Novel',
      'Smart Home Hub'
    ];

    for (let i = 0; i < productNames.length; i++) {
      const product = await Product.create({
        name: productNames[i],
        slug: generateSlug(productNames[i]),
        description: `Description for ${productNames[i]}`,
        price: Math.floor(Math.random() * 900) + 100,
        category: categories[Math.floor(Math.random() * categories.length)],
        stock: Math.floor(Math.random() * 100),
        lowStockThreshold: 10,
        supplier: supplier._id,
        images: [`https://picsum.photos/400/400?random=${i}`],
      });
      products.push(product);
    }
    console.log('Test products created');

    // Create test orders
    const orderStatuses = ['pending', 'processing', 'shipped', 'delivered'];
    const pastDates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    });

    for (const date of pastDates) {
      const numOrders = Math.floor(Math.random() * 3) + 1; // 1-3 orders per day
      
      for (let i = 0; i < numOrders; i++) {
        const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
        const items = [];
        
        for (let j = 0; j < numItems; j++) {
          const product = products[Math.floor(Math.random() * products.length)];
          items.push({
            product: product._id,
            quantity: Math.floor(Math.random() * 3) + 1,
            price: product.price,
          });
        }

        await Order.create({
          customer: customer._id,
          supplier: supplier._id,
          items,
          status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
          shippingAddress: {
            fullName: customer.name,
            addressLine1: '456 Customer St',
            city: 'Customer City',
            state: 'CS',
            postalCode: '54321',
            country: 'United States',
            phone: '098-765-4321',
          },
          createdAt: date,
        });
      }
    }
    console.log('Test orders created');

    console.log('Test data generation completed successfully');
  } catch (error) {
    console.error('Error generating test data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
}

generateTestData(); 