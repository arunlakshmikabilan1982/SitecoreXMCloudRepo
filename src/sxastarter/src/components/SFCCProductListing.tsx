import React from 'react';
import { useEffect, useState } from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import ProductCard from './ProductCard';

type ComponentProps = {
  params: { [key: string]: string };
};

export const Default = (props: ComponentProps): JSX.Element => {
  const getMensProducts = async () => {
    const searchword = 'mens';
    const res = await fetch('/api/salesforcecommercecloud/getsearchproducts', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(searchword),
    });
    const mensproductsres = await res.json();
    return { mensproductsres };
  };

  const [mensproducts, setMensProducts] = useState(Array<any>);
  useEffect(() => {
    const response = async () => {
      const { mensproductsres } = await getMensProducts();
      const mensproducts = mensproductsres;
      setMensProducts(mensproducts);
    };
    response();
  }, []);
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
              {mensproducts &&
                mensproducts.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export const Womens = (props: ComponentProps): JSX.Element => {
  const getWomensProducts = async () => {
    const searchword = 'womens';
    const res = await fetch('/api/salesforcecommercecloud/getsearchproducts', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(searchword),
    });
    const womensproductsres = await res.json();
    return { womensproductsres };
  };

  const [womensproducts, setWomensProducts] = useState(Array<any>);
  useEffect(() => {
    const response = async () => {
      const { womensproductsres } = await getWomensProducts();
      const womensproducts = womensproductsres;
      setWomensProducts(womensproducts);
    };
    response();
  }, []);
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
              {womensproducts &&
                womensproducts.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
