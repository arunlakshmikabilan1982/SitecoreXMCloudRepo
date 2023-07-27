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
    const bgImg = `linear-gradient(0deg, rgba(13, 35, 39, 0.4),
      rgba(13, 35, 39, 0.4)),
      url(${props.field.fields.CardImage.value?.src})`;
    const id = props.params.RenderingIdentifier;
    let className = `me-4 item${props.index}`;
    className += (props.index + 1) % 2 == 0 ? ' even' : ' odd';
    if (props.index == 0) {
      className += ' first';
    }
    if (props.index + 1 == props.total) {
      className += ' last';
    }
    return (
      <section className={className}>
        <div
          className={`component image transition-all overflow-hidden mb-0 zoom-on-hover`}
          id={id ? id : undefined}
        >
          <div className="component-content">
            {props.field.fields.CardLink ? (
              <Link
                field={props.field.fields.CardLink}
                className="align-items-center d-flex flex-row justify-content-center text-capitalize text-decoration-none w-100"
              >
                {/* <Image /> */}
                <div
                  className="hover-image-card align-items-center d-flex flex-column justify-content-center text-center text-white"
                  style={{ backgroundImage: bgImg }}
                >
                  <div className="px-5 w-100">
                    <Text
                      tag="p"
                      className="component-content-cardtitle"
                      field={props.field.fields.CardTitle}
                    />
                    <Text
                      tag="h3"
                      className="component-content-carddescription border-0"
                      field={props.field.fields.CardDescription}
                    />
                  </div>
                </div>
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
  const styles = `component col-12 hover-component ${props.params.styles}`.trimEnd();
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
        <div className="component-content component-wrapper">
          <div className="mx-auto component-container-size">
            <Text tag="h2" field={props?.fields?.Title} className="heading-title border-0" />
            <div className="content-wrapper d-flex flex-row justify-content-center">{list}</div>
            <div className="d-flex justify-content-center action-sec">
              <Link field={props?.fields?.CTALink}>
                <button className="act-btn">{props.fields.CTALink.value.text}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content component-wrapper">
        <h3>Hover card list</h3>
      </div>
    </div>
  );
};
