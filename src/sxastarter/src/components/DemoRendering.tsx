import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
    SomeText: Field<string>;
}

export type DemoRenderingProps = {
    params: { [key: string]: string };
    fields: Fields;
};

export const Default = (props: DemoRenderingProps): JSX.Element => {
    return (
        <div className={`component·demorendering·${props.params.styles}`}
        >
            <div className="component-content">
                <Text field={props.fields.SomeText}/></div>
        </div>
    );
};
