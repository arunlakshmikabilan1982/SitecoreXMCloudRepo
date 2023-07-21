import React from 'react';
import { Image as JssImage, ImageField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsFieldLink = {
  fields: {
    Image: ImageField;
    Title: TextField;
  };
};

interface Fields {
  Heading: TextField;
  ImageList: ResultsFieldLink[];
}

interface ImageTextListProps {
  params: { [key: string]: string };
  fields: Fields;
}

type ImageTextListItemProps = {
  params: { [key: string]: string };
  key: string;
  index: number;
  total: number;
  field: ResultsFieldLink;
};

const ImageDefault = (props: ImageTextListItemProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

const ImageTextListItem = (props: ImageTextListItemProps) => {
  if (props.field.fields) {
    const Image = () => <JssImage field={props.field.fields.Image} />;
    return (
      <div
        className={`component-content col-12 col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3 `}
      >
        <div className={'p-5'}>
          <Image />
          <Text
            tag="p"
            className="image-caption field-imagecaption"
            field={props.field.fields.Title}
          />
        </div>
      </div>
    );
  }
  return <ImageDefault {...props} />;
};

export const Default = (props: ImageTextListProps): JSX.Element => {
  
  const styles = `component ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const list = props.fields.ImageList.filter(
      (element: ResultsFieldLink) => element?.fields.Title
    ).map((element: ResultsFieldLink, key: number) => (
      <ImageTextListItem
        params={props.params}
        index={key}
        key={`${key}${element.fields.Title}`}
        total={props.fields.ImageList.length}
        field={element}
      />
    ));
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <Text tag="h1" field={props?.fields?.Heading} />
          <div className="row g-2">{list}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Image Text List</h3>
      </div>
    </div>
  );
};
