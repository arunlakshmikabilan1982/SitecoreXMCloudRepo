import React from 'react';
import Link from 'next/link';

const Default = (): JSX.Element => (
  <div className="component-content">
    <p>
      <h3>Your order has been received</h3>
      <h4>Thank you for the Purchase</h4>
      <h5> your OrderId : 45678943</h5>
    </p>
    <Link href="/Mall-Pages">Continue Shopping</Link>
  </div>
);
export { Default };
