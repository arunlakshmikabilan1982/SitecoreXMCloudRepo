import React from 'react';
import Link from 'next/link';

const Default = (): JSX.Element => (
  <div className={`component container-default`}>
    <div className="component-content">
      <div className="col-12 component container p-4 mall-form">
        <div className="d-flex flex-row justify-content-center mt-5">
          <p>
            <h1>Order Placed</h1>
            <h3>Your order has been received</h3>
            <h4>Thank you for the Purchase</h4>
            <h5> your OrderId : 45678943</h5>
            <Link href="/Mall-Pages">Continue Shopping</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
export { Default };
