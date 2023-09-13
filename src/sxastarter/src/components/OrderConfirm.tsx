import React from 'react';
import Link from 'next/link';



const Default = (): JSX.Element => (
    <div className="component-content">
      <h1>Order has been succesful placed</h1>
       <Link href="/">Continue Shopping</Link>
    </div>
);
export {Default};

