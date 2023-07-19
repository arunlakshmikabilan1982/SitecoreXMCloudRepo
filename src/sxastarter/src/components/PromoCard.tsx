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
  console.log(props.fields);
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoCardimage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PromoCardTitle} />
              </div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PromoCardDesc} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoCardLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoCardDefault {...props} />;
};
