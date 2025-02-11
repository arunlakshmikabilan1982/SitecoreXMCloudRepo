import { useEffect, useState } from 'react';

// function cn(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

export default function WishlistCartProduct({ product }) {
  // const [isLoading, setLoading] = useState(true);
  const [productItem, setProduct] = useState({
    productId: 0,
    imageLink: '',
    name: '',
    price: 0,
    description: '',
  });
  useEffect(() => {
    const response = async () => {
      const { response } = await getProduct(product);
      let updateproductvalues = {};
      updateproductvalues = {
        productId: response.id,
        imageLink: response.imageGroups[0].images[0].link,
        name: response.name,
        price: response.price,
        decription: response.longDescription,
      };

      setProduct((productItem) => ({
        ...productItem,
        ...updateproductvalues,
      }));
    };

    response();
  }, []);
  console.log('Wishlist Product', productItem);
  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div id={product.id} className="wishlist-single-product">
        <div className="part-2">
          <img src={productItem.imageLink} width={250} height={250} />
          <h3 className="product-title">{productItem.name}</h3>
          <h4 className="product-price">{productItem.description}</h4>
          <h4 className="product-price">${productItem.price}</h4>
        </div>
      </div>
    </div>
  );
}
const getProduct = async (productId: any) => {
  console.log('productID:', productId);
  const res = await fetch('/api/salesforcecommercecloud/getproduct', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(productId),
  });
  console.log(JSON.stringify(productId));
  const responseProduct = await res.json();
  const response = responseProduct.Product;
  console.log('Product:', response);
  return { response };
};
