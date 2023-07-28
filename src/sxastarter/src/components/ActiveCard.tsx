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
  ActiveCardImage: ImageField;
  ActiveCardHeading: Field<string>;
  ActiveCardLink: LinkField;
  ActiveCardDesc: Field<string>;
}

type ActiveCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ActiveCardDefault = (props: ActiveCardProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: ActiveCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo w-100 ${props.params.styles}`} id={id ? id : undefined}>
        <div className="row g-2">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div className="promo-text position-absolute top-50 w-50">
              <div>
                <div className="field-promotext">
                  <JssRichText tag="h1" field={props.fields.ActiveCardHeading} />
                </div>
                <div className="field-promotext mb-5">
                  <JssRichText tag="span" field={props.fields.ActiveCardDesc} />
                </div>
              </div>
              <div className="field-promolink text-center">
                <JssLink
                  className="p-4 text-white bg-dark text-decoration-none"
                  field={props.fields.ActiveCardLink}
                />
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div className="field-promoicon">
              <JssImage field={props.fields.ActiveCardImage} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ActiveCardDefault {...props} />;
};
export const ImageLeft = (props: ActiveCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  console.log(props.fields);
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.ActiveCardImage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <span>This is imageLeft</span>
                <JssRichText field={props.fields.ActiveCardHeading} />
              </div>
              <div className="field-promotext">
                <JssRichText field={props.fields.ActiveCardDesc} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.ActiveCardLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ActiveCardDefault {...props} />;
};
export const ImageRight = (props: ActiveCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  console.log(props.fields);
  if (props.fields) {
    return (
      <div
        className={`component container promo ${props.params.styles} w-100`}
        id={id ? id : undefined}
      >
        <div className="border-0 component-content d-flex flex-row">
          <div className="flex-col flex-row justify-content-between m-auto position-relative promo-text w-50">
            <div className=" me-5 ms-5">
              <div className="field-promotext">
                <JssRichText
                  className="anchor-font heading3 pb-1"
                  field={props.fields.ActiveCardHeading}
                />
              </div>
              <div className="field-promotext">
                <JssRichText className="pb-5 pt-2 subheading" field={props.fields.ActiveCardDesc} />
              </div>
              <div className="bg-black field-promolink text-center p-4 mt-5">
                <JssLink
                  className="p-4 text-decoration-none subheading text-white"
                  field={props.fields.ActiveCardLink}
                />
              </div>
            </div>
          </div>
          <div className="flex-col field-promoicon w-50">
            <JssImage className="img-right" field={props.fields.ActiveCardImage} />
          </div>
        </div>
      </div>
    );
  }

  return <ActiveCardDefault {...props} />;
};
export const ImageTop = (props: ActiveCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  console.log(props.fields);
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.ActiveCardImage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.ActiveCardHeading} />
              </div>
              <div className="field-promotext">
                <JssRichText field={props.fields.ActiveCardDesc} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.ActiveCardLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ActiveCardDefault {...props} />;
};
