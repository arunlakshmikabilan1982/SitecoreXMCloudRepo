import React, { useEffect, useState } from 'react';
import { useSitecoreContext, SiteInfo, PosResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';
import { init } from '@sitecore/engage';
import { useRouter } from 'next/navigation';
import CartProducts from './CartProducts';

// interface CartItem {
//   id: string;
//   image: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

export const Default = (): JSX.Element => {
  const getwishlistcartitems = async () => {
    const res = await fetch('/api/salesforcecommercecloud/getwishlistcartitems', {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    });
    const response = await res.json();
    const basket = response.BasketItems;
    console.log('Basket Items:', basket);
    return { basket };
  };
  // const products: Array<CartItem> = [];
  const [basketItems, setWishlistItems] = useState([]);
  useEffect(() => {
    const response = async () => {
      const { basket } = await getwishlistcartitems();
      const basketItems = basket.productItems;
      const total = basketItems.reduce((a, c) => a + c.quantity * c.price, 0);
      setTotalAmount(total);
      setWishlistItems(basketItems);
      // addProducts(basketItems);
    };

    response();
  }, []);

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
