import React from 'react';
import { MapPin, Wrench } from 'lucide-react';
import { LinkField, Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  DealerLocatorLink: LinkField;
  ServiceCentresLink: LinkField;
}

type BajajTopBarProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FallbackComponent = (props: BajajTopBarProps): JSX.Element => (
  <div className={`component bajaj-top-bar ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Bajaj Top Bar</span>
    </div>
  </div>
);

export const Default = (props: BajajTopBarProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (props.fields) {
    return (
      <div className={`component bajaj-top-bar w-full block relative z-[60] ${props.params?.styles}`} id={id ? id : undefined}>
        <div className="bg-[#1e2b56] w-full py-2.5 px-6 md:px-12">
          <div className="max-w-[1920px] mx-auto flex justify-end gap-6 md:gap-8">
            <JssLink
              field={props.fields.DealerLocatorLink}
              className="flex items-center gap-1.5 text-white/90 text-sm md:text-[15px] tracking-wide hover:text-white transition-colors !no-underline hover:!no-underline"
            >
              <MapPin size={18} />
              <span>{props.fields.DealerLocatorLink?.value?.text || 'Dealer Locator'}</span>
            </JssLink>
            <JssLink
              field={props.fields.ServiceCentresLink}
              className="flex items-center gap-1.5 text-white/90 text-sm md:text-[15px] tracking-wide hover:text-white transition-colors !no-underline hover:!no-underline"
            >
              <Wrench size={18} />
              <span>{props.fields.ServiceCentresLink?.value?.text || 'Service Centres'}</span>
            </JssLink>
          </div>
        </div>
      </div>
    );
  }

  return <FallbackComponent {...props} />;
};
