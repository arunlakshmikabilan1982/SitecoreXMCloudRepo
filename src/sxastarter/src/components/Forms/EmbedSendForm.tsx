import React, { useEffect, useState } from 'react';
import { Field, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  LayoutServicePageState,
  isEditingOrPreviewingPage,
} from '../../helpers/LayoutServiceHelper';
import { loadMoosendScript } from 'src/utils/moosend-loader';

type EmbedSendFormProps = ComponentProps & {
  fields: {
    sendFormId: Field<string>;
  };
};

const EmbedSendForm = (props: EmbedSendFormProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const sxaStyles = `${props.params?.styles || ''}`;
  const [formRendered, setFormRendered] = useState(false);

  useEffect(() => {
    // Define the rendering function
    const renderForm = () => {
      if (!formRendered) {
        const formDiv = document.getElementById(`moosend-form-${props.fields.sendFormId.value}`);

        if (formDiv) {
          formDiv.innerHTML = '';

          // Create and configure the form element
          const form = document.createElement('form');
          form.action = 'your-form-action-url'; // Set the form action URL
          form.method = 'post'; // Set the form method (post or get)

          // Add form fields and other elements here as needed

          // Append the form to the div
          formDiv.appendChild(form);

          console.log('Form rendered successfully.');
          setFormRendered(true);
        } else {
          console.error('Form div not found.');
        }
      }
    };

    // Load the Moosend script and then render the form
    loadMoosendScript(props.fields.sendFormId.value)
      .then(() => {
        renderForm();
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formRendered, props.fields.sendFormId.value]);

  // Safely access pageState and provide a default value of undefined if it's not defined
  const pageState: LayoutServicePageState | undefined = sitecoreContext.pageState;

  if (pageState && isEditingOrPreviewingPage(pageState)) {
    const isEditing = sitecoreContext.pageEditing;
    const formIdCssClass = `form-id ${isEditing ? 'form-id-editing' : ''}`;

    const editWarning = isEditing && (
      <p className="edit-warning">
        <span>Note:</span> Editing this ID will affect all the other components that use the same
        datasource item, if any.
      </p>
    );

    return (
      <section className={`section embed-send-form ${sxaStyles}`}>
        <div className="section-content col-content container">
          <p className="component-title">Sitecore Send Form Component</p>
          <p>
            <label>Sitecore Send Form ID: </label>
            <span className={formIdCssClass}>
              <Text field={props?.fields?.sendFormId} />
            </span>
          </p>
          {editWarning}
          <p>
            Sitecore Send is disabled in edit and preview mode. You can view the form using a
            rendering host connected to the master database or by publishing and looking at the
            production website.
          </p>
        </div>
      </section>
    );
  }

  if (!props?.fields?.sendFormId?.value) {
    return <></>;
  }

  return (
    <section className="section">
      <div
        data-mooform-id={props.fields.sendFormId.value}
        id={`moosend-form-${props.fields.sendFormId.value}`}
      />
    </section>
  );
};

export default EmbedSendForm;
