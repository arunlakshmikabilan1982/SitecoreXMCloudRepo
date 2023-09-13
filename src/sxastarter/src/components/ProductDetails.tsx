import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

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

  return (
    <div className={`component product-details ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="product-content">
          <div className="product-layout" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="product-image" style={{ flex: '1', paddingRight: '20px' }}>
              <img src={props.params.ProductImage} alt="Product" width={400} height={350} />
            </div>
            <div className="product-details" style={{ flex: '1', paddingLeft: '20px' }}>
              <h1 className="product-title">{props.params.ProductTitle}</h1>
              <p className="product-description">{props.params.ProductDescription}</p>
              <div className="product-price">
                <span>{props.params.ProductPrice}</span>
              </div>
              <div className="product-review">
                <p>{props.params.ProductReview}</p>
              </div>
              <div className="product-specification">
                <p>{props.params.ProductSpecification}</p>
              </div>
              <button className="add-to-cart-button">Add to Cart</button>
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

export const LaptopProductDetailsPage = (props: ComponentProps): JSX.Element => {
  if (props.rendering) {
    return (
      <div className="laptop-product-details-wrapper">
        <ProductDetailsContainer
          {...props}
          params={{
            ...props.params,
            ProductImage:
              'https://img.freepik.com/free-psd/laptop-mock-up-isolated_1310-1463.jpg?w=900&t=st=1694587030~exp=1694587630~hmac=54024a72309f8029a1da45a49c3eb7c2d52a7d7bf2897a9b18a28ac6127f2cc2',
            ProductTitle: 'Title : Laptop Model XYZ',
            ProductDescription: 'Descirption : Introducing the Laptop Model XYZ',
            ProductPrice: 'Price : ₹1,01,888',
            ProductReview: 'Rating : Great laptop with excellent features.',
            ProductSpecification:
              'Specifiction : This laptop boasts a stunning 4K OLED display that brings your content to life with vibrant colors and deep contrasts',
          }}
        />
      </div>
    );
  }

  return <ProductDetailsContainer {...props} />;
};

export const MobileProductDetailsPage = (props: ComponentProps): JSX.Element => {
  if (props.rendering) {
    return (
      <div className="mobile-product-details-wrapper">
        <ProductDetailsContainer
          {...props}
          params={{
            ...props.params,
            ProductImage:
              'https://images.pexels.com/photos/263564/pexels-photo-263564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ProductTitle: 'Title : Mobile Phone Model ABC',
            ProductDescription: 'Description : Introducing the Mobile Phone Model ABC',
            ProductPrice: 'Price : ₹56,246',
            ProductReview: 'Rating : 4.4',
            ProductSpecification:
              'Specification : The Mobile Phone Model ABC features a gorgeous 6.5-inch Full HD+ AMOLED display that delivers vibrant colors and deep blacks',
          }}
        />
      </div>
    );
  }

  return <ProductDetailsContainer {...props} />;
};

export const CameraProductDetailsPage = (props: ComponentProps): JSX.Element => {
  if (props.rendering) {
    return (
      <div className="camera-product-details-wrapper">
        <ProductDetailsContainer
          {...props}
          params={{
            ...props.params,
            ProductImage:
              'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ProductTitle: 'Title : Professional Camera Model DEF',
            ProductDescription: 'Description : Introducing the Professional Camera Model DEF',
            ProductPrice: 'Price : ₹30,000',
            ProductReview: 'Rating : 4.2',
            ProductSpecification:
              'Specification : The Professional Camera Model DEF features a full-frame 36.3-megapixel CMOS sensor',
          }}
        />
      </div>
    );
  }

  return <ProductDetailsContainer {...props} />;
};
