import React from 'react';

import config from 'temp/config';
import { init } from '@sitecore/engage';

interface FAQListProps {
  params: { [key: string]: string };
}

const addToCartEvent = () => {
  console.log('AddtoEvent loading');
  const createAddtoCart = async () => {
    // const pointOfSale = PosResolver.resolve(site, language);
    const pointOfSale = 'CNX';
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.addProduct({
      channel: 'web',
      currency: 'USD',
      pointOfSale,
      page: window.location.host,
      language: config.defaultLanguage,
      product: {
        type: 'SHIRT',
        itemId: 'EXACT_90',
        name: 'Exact score after 90 minutes',
        orderedAt: '2023-08-23T16:17:16.000Z',
        quantity: 1,
        price: 100.0,
        productId: 'CORRECT_SCORE',
        currency: 'EUR',
        originalPrice: 100.0,
        originalCurrencyCode: 'EUR',
        referenceId: 'BET_001-1',
      },
    });

    console.log('Add TO Cart event triggered');
  };
  createAddtoCart();
};
const IdentityEvent = () => {
  console.log('AddtoEvent loading');
  const createIdentity = async () => {
    // const pointOfSale = PosResolver.resolve(site, language);
    const pointOfSale = 'CNX';
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.identity({
      channel: 'web',
      currency: 'USD',
      pointOfSale,
      page: window.location.host,
      language: config.defaultLanguage,
      email: 'Praskash19@gmail.com',
      identifiers: [
        {
          id: 'Praskash19@gmail.com',
          provider: 'email',
        },
      ],
    });

    console.log('Identity event triggered');
  };
  createIdentity();
};

const PaymentEvent = () => {
  const createPayment = async () => {
    // const pointOfSale = PosResolver.resolve(site, language);
    const pointOfSale = 'CNX';
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.payment({
      channel: 'web',
      currency: 'USD',
      pointOfSale,
      language: config.defaultLanguage,
      payType: 'card',
    });

    console.log('Payment Event triggered');
  };
  createPayment();
};

const searchEvent = () => {
  const createsearchEvent = async () => {
    // const pointOfSale = PosResolver.resolve(site, language);
    const pointOfSale = 'CNX';
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.event({
      type: 'SERACH',
      channel: 'WEB',
      currency: 'EUR',
      pointOfSale,
      language: 'EN',
      page: 'search result page',
      product_name: 'airSupport',
      product_type: 'RUNNERS',
    });
    console.log('Search Cart Event triggered');
  };
  createsearchEvent();
};
const confirmCartEvent = () => {
  const createConfirmCartEvent = async () => {
    // const pointOfSale = PosResolver.resolve(site, language);
    const pointOfSale = 'CNX';
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.confirmCart({
      channel: 'web',
      currency: 'USD',
      pointOfSale,
      page: window.location.host,
      language: config.defaultLanguage,
      productItemIds: ['EXACT_90'],
    });

    console.log('Confirm Cart Event triggered');
  };
  createConfirmCartEvent();
};
export const Default = (props: FAQListProps): JSX.Element => {
  console.log('props', props.params);
  // const styles = `component ${props.params.styles}`.trimEnd();
  // const id = props.params.RenderingIdentifier;
  return (
    //<div  id={id ? id : undefined}>
    <div className="component-content">
      <button onClick={addToCartEvent}>Add To Cart</button>
      <button onClick={confirmCartEvent}>Confirm Cart</button>
      <button onClick={searchEvent}>Search Event</button>
      <button onClick={IdentityEvent}>Identity</button>
      <button onClick={PaymentEvent}>Payment</button>
    </div>
    //</div>
  );
};
