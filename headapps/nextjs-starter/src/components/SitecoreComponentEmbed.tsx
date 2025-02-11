import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect } from 'react';
import Link from 'next/link';
/* eslint-disable */
import * as FEAAS from '@sitecore-feaas/clientside/react';
/* eslint-enable */

interface Fields {
  Title: Field<string>;
}

type SitecoreComponentEmbedProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const SitecoreComponentEmbedDefault = (props: SitecoreComponentEmbedProps): JSX.Element => (
  <div className={`component sitecore-component-embed ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">SitecoreComponentEmbed</span>
    </div>
  </div>
);

// Collection: CNX Components
// Component:  Gift Card
// Version:    Responsive
// URL:        https://components.sitecorecloud.io/libraries/26MAXx0TD44CQoHma6fhIn/components/9ZeWCeEqqN
export function FEAASGiftCard({ data, children }: { data: any; children?: React.ReactNode }) {
  useEffect(() => {
    // Load FEAAS Clientside asynchronously on demand (only once)
    window.FEAASLoading =
      window.FEAASLoading ||
      new Promise((onload, onerror) => {
        document.head.appendChild(
          Object.assign(document.createElement('script'), {
            src: 'https://feaasstatic.blob.core.windows.net/packages/clientside/latest/browser/index.esm.js',
            type: 'module',
            onload,
            onerror,
          })
        );
      });
  }, []);
  return (
    <>
      <Link
        rel="preload"
        as="script"
        href="https://feaasstatic.blob.core.windows.net/packages/clientside/latest/browser/index.esm.js"
      />
      <feaas-component
        src="26MAXx0TD44CQoHma6fhIn/9ZeWCeEqqN"
        data={data ? JSON.stringify(data) : '{}'}
      >
        {children}
      </feaas-component>
    </>
  );
}

export const Default = (props: SitecoreComponentEmbedProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component sitecore-component-embed ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content">
          <JssRichText field={props.fields.Title} />
          <div className="embed-component">
            <FEAASGiftCard data={{}}>
              {/* You can place your SEO-friendly here. Component will overwrite it when loaded. */}
            </FEAASGiftCard>
          </div>
        </div>
      </div>
    );
  }

  return <SitecoreComponentEmbedDefault {...props} />;
};
