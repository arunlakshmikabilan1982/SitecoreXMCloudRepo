import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
interface Fields {
  Title: Field<string>;
  Text: Field<string>;
}
type TitleAndTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};
export const Default = (props: TitleAndTextProps): JSX.Element => {
  return (
    <div className="container-default">
      <h1 className="component title row">
        <Text field={props.fields.Title} />
      </h1>
      <div className="component text row">
        <Text field={props.fields.Text} />
      </div>
    </div>
  );
};
