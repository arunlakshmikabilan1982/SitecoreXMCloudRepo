import React from 'react';
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {Heart, ShoppingCart} from 'react-feather'

type ComponentProps = {
  params: { [key: string]: string };
};

export const Default = (props: ComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [numberOfCartItems, setCartItems] = useState();
  const [numberOfwishListItems, setWishlistItems] = useState();
    useEffect(()=>{
      const response = async () => {
        const {numberOfCartItems, numberOfwishListItems} = await getwishlistcartitems();
        setCartItems(numberOfCartItems);
        setWishlistItems(numberOfwishListItems);
      }
     
      response();
  },[]);
  return (
    <div>
    <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center text-xl  font-semibold uppercase tracking-wide text-orange-600">
            
    <Link href={`/wishlist`}><Heart/>{numberOfwishListItems}</Link>
    </p>
    <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center text-xl  font-semibold uppercase tracking-wide text-orange-600">
    
    <Link href={`/cart`}><ShoppingCart/><span className="block text-white">{numberOfCartItems}</span></Link>
    </p>
    </div>
  );
};
const getwishlistcartitems = async () =>{
  const res = await fetch('/api/salesforcecommercecloud/getwishlistcartitems', {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    }
  });
  const response = await res.json();
  console.log("Wishlist and Cart Items",response);
  const numberOfwishListItems = response.WishlistCount;
  const numberOfCartItems = response.BasketsCount;
  // console.log(numberOfCartItems)
  return {numberOfCartItems,numberOfwishListItems}
};