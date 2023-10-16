import React, { useEffect, useState } from 'react';
import { useSitecoreContext, SiteInfo, PosResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';
import { init } from '@sitecore/engage';
import { useRouter } from 'next/navigation';
import CartProducts from './CartProducts';

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export const Default = (): JSX.Element => {
  // const updateCartHandler = (item: CartItem, qty: any) => {
  //   const quantity = Number(qty);
  //   const getIndex = productsArray.findIndex((obj) => {
  //     return obj.id === item.id;
  //   });
  //   productsArray[getIndex].quantity = quantity;
  //   console.log('update quantity', quantity);
  //   console.log('update quantity', products[getIndex].quantity);
  //   const total = productsArray.reduce((a, c) => a + c.quantity * c.price, 0);
  //   setTotalAmount(total);
  // };
  const getwishlistcartitems = async () => {
    const res = await fetch('/api/salesforcecommercecloud/getwishlistcartitems', {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    });
    const response = await res.json();
    const basket = response.BasketItems;
    return { basket };
  };
  const getProduct = async (productId: any) => {
    const res = await fetch('/api/salesforcecommercecloud/getproduct', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    });
    const responseProduct = await res.json();
    const getProductItem = responseProduct.Product;
    return { getProductItem };
  };
  const products: Array<CartItem> = [];
  const [basketItems, setWishlistItems] = useState([]);
  const [productsArray, setProductsArray] = useState(Array<CartItem>);
  useEffect(() => {
    const response = async () => {
      const { basket } = await getwishlistcartitems();
      const basketItems = basket.productItems;
      const total = basketItems.reduce((a, c) => a + c.quantity * c.price, 0);
      setTotalAmount(total);
      setWishlistItems(basketItems);
      addProducts(basketItems);
    };

    response();
  }, []);

  const addProducts = (basketItems) => {
    basketItems.forEach(async (product: any) => {
      const { getProductItem } = await getProduct(product.productId);
      const cart: CartItem[] = [
        {
          id: getProductItem.id,
          image: getProductItem.imageGroups[0].images[0].link,
          name: getProductItem.name,
          price: getProductItem.price,
          quantity: getProductItem.quantity,
        },
      ];
      //productsArray.push(...cart);

      // products = [...products,cart];
      products.push(...cart);
      //productsArray.push(...products);
      //setProductsArray([...products,products]);
      //setProductsArray([...productsArray,...products])
    });
    console.log('use Effect Products:', products);
    console.log('use Effect BasketItems:', basketItems);
    const productsArray = products;
    setProductsArray(productsArray);
  };
  console.log('use effect:', basketItems);

  //   {
  //     {basketItems &&
  //       basketItems.map((product) => (
  //                 id: product.id,
  //                 image:
  //                   'https://img.freepik.com/free-photo/t-shirt_1203-8004.jpg?w=900&t=st=1694687660~exp=1694688260~hmac=1f6a74275282c34e331b51ce0dc4c463e6e8d3307de2fae059c79e2bdc6a660e',
  //                 name: 'Mens Tshirt',
  //                 price: 1299,
  //                 quantity: 1,
  //       ))}
  //   },
  // ];
  // {basketItems &&
  //   basketItems.map(async (product:any) => {
  //     const {getProductItem} = await getProduct(product.productId);
  //  var cart:CartItem = {
  //       id: getProductItem.id,
  //       image: getProductItem.imageGroups[0].images[0].link,
  //       name: getProductItem.name,
  //       price: getProductItem.price,
  //       quantity: getProductItem.quantity,
  //   };
  //setProductsArray(productsArray.concat(cart));
  // products = [...products,cart];
  //products.push(cart);
  // }

  // )}
  //setProductsArray(products);
  console.log('Products Page Products:', products);

  const [totalAmount, setTotalAmount] = useState<number>();
  console.log(totalAmount);
  // setCartItems(products);
  const router = useRouter();
  const {
    sitecoreContext: { route, site },
  } = useSitecoreContext();
  const language = route?.itemLanguage || config.defaultLanguage;
  const siteInfo = siteResolver.getByName(site?.name || config.jssAppName);
  const confirmCartEvent = (site: SiteInfo, language: string) => {
    const createConfirmCartEvent = async () => {
      const pointOfSale = PosResolver.resolve(site, language);
      const engage = await init({
        clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
        targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
        // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
        cookieDomain: window.location.host.replace(/^www\./, ''),
        // Cookie may be created in personalize middleware (server), but if not we should create it here
        forceServerCookieMode: false,
      });
      engage.event('CONFIRM', {
        channel: 'web',
        currency: 'USD',
        pointOfSale,
        page: window.location.host,
        language: config.defaultLanguage,
        products: [{ item_id: '701644052522M' }],
      });

      engage.event('CHECKOUT', {
        channel: 'web',
        currency: 'USD',
        pointOfSale,
        page: window.location.host,
        language,
        referenceId: 'Floral_Cardigan_001',
        status: 'PURCHASED',
      });

      console.log('Confirm Cart Event triggered');
    };
    createConfirmCartEvent();
    const url = '/Order';
    router.push(url);
  };
  console.log('Products Page:', productsArray);
  return (
    //<div  id={id ? id : undefined}>

    <div className="component-content position-center">
      <div className="grid md:grid-cols-4 md:gap-5">
        <table id="productList" className="min-w-full  ">
          <thead className="border-b">
            <tr>
              <th className="p-5 text-left">Item</th>
              <th className="p-5 text-right">Quantity</th>
              <th className="p-5 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {basketItems.map((item: any) => (
              // <tr key={item.productId} className="border-b">
              //   <td>
              //     <a href={`/product/${item.name}`} className="flex items-center">
              //       <img
              //         src={item.imageGroups[0].images[0].link}
              //         alt={item.name}
              //         width={50}
              //         height={50}
              //         style={{
              //           maxWidth: '100%',
              //           height: 'auto',
              //         }}
              //       />
              //       {item.name}
              //     </a>
              //   </td>
              //   <td className="p-5 text-right">
              //     <select onChange={(e) => updateCartHandler(item, e.target.value)}>
              //       {[...Array(10).keys()].map((x) => (
              //         <option key={x + 1} value={x + 1}>
              //           {x + 1}
              //         </option>
              //       ))}
              //     </select>
              //   </td>
              //   <td className="p-5 text-right">INR {item.price}</td>
              // </tr>
              <CartProducts product={item.productId} key={item.productId} />
            ))}
          </tbody>
        </table>
        <div className="card p-5">
          <ul>
            <li>
              <div className="pb-3 text-xl">
                Subtotal ({basketItems.reduce((a, c: any) => a + c.quantity, 0)}) :{totalAmount} INR
              </div>
            </li>
            <li>
              <button
                className="primary-button w-full"
                onClick={() => {
                  confirmCartEvent(siteInfo, language);
                }}
              >
                Check Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
