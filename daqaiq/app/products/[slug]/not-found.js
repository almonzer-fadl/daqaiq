export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8">
        Sorry, the product you are looking for does not exist or has been removed.
      </p>
      <a
        href="/"
        className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
      >
        Return to Home
      </a>
    </div>
  );
} 