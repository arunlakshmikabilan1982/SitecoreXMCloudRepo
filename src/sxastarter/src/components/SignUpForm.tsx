import React, { FormEvent } from 'react';
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
import Link from 'next/link';

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
  /*const phKey = `container-${props.params.DynamicPlaceholderId}`;*/
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
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
      webPersonalization: true,
      pointOfSale: pointOfSale,
    });
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
    const res = await fetch('/api/user/create', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-Type': 'application/json',
      },
    });
    const response = await res.json();
    if (response == 'success') {
      loginUser(user);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form_values = Object.fromEntries(formData);
    console.log('form:' + JSON.stringify(form_values));
    createOrUpdateUser(form_values);
  };

  return (
    <div className={`component container-default ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="col-12 component container p-4 mall-form">
          <div className="d-flex flex-row justify-content-center mt-5">
            <h1>Create your account</h1>
          </div>
          <form className="col-9 m-auto row p-5" onSubmit={onSubmit}>
            <div className="px-4 col-12 d-flex form-group justify-content-start my-3 row">
              <div className="form-check me-4 w-auto">
                <input
                  type="radio"
                  value="Mr"
                  name="title"
                  className="form-check-input"
                  id="mr-title"
                />

                <label className="form-check-label" htmlFor="mr-title">
                  Mr
                </label>
              </div>

              <div className="form-check me-4 w-auto">
                <input
                  type="radio"
                  value="Mrs"
                  name="title"
                  className="form-check-input"
                  id="mrs-title"
                />

                <label className="form-check-label" htmlFor="mrs-title">
                  Mrs
                </label>
              </div>

              <div className="form-check me-4 w-auto">
                <input
                  type="radio"
                  value="Ms"
                  name="title"
                  className="form-check-input"
                  id="ms-title"
                />

                <label className="form-check-label" htmlFor="ms-title">
                  Ms
                </label>
              </div>
            </div>

            <div className="px-3 col-6 form-group my-3 row">
              <div className="col-12">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="firstname"
                  aria-describedby="firstName"
                  placeholder="First Name"
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
                />
              </div>
            </div>

            <div className="px-3 col-6 form-group my-3 row">
              <div className="col-12">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  aria-describedby="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="px-4 col-10 d-flex form-group justify-content-start my-3 row">
              <div className="form-check me-4 w-auto">
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  className="form-check-input"
                  id="male-gender"
                />

                <label className="form-check-label" htmlFor="male-gender">
                  Male
                </label>
              </div>

              <div className="form-check me-4 w-auto">
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  className="form-check-input"
                  id="female-gender"
                />

                <label className="form-check-label" htmlFor="female-gender">
                  Female
                </label>
              </div>

              <div className="form-check me-4 w-auto">
                <input
                  type="radio"
                  value="others"
                  name="gender"
                  className="form-check-input"
                  id="others-gender"
                />

                <label className="form-check-label" htmlFor="others-gender">
                  Others
                </label>
              </div>
            </div>

            <div className="px-3 col-6 form-group my-3 row">
              <div className="col-12">
                <input
                  type="number"
                  name="mobilenumber"
                  className="form-control"
                  id="mobilenumber"
                  aria-describedby="mobilenumber"
                  placeholder="Mobile Number"
                />
              </div>
            </div>

            <div className="px-3 col-6 form-group my-3 row">
              <div className="col-12">
                <input
                  type="date"
                  name="dateofbirth"
                  className="form-control"
                  id="dateofbirth"
                  aria-describedby="dateofbirth"
                  placeholder="Date of Birth"
                />
              </div>
            </div>

            <div className="px-4 col-12 form-group form-check my-3 row">
              <div className="form-check me-4 w-auto">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="termCondition"
                  id="term-condition"
                />
                <label className="form-check-label" htmlFor="term-condition">
                  You confirm that you have read and agreed to our <a href="/">Privacy Policy</a>{' '}
                  and <a href="/">Terms & Conditions</a>.
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-center pt-5">
              <button type="submit" className="bg-dark btn me-5 text-bg-dark">
                Sign Up
              </button>
            </div>
            <div className="d-flex justify-content-center pt-5">
              <label className="form-check-label" htmlFor="term-condition">
                You already have an account? <Link href="/login">Sign In</Link>
              </label>
            </div>
          </form>
        </div>
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
