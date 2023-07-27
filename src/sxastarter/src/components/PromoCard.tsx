import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  PromoCardimage: ImageField;
  PromoCardTitle: Field<string>;
  PromoCardLink: LinkField;
  PromoCardDesc: Field<string>;
}

type PromoCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoCardDefault = (props: PromoCardProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo w-100 ${props.params.styles}`} id={id ? id : undefined}>
        <div className="field-promoicon">
          <JssImage field={props.fields.PromoCardimage} />
        </div>
        <div className="promo-text position-absolute top-50 start-50 translate-middle">
          <div>
            <div className="field-promotext fw-bolder fs-1 text-light">
              <JssRichText field={props.fields.PromoCardTitle} />
            </div>
            <div className="mb-4 field-promotext fst-normal fs-3 text-light">
              <JssRichText field={props.fields.PromoCardDesc} />
            </div>
          </div>
          <div className="field-promolink">
            <JssLink
              className={'p-4 text-light border text-decoration-none'}
              field={props.fields.PromoCardLink}
            />
          </div>
        </div>
      </div>
    );
  }

  return <PromoCardDefault {...props} />;
};

export const VerticalCard = (props: PromoCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo w-100 ${props.params.styles}`} id={id ? id : undefined}>
        <div className="field-promoicon">
          <JssImage field={props.fields.PromoCardimage} />
        </div>
        <div className="promo-text mt-4 text-black">
          <div>
            <div className="field-promotext anchor-font fs-1 pt-4 pb-4">
              <JssRichText field={props.fields.PromoCardTitle} />
            </div>
            <div className="mb-4 field-promotext fst-normal fs-3 subheading-font pb-4 pt-4">
              <JssRichText field={props.fields.PromoCardDesc} />
            </div>
          </div>
          <div className="field-promolink">
            <JssLink
              className={'p-4 border-none text-decoration-none text-black subheading-font'}
              field={props.fields.PromoCardLink}
            />
          </div>
        </div>
      </div>
    );
  }

  return <PromoCardDefault {...props} />;
};
