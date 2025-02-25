import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface BYOCXMCloudVideoProps {
  source: string;
  autoplay: boolean;
  controls: boolean;
}

export const BYOCXMCloudVideo = (props: BYOCXMCloudVideoProps): JSX.Element => {
  return (
    <div className="byoc-video-block">
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

FEAAS.External.registerComponent(BYOCXMCloudVideo, {
  name: 'BYOCXMCloudVideo',
  title: 'BYOC XM Cloud Video',
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
      default: true,
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
