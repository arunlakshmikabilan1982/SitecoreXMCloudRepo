import React from 'react';
import { init } from '@sitecore/engage';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';
import { useSitecoreContext, SiteInfo, PosResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import { signIn, useSession } from 'next-auth/react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const ProductDetailsContainer = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }
  const {
    sitecoreContext: { route, site },
  } = useSitecoreContext();
  const language = route?.itemLanguage || config.defaultLanguage;
  const siteInfo = siteResolver.getByName(site?.name || config.jssAppName);
  const { data: session } = useSession();
  const router = useRouter();
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
    console.log('addToCart:', response);
  };
  const searchParams = useSearchParams();
  const prodID = searchParams.get('productid');

  const [productItem, setProduct] = useState({
    productId: 0,
    imageLink: '',
    name: '',
    price: '',
    description: '',
  });
  useEffect(() => {
    const response = async () => {
      const { response } = await getProduct(prodID);
      let variant;
      if (response?.variants[0] != null) {
        variant = response?.variants[0]?.productId;
      } else {
        variant = response?.id;
      }
      let updateproductvalues = {};
      updateproductvalues = {
        productId: variant,
        imageLink: response.imageGroups[0].images[0].link,
        name: response.name,
        price: response.price,
        description: response.shortDescription,
      };

      setProduct((productItem) => ({
        ...productItem,
        ...updateproductvalues,
      }));
    };

    response();
  }, []);
  const addToCartEvent = (site: SiteInfo, language: string) => {
    console.log('AddtoEvent loading');
    async function createAddtoCart() {
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
          type: 'Clothing',
          item_id: productItem.productId,
          name: productItem.name,
          orderedAt: '2023-10-15T16:17:16.000Z',
          quantity: 1,
          price: productItem.price,
          productId: productItem.productId,
          currency: 'DOLLAR',
          originalPrice: 600.0,
          originalCurrencyCode: 'DOLLAR',
          reference_id: productItem.name + '_001',
        },
      });

      console.log('Add TO Cart event triggered');
    }
    addToCart(productItem.productId);
    createAddtoCart();
    const url = '/Cart';
    router.push(url);
  };
  return (
    <div className={`component product-details ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="product-content" style={{ marginLeft: '127px' }}>
          <div className="product-layout" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="product-image" style={{ paddingRight: '20px' }}>
              <img src={productItem.imageLink} alt="Product" width={400} height={350} />
            </div>
            <div className="product-details" style={{ flex: '1', paddingLeft: '20px' }}>
              <h1 className="product-title">{productItem.name}</h1>
              <p className="product-description">{productItem.description}</p>
              <div className="product-price">
                <span>Price : ${productItem.price}</span>
              </div>
              <div className="product-review">
                <p>Rating : 4.5</p>
              </div>
              <div className="product-specification">
                <p>Specification : Product for every occasion. Very comfortable.</p>
              </div>
              {session?.user ? (
                <button onClick={() => addToCartEvent(siteInfo, language)}>Add To Cart</button>
              ) : (
                <button onClick={() => signIn()}>SignIn To Add In Cart</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ComponentProps): JSX.Element => {
  const splitStyles = props.params?.Styles?.split(' ');

  if (splitStyles && splitStyles.includes('product-details')) {
    return (
      <div className="product-details-wrapper">
        <ProductDetailsContainer {...props} />
      </div>
    );
  }

  return <ProductDetailsContainer {...props} />;
};

export const MensTshirt = (props: ComponentProps): JSX.Element => {
  if (props.rendering) {
    return (
      <div className="menstshirt-product-details-wrapper">
        <ProductDetailsContainer
          {...props}
          params={{
            ...props.params,
            ProductImage:
              'https://img.freepik.com/free-photo/t-shirt_1203-8004.jpg?w=900&t=st=1694687660~exp=1694688260~hmac=1f6a74275282c34e331b51ce0dc4c463e6e8d3307de2fae059c79e2bdc6a660e',
            ProductTitle: 'Title : Pair of Three for Mens',
            ProductDescription: 'Description : Essential Mens T-Shirts: Comfortable and Stylish',
            ProductPrice: 'Price : ₹1,299',
            ProductReview: 'Rating : 4.5',
            ProductSpecification:
              'Specification : Mens T-Shirts pair of three: Stretchable Comfortable and Stylish',
          }}
        />
      </div>
    );
  }

  return <ProductDetailsContainer {...props} />;
};
export const ProductDetail = (props: ComponentProps): JSX.Element => {
  if (props.rendering) {
    return (
      <div className="womenscollection-product-details-wrapper">
        <ProductDetailsContainer
          {...props}
          params={{
            ...props.params,
            ProductReview: 'Rating : 4.5',
            ProductSpecification: 'Specification : Product for every occasion. Very comfortable.',
          }}
        />
      </div>
    );
  }

  return <ProductDetailsContainer {...props} />;
};

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
