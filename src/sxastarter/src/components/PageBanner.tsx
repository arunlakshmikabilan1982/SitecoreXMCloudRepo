import React from 'react';
import {
  Image as JssImage,
  ImageField,
  RichText as JssRichText,
  Field,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  BannerImage: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  TargetUrl: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const backgroundStyle = { backgroundImage: `url('${props?.fields?.BannerImage?.value?.src}')` };
  const modifyImageProps = {
    ...props.fields.BannerImage,
    editable: props?.fields?.BannerImage?.editable
      ?.replace(`width="${props?.fields?.BannerImage?.value?.width}"`, 'width="100%"')
      .replace(`height="${props?.fields?.BannerImage?.value?.height}"`, 'height="100%"'),
  };
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component hero-banner ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}>
        {sitecoreContext.pageEditing ? <JssImage field={modifyImageProps} /> : ''}
      </div>
    </div>
  );
};

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields) {
    const Image = () => <JssImage field={props.fields.BannerImage} />;
    const id = props.params.RenderingIdentifier;

    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <h1 className="pagebanner-header">
            <Text
              tag="span"
              className="field-imagecaption pagebanner-title"
              field={props.fields.Title}
            />
          </h1>
            <JssRichText field={props.fields.Description} />
          {sitecoreContext.pageState === 'edit' ? <Image /> : <Image />}
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
