import React from 'react';
import Slider, { Settings } from 'react-slick';
import {
  Image as JssImage,
  ImageField,
  Text,
  TextField,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsFieldLink = {
  fields: {
    Image: ImageField;
    Heading: TextField;
    Description: TextField;
    IsVideo: Field<boolean>;
    VideoSourceUrl: Field<string>;
  };
};

interface Fields {
  Title: TextField;
  CarousalItemList: ResultsFieldLink[];
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

    const Image = () => <JssImage field={props.field.fields.Image} />;
    console.log('IsVideo', props.field.fields.IsVideo);
    let captionSec = <></>;
    const Videosource = (
      <video width="320" height="240" controls>
        <source src={props.field.fields.VideoSourceUrl?.value} type="video/mp4" />
      </video>
    );
    if (props.field.fields.Heading.value || props.field.fields.Description.value) {
      captionSec = (
        <section className="p-4">
          <Text
            tag="h2"
            className="h2-card-title image-caption field-imagecaption"
            field={props.field.fields?.Heading}
          />
          <Text
            tag="p"
            className="p-card-description image-caption field-imagecaption"
            field={props.field.fields?.Description}
          />
        </section>
      );
    }
    console.log('Caption', props.field.fields, captionSec);
    if (props.field.fields.IsVideo.value) {
      return (
        <div className={'mx-3 my-card'}>
          <figure className="m-0">{Videosource}</figure>
          {captionSec}
        </div>
      );
    } else {
      return (
        <div className={'mx-3 my-card'}>
          <figure className="m-0">
            <Image />
          </figure>
          {captionSec}
        </div>
      );
    }
  }
  return <CarousalDefault {...props} />;
};

export const Default = (props: CarousalListProps): JSX.Element => {
  const styles = `component image-carousal-list-component col-12 ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    // props.fields.Heading.value = 'My dummy Heading';
    const sliderSettings: Settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
    };
    console.log('CarousalItemList', props.fields.CarousalItemList);
    const list = props.fields.CarousalItemList.filter(
      (element: ResultsFieldLink) => element?.fields.Heading
    ).map((element: ResultsFieldLink, key: number) => (
      <CarousalListItem
        params={props.params}
        index={key}
        key={`${key}${element.fields.Heading}`}
        total={props.fields.CarousalItemList.length}
        field={element}
      />
    ));
    console.log('list', list);
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <Text tag="h1" field={props?.fields?.Title} />
          <div className="row mb-5 px-3">
            <Slider {...sliderSettings}>{list}</Slider>
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
