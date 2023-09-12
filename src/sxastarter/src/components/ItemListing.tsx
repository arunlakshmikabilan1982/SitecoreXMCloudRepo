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
    Image: ImageField;
    Title: TextField;
    Description: TextField;
    Review: TextField;
    Link: LinkField;
    Price: TextField; 
  };
};

interface Fields {
  Title: TextField;
  ItemsList: ResultsFieldLink[];
  CTALink: LinkField;
}

type ItemListingProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ItemListItem = (props: ItemListingProps) => {
  const { fields } = props;

  if (fields.ItemsList && fields.ItemsList.length > 0) {
    return (
      <div className="item-listing">
        {fields.ItemsList.map((item, index) => (
          <div key={`item-${index}`} className="item">
            {item.fields.Image && (
              <JssImage field={item.fields.Image} className="item-image" />
            )}
            <div className="item-details">
              {item.fields.Title && (
                <Text tag="h3" className="item-title" field={item.fields.Title} />
              )}
              {item.fields.Description && (
                <Text
                  tag="p"
                  className="item-description"
                  field={item.fields.Description}
                />
              )}
              {/* Add Fields */}
              {item.fields.Price && (
                <Text tag="p" className="item-price" field={item.fields.Price} />
              )}
              {item.fields.Review && (
                <Text tag="p" className="item-review" field={item.fields.Review} />
              )}
              {item.fields.Link && (
                <Link
                  field={item.fields.Link}
                  className="item-link"
                >
                  Read more
                </Link>
              )}
            </div>
          </div>
        ))}
        {fields.CTALink && (
          <div className="cta-button">
            <Link field={fields.CTALink}>
              <button>{fields.CTALink.value.text}</button>
            </Link>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ItemListItem;
