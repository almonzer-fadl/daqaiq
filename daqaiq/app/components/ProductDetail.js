export default function ProductDetail({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.images[0]} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more product details as needed */}
    </div>
  );
} 