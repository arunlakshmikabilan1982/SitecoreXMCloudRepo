import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  SomeText: Field<string>;
} 

type DemoRenderingProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: DemoRenderingProps): JSX.Element => {
  return (
    <div className={`component demorendering ${props.params.styles}`}>
      <div className="component-content">
    <div>
          <Text field={props.fields.SomeText} />
    </div>
    </div>
    </div>
    );
};