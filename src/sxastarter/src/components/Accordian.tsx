import React from 'react';
import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Accordion } from 'react-bootstrap';

type ResultsFieldLink = {
  Question: any;
  Answer: any;
  fields: {
    Question: any;
    Answer: any;
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

const AccordianDefault = (props: any): JSX.Element => (
  <div className={`component List ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">No Question and Answer</span>
    </div>
  </div>
);
const QuestionandAnswerList = (props: any) => {
  return <Text field={props.value} />;
};

export const Default = (props: FAQListProps): JSX.Element => {
  const styles = `component container col-12 my-5 ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <Text tag="h1" field={props?.fields?.Title} />
          <Accordion defaultActiveKey="0">
            {props.fields.AccordianList.length > 0 ? (
              props.fields.AccordianList.map((item: ResultsFieldLink, key: any) => {
                return (
                  <Accordion.Item key={key} eventKey={key}>
                    <Accordion.Header>
                      <QuestionandAnswerList value={item.fields.Question} />
                    </Accordion.Header>
                    <Accordion.Body>
                      <QuestionandAnswerList value={item.fields.Answer} />
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })
            ) : (
              <AccordianDefault {...props} />
            )}
          </Accordion>
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
