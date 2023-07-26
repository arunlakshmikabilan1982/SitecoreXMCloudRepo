import React from 'react';
import { Image as JssImage, ImageField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsFieldLink = {
  fields: {
    Image: ImageField;
    Title: TextField;
    Description: TextField;
  };
};

interface Fields {
  Heading: TextField;
  ImageCarousalList: ResultsFieldLink[];
}

interface CarousalListProps {
  params: { [key: string]: string };
  fields: Fields;
}

type CarousalListItemProps = {
  params: { [key: string]: string };
  key: string;
  index: number;
  total: number;
  field: ResultsFieldLink;
};

const CarousalDefault = (props: CarousalListItemProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Carousal</span>
    </div>
  </div>
);

const CarousalListItem = (props: CarousalListItemProps) => {
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
          <Text
            tag="p"
            className="image-caption field-imagecaption"
            field={props.field.fields.Description}
          />
        </div>
      </div>
    );
  }
  return <CarousalDefault {...props} />;
};

export const Default = (props: CarousalListProps): JSX.Element => {
  const styles = `component ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const list = props.fields.ImageCarousalList.filter(
      (element: ResultsFieldLink) => element?.fields.Title
    ).map((element: ResultsFieldLink, key: number) => (
      <CarousalListItem
        params={props.params}
        index={key}
        key={`${key}${element.fields.Title}`}
        total={props.fields.ImageCarousalList.length}
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
        <h3>Carousal List</h3>
      </div>
    </div>
  );
};
