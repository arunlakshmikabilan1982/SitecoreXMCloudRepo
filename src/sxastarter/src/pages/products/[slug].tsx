import Image from 'next/image';
import { getProductById } from '../api/salesforcecommercecloud/sfcc';

export default function Product({ product }) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto flex flex-col sm:flex-row">
          <Image
            alt="coffee"
            className="rounded-lg"
            src={product.imageGroups[0].images[0].link}
            width={560}
            height={640}
          />
          <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
            <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              {product.name}
            </h1>
            <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
              ${product.price}
            </h1>
            <p className="max-w-xl">{product.longDescription}</p>
          </div>
          <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
            <p>
              <button id="addtowishlist" onClick={() => addToWishlist(product.id)}>
                Add to Wishlist
              </button>
            </p>
          </div>
          <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
            <p>
              <button id="addtowishlist" onClick={() => addToCart(product.variants[2].productId)}>
                Add to Cart
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const addToWishlist = async (productId: any) => {
  console.log('productID:', productId);
  const res = await fetch('/api/salesforcecommercecloud/addproducttowishlist', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(productId),
  });
  console.log(JSON.stringify(productId));
  const response = await res.json();
  console.log('addToWishLIst:', response);
};

const addToCart = async (productId: any) => {
  console.log('productID:', productId);
  const res = await fetch('/api/salesforcecommercecloud/addproducttocart', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(productId),
  });
  console.log(JSON.stringify(productId));
  const response = await res.json();
  console.log('addToWishLIst:', response);
};

export const getServerSideProps = async ({ params }) => {
  const productID = params.slug;
  console.log(productID);
  const searchResults = await getProductById(productID);
  return {
    props: {
      product: searchResults,
    },
  };
};

// export async function getStaticPaths() {
//   const coffeeProducts = await getProducts('womens');
//   const fullPaths: any[] = [];

//   for (const product of coffeeProducts) {
//     fullPaths.push({ params: { slug: product.id } });
//   }

//   return {
//     paths: fullPaths,
//     fallback: 'blocking',
//   };
// }
