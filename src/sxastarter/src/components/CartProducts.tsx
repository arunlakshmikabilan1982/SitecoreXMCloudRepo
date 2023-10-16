import { useEffect, useState } from 'react';

export default function CartProducts({ product }) {
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
  });
  console.log('Wishlist Product', productItem);
  return (
    <tr key={productItem.productId} className="border-b">
      <td>
        <a href={`/product/${productItem.name}`} className="flex items-center">
          <img
            src={productItem.imageLink}
            alt={productItem.name}
            width={50}
            height={50}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          {productItem.name}
        </a>
      </td>
      <td className="p-5 text-right">
        <select>
          {[...Array(10).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </td>
      <td className="p-5 text-right">INR {productItem.price}</td>
    </tr>
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
