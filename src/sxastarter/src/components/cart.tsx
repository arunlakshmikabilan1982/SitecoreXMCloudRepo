import React, { useState } from 'react';
import { useSitecoreContext, SiteInfo, PosResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';
import { init } from '@sitecore/engage';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export const Default = (): JSX.Element => {
  const updateCartHandler = (item: CartItem, qty: any) => {
    const quantity = Number(qty);
    const getIndex = products.findIndex((obj) => {
      return obj.id === item.id;
    });
    products[getIndex].quantity = quantity;
    console.log('update quantity', quantity);
    console.log('update quantity', products[getIndex].quantity);
    const total = products.reduce((a, c) => a + c.quantity * c.price, 0);
    setTotalAmount(total);
  };

  const products: Array<CartItem> = [
    {
      id: 'Laptop Model XYZ',
      image:
        'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      name: 'Laptop Model XYZ',
      price: 101888,
      quantity: 1,
    },
  ];
  const [totalAmount, setTotalAmount] = useState<number>(
    products.reduce((a, c) => a + c.quantity * c.price, 0)
  );
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
        productItemIds: ['Laptop_90'],
      });

      engage.event('CHECKOUT', {
        channel: 'web',
        currency: 'USD',
        pointOfSale,
        page: window.location.host,
        language,
        referenceId: 'Laptop_001',
        status: 'PURCHASED',
      });

      console.log('Confirm Cart Event triggered');
    };
    createConfirmCartEvent();
    const url = '/Mall-Pages/ORDER';
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
            {products.map((item) => (
              <tr key={item.id} className="border-b">
                <td>
                  <a href={`/product/${item.name}`} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                    {item.name}
                  </a>
                </td>
                <td className="p-5 text-right">
                  <select onChange={(e) => updateCartHandler(item, e.target.value)}>
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-5 text-right">INR {item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card p-5">
          <ul>
            <li>
              <div className="pb-3 text-xl">
                Subtotal ({products.reduce((a, c) => a + c.quantity, 0)}) :{totalAmount} INR
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
