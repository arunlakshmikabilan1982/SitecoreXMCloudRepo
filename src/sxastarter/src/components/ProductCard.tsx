// import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const url = `/mall-pages/shop/products-list/womenscollection`;

  return (
      <div className="col-md-6 col-lg-4 col-xl-3">
            <div id={product.id} className="single-product">
          
                <div className="part-2">
                <img
          src={product.imageGroups[0].images[0].link}
          alt={product.imageGroups[0].images[0].title}
          width={250}
          height={250}
        />
                    <h3 className="product-title">{product.name}</h3>
                    <h4 className="product-price">{product.shortDescription}</h4>
                    <h4 className="product-price">{product.price}</h4>
                    
                </div>
                <Link href={url}>Go to Product</Link>
            </div>
          
        </div>


  );
}
