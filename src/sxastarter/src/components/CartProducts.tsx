import { useEffect, useState } from 'react';

export default function CartProducts({ product }) {
  const [productItem, setProduct] = useState({
    productId: 0,
    imageLink: '',
    name: '',
    price: 0,
    description: '',
    itemId: '',
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
        itemId: response.itemId,
      };

      setProduct((productItem) => ({
        ...productItem,
        ...updateproductvalues,
      }));
    };

    response();
  });
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
              marginRight: '12px',
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
      <td>
        <button onClick={() => removeFromCart(productItem.itemId)}>Remove</button>
      </td>
    </tr>
  );
}
const getProduct = async (productId: any) => {
  const res = await fetch('/api/salesforcecommercecloud/getproduct', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(productId),
  });
  const responseProduct = await res.json();
  const response = responseProduct.Product;
  return { response };
};

const removeFromCart = async (itemId: any) => {
  console.log('ItemID:', itemId);
  const res = await fetch('/api/salesforcecommercecloud/removeproductfromcart', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(itemId),
  });
  console.log(JSON.stringify(itemId));
  const responseProduct = await res.json();
  const response = responseProduct.Product;
  return { response };
};
