import React from 'react';
import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsFieldLink = {
  fields: {
    	Question: TextField;
      Answer: TextField;
  };
};

interface Fields {
  Title: TextField;
  AccordianList: ResultsFieldLink[];
}

interface FAQListProps {
  params: { [key: string]: string };
  fields: Fields;
}

type FAQListItemProps = {
  params: { [key: string]: string };
  key: string;
  index: number;
  total: number;
  field: ResultsFieldLink;
};


const AccordianDefault = (props: FAQListItemProps): JSX.Element => (
  <div className={`component List ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">No Question and Answer</span>
    </div>
  </div>
);
const QuestionandAnswerList = (props: FAQListItemProps) => {
  if (props.field.fields) {
    return (
      <div>
        <Text field={props.field.fields.Question} />
        <Text tag="p" field={props.field.fields.Answer} />
      </div>
    );
  }
  return <AccordianDefault {...props} />;
};

export const Default = (props: FAQListProps): JSX.Element => {
  const styles = `component ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const list = props.fields.AccordianList.filter(
      (element: ResultsFieldLink) => element?.fields.Question
    ).map((element: ResultsFieldLink, key: number) => (
      <QuestionandAnswerList
        params={props.params}
        index={key}
        key={`${key}${element.fields.Answer}`}
        total={props.fields.AccordianList.length}
        field={element}
      />
    ));
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <Text tag="h1" field={props?.fields?.Title} />
          <div className="row g-2">{list}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Text List</h3>
      </div>
    </div>
  );
};
