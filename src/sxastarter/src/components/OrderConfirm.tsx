import React from 'react';
import Link from 'next/link';

const Default = (): JSX.Element => (
  <div className="component-content">
    <span className="is-empty-hint">Order Confirmed</span>
    <Link href="/">Continue Shopping</Link>
  </div>
);
export { Default };
