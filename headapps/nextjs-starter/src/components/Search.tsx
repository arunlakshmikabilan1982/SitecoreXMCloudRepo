import React, { useRef, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
  PosResolver,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { init } from '@sitecore/engage';
import { siteResolver } from 'lib/site-resolver';
import Link from 'next/link';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const DefaultContainer = (props: ComponentProps): JSX.Element => {
  const {
    sitecoreContext: { pageState, route, site },
  } = useSitecoreContext();
  const language = route?.itemLanguage || config.defaultLanguage;
  const siteInfo = siteResolver.getByName(site?.name || config.jssAppName);
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  /*const phKey = `container-${props.params.DynamicPlaceholderId}`;*/
  const id = props.params.RenderingIdentifier;
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    const prefix = `${pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }
  const [isOpen, setIsOpen] = useState(false);

  const setIsOpenValue = async (value: any) => {
    setIsOpen(value);
  };
  const searchTerm = useRef('');
  const sendSearch = async (searchText: any) => {
    const pointOfSale = PosResolver.resolve(siteInfo, language);
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
    engage.event('SEARCH', {
      channel: 'WEB',
      currency: 'EUR',
      pointOfSale,
      language,
      page: 'search result page',
      product_name: searchText,
      product_type: 'DRESS',
    });
    console.log('Search Event triggered' + searchText);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendSearch(searchTerm.current);
    setIsOpenValue(true);
  };
  return (
    <div className={`component container-default ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="col-12 component container p-4 mall-form">
          <div className="d-flex flex-row justify-content-center mt-5">
            <h1>Search</h1>
          </div>
          <form className="col-9 m-auto row p-5" onLoad={() => setIsOpenValue(false)}>
            <div className="px-2 col-12 form-group my-3 row">
              <div className="col-10 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="search"
                    name="search"
                    className="form-control"
                    id="search"
                    aria-describedby="search"
                    placeholder="Enter a keyword"
                    onChange={(e) => (searchTerm.current = e.target.value)}
                  />
                </div>
              </div>
              <div className="col-2 form-group my-3 row">
                <div className="col-12">
                  <button type="submit" className="btn me-5" onClick={onSubmit}>
                    <img
                      width="25px"
                      height="25px"
                      src="https://img.icons8.com/search"
                      alt="Search"
                    ></img>
                  </button>
                </div>
              </div>
            </div>
          </form>
          {isOpen ? (
            <div className="px-2 col-12 form-group my-3 row">
              <h3>5 results found</h3>
              <div className="col-2 my-3 row">
                <ul>
                  <li>
                    <Link href="/Mall-Pages/Shop/SFCC-Product-Listing">T-Shirt</Link>
                  </li>
                  <li>
                    <Link href="/Mall-Pages/Shop/SFCC-Product-Listing">Womens Wear</Link>
                  </li>
                  <li>
                    <Link href="/Mall-Pages/Shop/SFCC-Product-Listing">Mens Wear</Link>
                  </li>
                  <li>
                    <Link href="/Mall-Pages/Shop/SFCC-Product-Listing">Smart Watch</Link>
                  </li>
                  <li>
                    <Link href="/Mall-Pages/Shop/SFCC-Product-Listing">Hearphones</Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ComponentProps): JSX.Element => {
  const splitStyles = props.params?.Styles?.split(' ');

  if (splitStyles && splitStyles.includes('container')) {
    return (
      <div className="container-wrapper">
        <DefaultContainer {...props} />
      </div>
    );
  }

  return <DefaultContainer {...props} />;
};
