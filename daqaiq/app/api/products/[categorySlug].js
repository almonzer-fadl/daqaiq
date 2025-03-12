import { getCategoryProducts } from '@/app/lib/data';

export default async function handler(req, res) {
  const { categorySlug } = req.query;
  const { priceRanges, brands, sizes, colors } = req.body;

  try {
    let products = await getCategoryProducts(categorySlug);

    // Apply filters
    if (priceRanges && priceRanges.length > 0) {
      products = products.filter(product =>
        priceRanges.some(range => {
          const [min, max] = range.split('-').map(Number);
          return product.price >= min && (max ? product.price <= max : true);
        })
      );
    }

    if (brands && brands.length > 0) {
      products = products.filter(product => brands.includes(product.brand));
    }

    if (sizes && sizes.length > 0) {
      products = products.filter(product => sizes.some(size => product.sizes.includes(size)));
    }

    if (colors && colors.length > 0) {
      products = products.filter(product => colors.includes(product.color));
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
} 