#!/bin/bash

# Create necessary directories
mkdir -p public/uploads/products

# Create a test image using ImageMagick if available
if command -v convert &> /dev/null; then
    convert -size 800x600 xc:blue -draw "text 250,300 'Test Product Image'" public/uploads/products/test-image.jpg
    echo "Created test image using ImageMagick"
else
    echo "ImageMagick not found. Please add your own test images to public/uploads/products/"
fi

# Set proper permissions
chmod -R 755 public/uploads

echo "Test environment setup complete!"
echo "You can now test the product management system:"
echo "1. Register/login as a supplier"
echo "2. Go to /supplier/products"
echo "3. Click 'Add New Product'"
echo "4. Fill out the form with test data"
echo "5. Test image upload using the test image in public/uploads/products/" 