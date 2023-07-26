import React from 'react';
import {
  Image as JssImage,
  ImageField,
  Text,
  TextField,
  LinkField,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

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

type ImageTileListItemProps = {
  params: { [key: string]: string };
  key: string;
  index: number;
  total: number;
  field: ResultsFieldLink;
};

const ImageDefault = (props: ImageTileListItemProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

const ImageTileListItem = (props: ImageTileListItemProps) => {
  if (props.field.fields) {
    const Image = () => <JssImage field={props.field.fields.Image} className="w-100" />;
    const id = props.params.RenderingIdentifier;
    let className = `item${props.index}`;
    className += (props.index + 1) % 2 == 0 ? ' even' : ' odd';
    if (props.index == 0) {
      className += ' first1';
    }
    if (props.index + 1 == props.total) {
      className += ' last1';
    }
    return (
        <div className={`component image col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 pt-4`} id={id ? id : undefined}>
          <div className="component-content">
            {props.field.fields.TargetUrl ? (
              <Link field={props.field.fields.TargetUrl} className='w-100'>
                <Image />
              </Link>
            ) : (
              <Image />
            )}
          </div>
          <div className="component-content position-absolute b-15p w-100">
            <Text
                tag="span"
                className="image-caption field-imagecaption anchor-font text-white text-uppercase fs-1 fst-normal text-center"
                field={props.field.fields.ImageTitle}
              />
          </div>
        </div>
    );
  }
  return <ImageDefault {...props} />;
};

export const Default = (props: ImageTileListProps): JSX.Element => {
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
          <Text tag="h1" className="anchor-font border-0 fst-normal fw-normal mb-5 text-black text-center" field={props?.fields?.Heading} />
          <p className='subheading-font fs-3 mb-5 text-center'>Shop everything from the best fashion and accessories to homeware, electronics, and much more</p>
          <div className='row'>{list}</div>
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
