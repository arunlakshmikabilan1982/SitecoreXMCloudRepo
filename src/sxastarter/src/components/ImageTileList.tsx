import React from 'react';
import { Image as JssImage, ImageField, Text, TextField, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsFieldLink = {
  fields: {
    Image: ImageField;
    ImageTitle: TextField;
    TargetUrl: LinkField;
  };
};

interface Fields {
  Heading: TextField;
  ImageList: ResultsFieldLink[];
}

type ImageTileListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

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

const ImageTileListItem = (props: ImageTextListItemProps) => {
  if (props.field.fields) {
    const Image = () => <JssImage field={props.field.fields.Image} />;
    const id = props.params.RenderingIdentifier;
    let className = `item${props.index}`;
    className += (props.index + 1) % 2 == 0 ? ' even' : ' odd';
    if (props.index == 0) {
      className += ' first';
    }
    if (props.index + 1 == props.total) {
      className += ' last';
    }
    return (
      <li className={className}>
        <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
          <div className="component-content">
            {props.field.fields.TargetUrl ? (
              <Link field={props.field.fields.TargetUrl}>
                <Image />
              </Link>
            ) : (
              <Image />
            )}
            <Text
              tag="span"
              className="image-caption field-imagecaption"
              field={props.field.fields.ImageTitle}
            />
          </div>
        </div>
      </li>
    );
  }
  return <ImageDefault {...props} />;
};

export const Default = (props: ImageTileListProps): JSX.Element => {
  console.log(props);
  const styles = `component link-list ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const list = props.fields.ImageList.filter(
      (element: ResultsFieldLink) => element?.fields.TargetUrl
    ).map((element: ResultsFieldLink, key: number) => (
      <ImageTileListItem
        params={props.params}
        index={key}
        key={`${key}${element.fields.TargetUrl}`}
        total={props.fields.ImageList.length}
        field={element}
      />
    ));

    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <Text tag="h1" field={props?.fields?.Heading} />
          <ul>{list}</ul>
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
