import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'react-feather';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

type ComponentProps = {
  params: { [key: string]: string };
};

export const Default = (props: ComponentProps): JSX.Element => {
  const [basket, setCartItems] = useState({ basketcount: 0, basketid: 0 });
  const [wishlist, setWishlistItems] = useState({ wishlistcount: 0, wishlistid: 0 });
  useEffect(() => {
    const response = async () => {
      const { wishlist, basket } = await getwishlistcartitems();
      let updatewishlistvalues = {};
      let updatebasketvalues = {};
      updatewishlistvalues = {
        wishlistcount: wishlist.customerProductListItems?.length,
        wishlistid: wishlist.id,
      };
      updatebasketvalues = { basketcount: basket.productItems?.length, basketid: basket.basketId };
      setCartItems((basket) => ({
        ...basket,
        ...updatebasketvalues,
      }));
      setWishlistItems((wishlist) => ({
        ...wishlist,
        ...updatewishlistvalues,
      }));
    };

    response();
  }, []);
  console.log('Header', wishlist);
  const { sitecoreContext } = useSitecoreContext();
  // const id = props.params.RenderingIdentifier;
  if (sitecoreContext.pageEditing) {
    return (
      <div className={`component sfcc-wishlistandcart ${props.params.styles}`.trimEnd()}>
        <div className="component-content">
          <span className="is-empty-hint">Product</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`sfcc-wishlistandcart ${props.params.styles}`.trimEnd()}>
      <div className="row">
        <div className="block text-white col-6">
          <Link
            href={{ pathname: '/Wishlist', query: { wishlistid: wishlist.wishlistid } }}
            className="text-white"
          >
            <Heart />
            <span className="block text-white">{wishlist.wishlistcount}</span>
          </Link>
        </div>
        <div className="block text-white col-6">
          <Link
            href={{ pathname: '/Cart', query: { basketid: basket.basketid } }}
            className="text-white"
          >
            <ShoppingCart />
            <span className="block text-white">{basket.basketcount}</span>
          </Link>
        </div>
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
  console.log('Wishlist and Cart Items', response);
  const wishlist = response.WishlistItems;
  const basket = response.BasketItems;
  console.log('wishlist:', wishlist);
  return { wishlist, basket };
};
