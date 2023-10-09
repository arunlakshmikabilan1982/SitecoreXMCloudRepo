import React from 'react';
import { useEffect, useState } from 'react'
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import ProductCard from './ProductCard';
// import getProducts from 'src/pages/api/salesforcecommercecloud/sfcc';

type ComponentProps = {
  params: { [key: string]: string };
};

export const Default = (props: ComponentProps): JSX.Element => {
const getSearchProducts = async () => {
    const res = await fetch('/api/salesforcecommercecloud/getsearchproducts', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify('womens'),
    });
    const response = await res.json();
    return {response};
  };
  const [products, setGetProducts] = useState(Array<any>);
  useEffect(() => {
    
    const response = async () =>{
       const {response} = await getSearchProducts();
       const products = response;
       setGetProducts(products);
    }
    response();
  },[]);
  console.log("products:",products);
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (sitecoreContext.pageEditing) {
    return (
      <div className={`component sffcc-productlisting ${props.params.styles}`.trimEnd()}>
        <div className="component-content">
          <span className="is-empty-hint">Product</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`component sffcc-productlisting ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        
          <div className="d-flex flex-row justify-content-center mt-5">
            <h1>Products List</h1>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 pt-4">
          {products &&
              products.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
          </div>
      </div>
  );
};
// export const getStaticProps: GetStaticProps = async () => {
//   const searchResults = await getProducts('womens');
//   return {
//     props: {
//       data: searchResults,
//     },
//   };
// };

// export const getServerSideProps = async ({ params }) => {
//   const productID = params.slug;
//   console.log(productID);
//   const searchResults = await getProducts('womens');
//   return {
//     props: {
//       product: searchResults,
//     },
//   };
// };
