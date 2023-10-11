// import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import WishlistCartProduct from '../components/WishlistCartProduct';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

type ComponentProps = {
  params: { [key: string]: string };
};

export const Default = (props: ComponentProps): JSX.Element => {
  const [wishlistitems, setWishlistItems] = useState([]);
  useEffect(() => {
    const response = async () => {
      const { wishlist } = await getwishlistcartitems();
      const wishlistitems = wishlist.customerProductListItems;

      setWishlistItems(wishlistitems);
    };

    response();
  }, []);
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  //   const searchParams = useSearchParams();
  if (sitecoreContext.pageEditing) {
    return (
      <div className={`component sfcc-wishlist ${props.params.styles}`.trimEnd()}>
        <div className="component-content position-center">
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
               <h1>WISHLISTED PRODUCTS</h1>
                               </div>
                       </div>
               </div>
   <div className="row">
   {wishlistitems &&
            wishlistitems.map((product: any) => (
              <WishlistCartProduct product={product.productId} key={product.id} />
            ))}
   </div>
</div>
</section>
       
     </div>
   </div>
  );
};
const getwishlistcartitems = async () => {
  const res = await fetch('/api/salesforcecommercecloud/getwishlistcartitems', {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  });
  const response = await res.json();
  const wishlist = response.WishlistItems;
  console.log('wishlistItems:', wishlist);
  return { wishlist };
};
