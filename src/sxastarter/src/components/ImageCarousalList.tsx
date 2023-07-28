import React from 'react';
import Slider, { Settings } from 'react-slick';
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
    if (props.field.fields.Image.value) {
      props.field.fields.Image.value.width = '100%';
      props.field.fields.Image.value.height = 'auto';
    }
    // props.field.fields.Title.value = 'Imagine more comfort';
    // props.field.fields.Description.value = 'Accentuate your home with accessories and comfort by visiting our furniture stores.';
    const Image = () => <JssImage field={props.field.fields.Image} />;
    let captionSec = () => (<></>);
    if(props.field.fields.Title) {
      captionSec = () => (<section className='p-4'>
        <Text
          tag="h2"
          className="h2-card-title image-caption field-imagecaption"
          field={props.field.fields.Title}
        />
        <Text
          tag="p"
          className="p-card-description image-caption field-imagecaption"
          field={props.field.fields.Description}
        />
      </section>);
    }
    return (
      <div className={'mx-3 my-card'}>
        <figure className='m-0'>
          <Image />
        </figure>
        {<captionSec />}
      </div>
    );
  }
  return <CarousalDefault {...props} />;
};

export const Default = (props: CarousalListProps): JSX.Element => {
  const styles = `component image-carousal-list-component col-12 ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    // props.fields.Heading.value = 'My dummy Heading';
    const sliderSettings: Settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: true
    };
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
          <div className="row mb-5 px-3">
            <Slider {...sliderSettings}>
              {list}
            </Slider>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h1>Carousal List</h1>
      </div>
    </div>
  );
};
