import React from 'react';
import { Image as JssImage, ImageField, TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type ItemDetailsProps = {
  params: { [key: string]: string };
  fields?: {
    Title?: TextField;
    Image?: ImageField;
    Description?: TextField;
    Review?: TextField;
    Specification?: TextField;
    Price?: TextField;
  };
};

const ItemDetails = (props: ItemDetailsProps): JSX.Element => {
  const styles = `component col-12 item-details ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  if (props.fields && props.fields.Image) {
    //const imageSrc = props.fields.Image.value?.src || '';

    return (
      <div className={styles} id={id || undefined}>
        <div className="component-content component-wrapper">
          <div className="mx-auto component-container-size">
            {/* Image */}
            <JssImage media={props.fields.Image} />
            <Text tag="h2" field={props.fields.Title} className="item-details-title border-0" />
            <Text tag="p" field={props.fields.Description} className="item-details-description" />
            <Text tag="p" field={props.fields.Review} className="item-details-review" />
            <Text
              tag="p"
              field={props.fields.Specification}
              className="item-details-specification"
            />
            {/* Price */}
            {props.fields.Price && (
              <Text tag="p" field={props.fields.Price} className="item-details-price" />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id || undefined}>
      <div className="component-content component-wrapper">
        <h3>Item details</h3>
      </div>
    </div>
  );
};

export default ItemDetails;
