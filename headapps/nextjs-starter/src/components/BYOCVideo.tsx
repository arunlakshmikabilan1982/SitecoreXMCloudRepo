import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface VideoProps {
  source: string;
  autoplay: boolean;
  controls: boolean;
}

export const Video = (props: VideoProps): JSX.Element => {
  return (
    <div className="video-block">
      <video
        loop={true}
        playsInline
        autoPlay={props.autoplay}
        controls={props.controls}
        muted
        width="100%"
      >
        <source src={props.source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

FEAAS.External.registerComponent(Video, {
  name: 'Video',
  title: 'Video',
  description: 'Video with autoplay.',
  required: ['source'],
  properties: {
    source: {
      type: 'string',
      title: 'Source',
    },
    autoplay: {
      type: 'boolean',
      title: 'Video Autoplay',
      default: true,
    },
    controls: {
      type: 'boolean',
      title: 'Show Controls',
      default: false,
    },
  },
  ui: {
    source: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:placeholder': 'Enter video source',
    },
    autoplay: {
      'ui:widget': 'radio',
    },
    controls: {
      'ui:widget': 'radio',
    },
  },
});
