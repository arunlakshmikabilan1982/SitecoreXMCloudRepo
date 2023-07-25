import React from 'react';
import {
  Image as JssImage,
  ImageField,
  LinkField,
  TextField,
  Link,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsFieldLink = {
  fields: {
    CardImage: ImageField;
    CardTitle: TextField;
    CardLink: LinkField;
    CardDescription: TextField;
  };
};

interface Fields {
  Title: TextField;
  CTALink: LinkField;
  CardImageList: ResultsFieldLink[];
}

type HoverCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type HoverCardListItemProps = {
  params: { [key: string]: string };
  key: string;
  index: number;
  total: number;
  field: ResultsFieldLink;
};

const ImageDefault = (props: HoverCardListItemProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

const HoverCardListItem = (props: HoverCardListItemProps) => {
  if (props.field.fields) {
    const Image = () => <JssImage field={props.field.fields.CardImage} />;
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
      <section className={className}>
        <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
          <div className="component-content">
            {props.field.fields.CardLink ? (
              <Link field={props.field.fields.CardLink}>
                <Image />
                <Text
                  tag="p"
                  className="component-content-cardtitle"
                  field={props.field.fields.CardTitle}
                />
                <Text
                  tag="h3"
                  className="component-content-carddescription"
                  field={props.field.fields.CardDescription}
                />
              </Link>
            ) : (
              <Image />
            )}
          </div>
        </div>
      </section>
    );
  }
  return <ImageDefault {...props} />;
};

export const Default = (props: HoverCardProps): JSX.Element => {
  console.log(props);
  const styles = `component link-list ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const list = props.fields.CardImageList.filter(
      (element: ResultsFieldLink) => element?.fields.CardLink
    ).map((element: ResultsFieldLink, key: number) => (
      <HoverCardListItem
        params={props.params}
        index={key}
        key={`${key}${element.fields.CardLink}`}
        total={props.fields.CardImageList.length}
        field={element}
      />
    ));

    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <Text tag="h2" field={props?.fields?.Title} />
          <div>{list}</div>
          <Link field={props?.fields?.CTALink}></Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Hover card list</h3>
      </div>
    </div>
  );
};
