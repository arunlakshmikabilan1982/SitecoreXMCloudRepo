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
        <div className="product-image">
          <img src={props.params.ProductImage} alt="Product" width={400} height={350} />
        </div>
        <div className="product-content">
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
              'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ProductTitle: 'Laptop Model XYZ',
            ProductDescription:
              'Introducing the Laptop Model XYZ, a remarkable device that combines cutting-edge technology with sleek design. This powerful laptop is engineered to deliver uncompromising performance for both work and play. Whether you are a creative professional, a multitasking enthusiast, or a hardcore gamer, this laptop is designed to exceed your expectations.',
            ProductPrice: '₹1,01,888',
            ProductReview: 'Great laptop with excellent features.',
            ProductSpecification:
              'This laptop boasts a stunning 4K OLED display that brings your content to life with vibrant colors and deep contrasts. The Intel Core i7 processor ensures seamless multitasking, while the NVIDIA GeForce RTX 3060 graphics card provides unparalleled gaming and graphics performance. With a generous 16GB of DDR4 RAM and a lightning-fast 1TB NVMe SSD, you will experience lightning-fast load times and smooth operation even when dealing with resource-intensive applications.',
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
            ProductTitle: 'Mobile Phone Model ABC',
            ProductDescription:
              'Introducing the Mobile Phone Model ABC, a true masterpiece of design and innovation. This sleek and modern mobile phone redefines whats possible in a handheld device. With its advanced features and seamless performance, its not just a phone its a lifestyle statement.',
            ProductPrice: '₹56,246',
            ProductReview: 'Best mobile phone I have used so far.',
            ProductSpecification:
              'The Mobile Phone Model ABC features a gorgeous 6.5-inch Full HD+ AMOLED display that delivers vibrant colors and deep blacks, making your content come to life. Powered by the efficient Snapdragon 750G processor and 6GB of RAM, this phone offers smooth multitasking and seamless app performance. Whether you are streaming videos, playing games, or working on the go, this phone can handle it all. Capture breathtaking photos with the versatile triple camera setup, featuring a 48MP main camera for detailed shots, an 8MP ultra-wide lens for expansive landscapes, and a 2MP depth sensor for stunning portraits. The 20MP front camera ensures your selfies are always on point. Equipped with a 4500mAh battery, the Mobile Phone Model ABC keeps you connected all day long, and the fast charging feature ensures you spend less time charging and more time using your phone. The in-display fingerprint scanner provides secure and convenient access to your device. Experience the future of connectivity with 5G readiness, enabling faster downloads, smoother streaming, and lag-free online experiences. The phone runs on Android 12 with a customized user interface that enhances usability and offers unique features.',
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
            ProductTitle: 'Professional Camera Model DEF',
            ProductDescription:
              'Introducing the Professional Camera Model DEF, a masterpiece of precision engineering and creative freedom. This high-quality camera is designed to meet the demands of professional photographers and enthusiasts alike. With its advanced features and unparalleled image quality, it empowers you to capture moments in stunning detail and clarity.',
            ProductPrice: '₹30,000',
            ProductReview:
              'Photographers around the world are applauding the Professional Camera Model DEF. Its exceptional performance, combined with its robust build and innovative features, make it a top choice for those who demand the best. From capturing intricate details to conveying powerful emotions, this camera is a tool that empowers your vision and artistry.',
            ProductSpecification:
              'The Professional Camera Model DEF features a full-frame 36.3-megapixel CMOS sensor, delivering exceptional image quality with remarkable detail and dynamic range. The wide ISO range ensures superb performance in various lighting conditions, while the 153-point autofocus system guarantees quick and accurate focusing, even in challenging situations.Capture fast-moving subjects with ease, thanks to the impressive shooting speed of up to 7 frames per second. Whether your shooting landscapes, portraits, or sports events, this camera keeps up with your creative vision. Experience cinematic videography with 4K UHD recording at 30 frames per second. The 5-axis in-body stabilization ensures steady footage even in handheld situations, eliminating the need for additional stabilizing equipment. Compose your shots effortlessly using the 100% coverage OLED viewfinder or the tilting 3.2-inch touchscreen LCD. The camera robust magnesium alloy build is complemented by weather sealing, making it suitable for various shooting environments. Share your work instantly using built-in Wi-Fi and Bluetooth connectivity. The USB 3.0 port ensures high-speed data transfer when you need it. With dual SD card slots, you will never run out of storage space during critical moments.',
          }}
        />
      </div>
    );
  }

  return <ProductDetailsContainer {...props} />;
};
