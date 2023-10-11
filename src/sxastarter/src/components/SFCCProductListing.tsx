import React from 'react';
import { useEffect, useState } from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import ProductCard from './ProductCard';
import { getSession } from 'next-auth/react';
// import getProducts from 'src/pages/api/salesforcecommercecloud/sfcc';

type ComponentProps = {
  params: { [key: string]: string };
};

export const Default = (props: ComponentProps): JSX.Element => {
  
  const getSearchProducts = async () => {
    const session = await getSession();
    const sessionUser = session?.user as any;
    const gender = sessionUser?.gender;
    let searchword = "";
    if(gender === "Male" || gender === "male")
    {
      searchword = "mens";
    }
    else{
      searchword = "womens";
    }
    const res = await fetch('/api/salesforcecommercecloud/getsearchproducts', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(searchword),
    });
    const response = await res.json();
    return { response };
  };
  const [products, setGetProducts] = useState(Array<any>);
  useEffect(() => {
    const response = async () => {
      const { response } = await getSearchProducts();
      const products = response;
      setGetProducts(products);
    };
    response();
  }, []);
  console.log('products:', products);
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
      <section className="section-products">
<div className="container">
<div className="row justify-content-center text-center">
						<div className="col-md-8 col-lg-6">
								<div className="header">
                <h1>CRAFTED BY US, FOR YOU</h1>
								</div>
						</div>
				</div>
    <div className="row">
    {products &&
            products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
</div>
</section>
        
      </div>
    </div>
  );
    };