import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {

  return (
    <Link href={`/products/${product.id}`} className="group">
<div className="product-item">
    <img src={product.imageGroups[0].images[0].link} alt={product.imageGroups[0].images[0].title} className="product-image" width={300} height={280} />
    <h3 className="product-title">{product.name}</h3>
    <p className="product-description">{product.shortDescription}</p>
    <div className="product-details">
      <p className="product-price">{product.price}</p>
    </div>
  </div>

    </Link>
  );
}
