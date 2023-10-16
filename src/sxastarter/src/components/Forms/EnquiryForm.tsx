import React, { FormEvent, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
  PosResolver,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { signIn, getSession } from 'next-auth/react';
import { init } from '@sitecore/engage';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';
import { useRouter } from 'next/navigation';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const DefaultContainer = (props: ComponentProps): JSX.Element => {
  const {
    sitecoreContext: { pageState, route, site },
  } = useSitecoreContext();
  const language = route?.itemLanguage || config.defaultLanguage;
  const siteInfo = siteResolver.getByName(site?.name || config.jssAppName);
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    const prefix = `${pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }

  const router = useRouter();

  const createIdentity = async (user: any) => {
    const pointOfSale = PosResolver.resolve(siteInfo, language);
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      cookieDomain: window.location.host.replace(/^www\./, ''),
      forceServerCookieMode: false,
      webPersonalization: true,
      pointOfSale: pointOfSale,
    });
    console.log('createIdentity:signup:' + JSON.stringify(user));
    engage.identity({
      channel: 'web',
      currency: 'USD',
      pointOfSale,
      page: window.location.host,
      language,
      email: user?.email ? user?.email : '',
      firstName: user?.firstName,
      lastName: user?.lastName,
      gender: user?.gender,
      phone: user?.mobileNumber,
      title: user?.title,
      identifiers: [
        {
          id: user?.email ? user?.email : '',
          provider: 'email',
        },
      ],
    });
    console.log('Identity event triggered in signup page');
    const eventData = {
      channel: 'WEB',
      currency: 'USD',
      pointOfSale,
      language: 'EN',
      page: 'home',
    };
    engage.event('GuestCreated', eventData);
    console.log('GuestCreated event triggered');
  };

  const loginUser = async (user: any) => {
    const result = await signIn('credentials', {
      email: user.email,
      password: user.password,
      redirect: false,
      callbackUrl: '/Mall-Pages',
    });
    if (result?.ok) {
      const session = await getSession();
      console.log('Identity event loading');
      const sessionUser = session?.user;
      if (sessionUser) {
        createIdentity(sessionUser);
        const url = result.url ? result?.url : '/Mall-Pages';
        router.push(url);
      }
    }
  };

  const createOrUpdateUser = async (user: any) => {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    if (response.ok) {
      loginUser(user);
    }
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // State to track form submission

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Add form field validations here
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const roomType = formData.get('roomType') as string;
    const numberOfGuest = formData.get('NumberOfGuest') as string;
    const arrivalDate = formData.get('ArrivalDate') as string;
    const departureDate = formData.get('DepartureDate') as string;

    // Check if required fields are filled
    if (
      !firstName ||
      !lastName ||
      !email ||
      !roomType ||
      !numberOfGuest ||
      !arrivalDate ||
      !departureDate
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Add custom validations here (e.g., validate email format, check date ranges, etc.)
    // ...

    // Convert the ArrivalDate and DepartureDate to ISO 8601 format
    formData.set('ArrivalDate', new Date(arrivalDate).toISOString());
    formData.set('DepartureDate', new Date(departureDate).toISOString());
    const form_values = Object.fromEntries(formData);

    console.log('form:', JSON.stringify(form_values));

    await createOrUpdateUser(form_values);

    // Set isFormSubmitted to true after successful form submission
    setIsFormSubmitted(true);
  };

  return (
    <div className={`component container-default ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        {isFormSubmitted ? (
          // Success Message
          <div className="success-message">
            <p>Your form has been successfully submitted!</p>
          </div>
        ) : (
          // Form Content
          <div className="col-12 component container p-4 mall-form">
            <div className="d-flex flex-row justify-content-center mt-5">
              <h1>Enquiry Form</h1>
            </div>
            <form className="col-9 m-auto row p-5" onSubmit={onSubmit}>
              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="firstname"
                    aria-describedby="firstName"
                    placeholder="First Name"
                    required // Required field
                  />
                </div>
              </div>

              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="lastname"
                    aria-describedby="lastName"
                    placeholder="Last Name"
                    required // Required field
                  />
                </div>
              </div>

              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    required // Required field
                  />
                </div>
              </div>

              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <label htmlFor="roomType" className="sr-only">
                    Room Type
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    className="form-control"
                    aria-describedby="roomType"
                    required // Required field
                  >
                    <option value="">Please Select</option>
                    <option value="Single Room">Single Room</option>
                    <option value="Double Room">Double Room</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
              </div>

              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="number"
                    name="NumberOfGuest"
                    className="form-control"
                    id="NumberOfGuest"
                    aria-describedby="NumberOfGuest"
                    placeholder="NumberOfGuest"
                    required // Required field
                  />
                </div>
              </div>

              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="date"
                    name="ArrivalDate"
                    className="form-control"
                    id="ArrivalDate"
                    aria-describedby="ArrivalDate"
                    placeholder="Arrival Date"
                    required // Required field
                  />
                </div>
              </div>

              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="date"
                    name="DepartureDate"
                    className="form-control"
                    id="Departuredate"
                    aria-describedby="DepartureDate"
                    placeholder="Departure Date"
                    required // Required field
                  />
                </div>
              </div>

              <div className="px-3 col-6 form-group my-3 row">
                <div className="col-12">
                  <input
                    type="text"
                    name="specialRequest"
                    className="form-control"
                    id="specialRequest"
                    aria-describedby="specialRequest"
                    placeholder="Special Request"
                  />
                </div>
              </div>

              <div className="px-4 col-10 d-flex form-group justify-content-start my-3 row">
                <div className="form-check me-4 w-auto">
                  <input
                    type="checkbox"
                    value="freepickup"
                    name="freePickup"
                    className="form-check-input"
                    id="freePickup"
                  />
                  <label className="form-check-label" htmlFor="male-gender">
                    Free PickUp
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-center pt-5">
                <button type="submit" className="bg-dark btn me-5 text-bg-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export const Default = (props: ComponentProps): JSX.Element => {
  const splitStyles = props.params?.Styles?.split(' ');

  if (splitStyles && splitStyles.includes('container')) {
    return (
      <div className="container-wrapper">
        <DefaultContainer {...props} />
      </div>
    );
  }

  return <DefaultContainer {...props} />;
};
