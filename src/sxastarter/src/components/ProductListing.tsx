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

interface Product {
  imgSrc: string;
  title: string;
  description: string;
  price: string;
  review: string;
  productURL: string;
}

const ProductItem = ({ imgSrc, title, description, price, review, productURL }: Product) => (
  <div className="product-item">
    <img src={imgSrc} alt={title} className="product-image" width={300} height={280} />
    <h3 className="product-title">{title}</h3>
    <p className="product-description">{description}</p>
    <div className="product-details">
      <p className="product-price">{price}</p>
      <p className="product-review">{review}</p>
      <a href={productURL} className="product-link">
        Learn More
      </a>
    </div>
  </div>
);

const DefaultContainer = (props: ComponentProps): JSX.Element => {
  console.log('entered');
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

  const products: Product[] = [
    {
      imgSrc:
        'https://img.freepik.com/free-photo/t-shirt_1203-8004.jpg?w=900&t=st=1694687660~exp=1694688260~hmac=1f6a74275282c34e331b51ce0dc4c463e6e8d3307de2fae059c79e2bdc6a660e',
      title: 'Mens Tshirt',
      description: 'Essential Mens T-Shirts: Comfortable and Stylish',
      price: 'Rs 1,299',
      review: '4.5 stars',
      productURL: '/mall-pages/shop/products-list/menstshirt',
    },
    {
      imgSrc:
        'https://img.freepik.com/premium-photo/autumn-style-clothes-white-background-top-view_185193-63529.jpg?w=900',
      title: 'Womens wear',
      description: 'The Perfect Fit for Every Occasion.',
      price: 'Rs 2,499',
      review: '4.5 stars',
      productURL: '/mall-pages/shop/products-list/womenswear',
    },
    {
      imgSrc:
        'https://img.freepik.com/premium-photo/cheerful-young-businessman-suit-looking-camera-ai-generative_649024-11972.jpg?w=360',
      title: 'Mens Suit',
      description: 'Comfortable and stylish choice.',
      price: 'Rs 10,999',
      review: '4.5 stars',
      productURL: '/mall-pages/shop/products-list/mens-suit',
    },
    {
      imgSrc:
        'https://img.freepik.com/premium-photo/fashion-girl-hd-8k-wallpaper-stock-photographic-image_890746-21714.jpg?w=360',
      title: 'Womens Collection',
      description:
        'Shoes designed specifically for women, offering both style and comfort for various occasions, from casual to formal.',
      price: 'Rs 7,999',
      review: '4.5 stars',
      productURL: '/mall-pages/shop/products-list/womescollection',
    },
    {
      imgSrc:
        'https://img.freepik.com/free-psd/laptop-mock-up-isolated_1310-1463.jpg?w=900&t=st=1694587030~exp=1694587630~hmac=54024a72309f8029a1da45a49c3eb7c2d52a7d7bf2897a9b18a28ac6127f2cc2',
      title: 'Laptop',
      description:
        'Experience the power of productivity with our high-performance laptop. Whether you need it for work or play, this laptop has you covered. With cutting-edge features and sleek design, it is the perfect companion for your digital lifestyle.',
      price: 'Rs 1,01,888',
      review: '4.5 stars',
      productURL: '/mall-pages/shop/products-list/laptop',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/263564/pexels-photo-263564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Mobile Phone',
      description:
        'Stay connected on the go with our latest mobile phone. Packed with innovative features and powerful performance, this phone lets you do more than ever before. Capture memories, stay productive, and enjoy endless possibilities.',
      price: 'Rs 56,246',
      review: '4.7 stars',
      productURL: '/mall-pages/shop/products-list/mobile',
    },
    {
      imgSrc:
        'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Digital Camera',
      description:
        "Capture life's moments with precision using our advanced digital camera. From stunning landscapes to candid portraits, this camera empowers you to unleash your creativity. Explore a new world of photography.",
      price: 'Rs 30,000',
      review: '4.6 stars',
      productURL: '/mall-pages/shop/products-list/camera',
    },
    {
      imgSrc:
        'https://img.freepik.com/free-photo/smart-tv-screen-with-copy-space-wooden-table_53876-102019.jpg?w=900&t=st=1692955451~exp=1692956051~hmac=e7cfcc0d474dc5763e2574fcbe2f0618f99834db382ff8bae6cf5f908245433b',
      title: 'Smart TV',
      description:
        'Elevate your entertainment experience with our smart TV. Immerse yourself in stunning visuals and crystal-clear sound. Access a world of streaming content, apps, and more. The future of television is here.',
      price: 'Rs 42,000',
      review: '4.2 stars',
      productURL: '/mall-pages/shop/products-list/smart-tv',
    },
    {
      imgSrc:
        'https://img.freepik.com/free-vector/realistic-fitness-trackers_23-2148530529.jpg?w=740&t=st=1692955544~exp=1692956144~hmac=351d2f19ed7cbdf566734e0ebc9d525d3d6e9c8b32b0fad95ebf85d2c68c83b6',
      title: 'Smart Watch',
      description:
        'Experience the convenience of a smart watch that complements your lifestyle. Monitor your health, receive notifications, and stay connected without missing a beat. With sleek design and advanced features, it is the perfect wearable companion.',
      price: 'Rs 5,000',
      review: '4.0 stars',
      productURL: '/mall-pages/shop/products-list/smart-watch',
    },
    {
      imgSrc:
        'https://img.freepik.com/premium-photo/new-white-wireless-ear-full-size-headphones-isolated-white-background-clipping-path_252965-1158.jpg',
      title: 'Wireless Headphones',
      description:
        'Immerse yourself in your favorite music with our wireless headphones. Enjoy premium sound quality and noise cancellation technology. Whether you are working, traveling, or relaxing, these headphones deliver an exceptional audio experience.',
      price: 'Rs 2,400',
      review: '4.8 stars',
      productURL: '/mall-pages/shop/products-list/wireless-headphones',
    },
    {
      imgSrc:
        'https://img.freepik.com/free-vector/digital-device-mockup_53876-89357.jpg?w=740&t=st=1692955670~exp=1692956270~hmac=f32625b968d1411394ecf4ceb25d345eed3eeb4b3411e77b796f118a1f3f1cc5',
      title: 'Tablet',
      description:
        "Carry your world in the palm of your hand with our versatile tablet. From work to entertainment, this tablet does it all. With a high-resolution display and long battery life, it's perfect for productivity and play on the go.",
      price: 'Rs 60,000',
      review: '4.3 stars',
      productURL: '/mall-pages/shop/products-list/tablet',
    },
    {
      imgSrc: 'https://img.freepik.com/premium-psd/gaming-console-mockup_47987-2870.jpg?w=826',
      title: 'Gaming Console',
      description:
        "Dive into the world of gaming with our gaming console. Experience realistic graphics, immersive gameplay, and a vast library of games. Whether you're a casual player or a hardcore gamer, this console delivers endless fun.",
      price: 'Rs 11,000',
      review: '4.4 stars',
      productURL: '/mall-pages/shop/products-list/gaming-console',
    },
  ];

  return (
    <div className={`component container-default ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="col-12 component container p-4 mall-form">
          <div className="d-flex flex-row justify-content-center mt-5">
            <h1>Products List</h1>
          </div>
          <div className="row">
            {products.map((product, index) => (
              <ProductItem
                key={index}
                imgSrc={product.imgSrc}
                title={product.title}
                description={product.description}
                price={product.price}
                review={product.review}
                productURL={product.productURL}
              />
            ))}
          </div>
          <div className="text-center mt-5" background-color="black">
            <a href="#" className="btn btn-primary">
              See More
            </a>
          </div>
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
