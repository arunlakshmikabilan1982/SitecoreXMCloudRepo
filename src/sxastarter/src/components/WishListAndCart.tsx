import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'react-feather';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useSession } from 'next-auth/react';
type ComponentProps = {
  params: { [key: string]: string };
};

export const Default = (props: ComponentProps): JSX.Element => {
  const { data: session } = useSession();
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
            {session?.user?.email == 'parvathi.somanahalli6459@gmail.com' ? (
              <>
                <span className="block text-white">{wishlist.wishlistcount}</span>
              </>
            ) : (
              <span className="block text-white">0</span>
            )}
          </Link>
        </div>
        <div className="block text-white col-6">
          <Link
            href={{ pathname: '/Cart', query: { basketid: basket.basketid } }}
            className="text-white"
          >
            <ShoppingCart />
            {session?.user?.email == 'parvathi.somanahalli6459@gmail.com' ? (
              <>
                <span className="block text-white">{basket.basketcount}</span>
              </>
            ) : (
              <span className="block text-white">0</span>
            )}
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
  const wishlist = response.WishlistItems;
  const basket = response.BasketItems;
  return { wishlist, basket };
};
