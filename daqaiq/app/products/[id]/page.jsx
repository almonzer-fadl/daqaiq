import Image from "next/image";

const localImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/parts.png",
  "/parts-phone.png",
  "/about-image.jpg",
];

// Helper function to generate deterministic values
function getProductData(id) {
  const numericId = parseInt(id);
  return {
    id: numericId,
    title: `Product ${numericId}`,
    description: "Discover local brands with amazing discounts during our Eid Shopping Festival. Limited time offer!",
    image: localImages[(numericId - 1) % localImages.length],
    discount: 10 + ((numericId - 1) % 26), // Same discount calculation as ProductGrid
    price: 100 + ((numericId - 1) % 900), // Deterministic price between 100-999
    date: "14-20 March",
  };
}

export default function ProductPage({ params }) {
  const product = getProductData(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
              EID SPECIAL
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="text-2xl font-bold text-red-600">
                {product.discount}% OFF
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-4">
              Offer valid: {product.date}
            </div>
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 