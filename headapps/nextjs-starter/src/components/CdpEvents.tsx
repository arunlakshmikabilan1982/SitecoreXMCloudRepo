import React, { useState } from 'react';
import { useSitecoreContext, SiteInfo, PosResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { init } from '@sitecore/engage';
import { siteResolver } from 'lib/site-resolver';

interface FAQListProps {
  params: { [key: string]: string };
}

const addToCartEvent = (site: SiteInfo, language: string) => {
  console.log('AddtoEvent loading');
  const createAddtoCart = async () => {
    const pointOfSale = PosResolver.resolve(site, language);
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.event('ADD', {
      channel: 'web',
      currency: 'USD',
      pointOfSale,
      page: window.location.host,
      language,
      product: {
        type: 'SHIRT',
        item_id: 'EXACT_90',
        name: 'Exact score after 90 minutes',
        orderedAt: '2023-08-23T16:17:16.000Z',
        quantity: 1,
        price: 100.0,
        productId: 'CORRECT_SCORE',
        currency: 'EUR',
        originalPrice: 100.0,
        originalCurrencyCode: 'EUR',
        reference_id: 'BET_001-1',
      },
    });

    console.log('Add TO Cart event triggered');
  };
  createAddtoCart();
};
const IdentityEvent = (site: SiteInfo, language: string) => {
  console.log('AddtoEvent loading');
  const createIdentity = async () => {
    const pointOfSale = PosResolver.resolve(site, language);
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
      language,
      email: 'test1.guest@test.com',
      gender: 'male',
      identifiers: [
        {
          id: 'test1.guest@test.com',
          provider: 'email',
        },
      ],
    });

    console.log('Identity event triggered');
  };
  createIdentity();
};

const PaymentEvent = (site: SiteInfo, language: string) => {
  const createPayment = async () => {
    const pointOfSale = PosResolver.resolve(site, language);
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.event('Payment', {
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

const searchEvent = (site: SiteInfo, language: string) => {
  const createsearchEvent = async () => {
    const pointOfSale = PosResolver.resolve(site, language);
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.event('SEARCH', {
      channel: 'WEB',
      currency: 'EUR',
      pointOfSale,
      language,
      page: 'search result page',
      product_name: 'airSupport',
      product_type: 'RUNNERS',
    });
    console.log('Search Cart Event triggered');
  };
  createsearchEvent();
};
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
      productItemIds: ['EXACT_90'],
    });

    console.log('Confirm Cart Event triggered');
  };
  createConfirmCartEvent();
};
const checkoutEvent = (site: SiteInfo, language: string) => {
  const createCheckoutCartEvent = async () => {
    const pointOfSale = PosResolver.resolve(site, language);
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.event('CHECKOUT', {
      channel: 'web',
      currency: 'USD',
      pointOfSale,
      page: window.location.host,
      language,
      reference_id: 'BET_001-1',
      status: 'PURCHASED',
    });

    console.log('Checkout  Event triggered');
  };
  createCheckoutCartEvent();
};
export const Default = (props: FAQListProps): JSX.Element => {
  console.log('props', props.params);
  // const styles = `component ${props.params.styles}`.trimEnd();
  // const id = props.params.RenderingIdentifier;
  const {
    sitecoreContext: { route, site },
  } = useSitecoreContext();
  const language = route?.itemLanguage || config.defaultLanguage;
  const siteInfo = siteResolver.getByName(site?.name || config.jssAppName);
  const experienceTriggerMethod = (site: SiteInfo, language: string) => {
    console.log('AddtoEvent loading');
    const createAddtoCart = async () => {
      const pointOfSale = PosResolver.resolve(site, language);
      const engage = await init({
        clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
        targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
        // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
        cookieDomain: window.location.host.replace(/^www\./, ''),
        // Cookie may be created in personalize middleware (server), but if not we should create it here
        forceServerCookieMode: false,
        webPersonalization: true,
        pointOfSale: pointOfSale,
      });
      const personalization = {
        channel: 'WEB',
        currency: 'USD',
        pointOfSale: pointOfSale,
        friendlyId: 'interactiveexperience',
        params: { 'abandonedCart.isabandoned': true },
      };
      const response: any = await engage.personalize(personalization, 4000);
      console.log('response', response);
      if (response != null && response.offers != null) {
        const resultData = response.offers[0].attributes.OfferAmount + ' Discount';
        const imageurl = response.offers[0].attributes.imageUrl;
        console.log('resultData', resultData);
        setOffers(resultData);
        setImageurl(imageurl);
      }

      console.log('Add TO Cart event triggered');
    };
    createAddtoCart();
  };
  const [offers, setOffers] = useState<string>('');
  const [imageurl, setImageurl] = useState<string>('');

  return (
    //<div  id={id ? id : undefined}>
    <div className="component-content">
      <button onClick={() => addToCartEvent(siteInfo, language)}>Add To Cart</button>
      <button onClick={() => confirmCartEvent(siteInfo, language)}>Confirm Cart</button>
      <button onClick={() => searchEvent(siteInfo, language)}>Search Event</button>
      <button onClick={() => IdentityEvent(siteInfo, language)}>Identity</button>
      <button onClick={() => PaymentEvent(siteInfo, language)}>Payment</button>
      <button onClick={() => checkoutEvent(siteInfo, language)}>Checkout</button>
      <button onClick={() => experienceTriggerMethod(siteInfo, language)}>Trigger Exprience</button>
      <h1>{offers}</h1>
      <img alt="" src={imageurl} />
    </div>
    //</div>
  );
};
