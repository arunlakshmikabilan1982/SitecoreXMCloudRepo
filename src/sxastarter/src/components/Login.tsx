import React, { useRef } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
  PosResolver,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { signIn, getSession } from 'next-auth/react';
import config from 'temp/config';
import { init } from '@sitecore/engage';
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
  const emailId = useRef('');
  const passwd = useRef('');
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
    console.log('createIdentity:' + JSON.stringify(user));
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
      title: user?.title,
      phone: user?.phone,
      identifiers: [
        {
          id: user?.email ? user?.email : '',
          provider: 'email',
        },
      ],
    });
    console.log('Identity event triggered');
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email: emailId.current,
      password: passwd.current,
      redirect: false,
      callbackUrl: '/Mall-Pages',
    });
    if (result?.ok) {
      const session = await getSession();
      console.log('Identity event loading');
      const user = session?.user;
      createIdentity(user);
      const url = result.url ? result?.url : '/Mall-Pages';
      router.push(url);
    }
  };
  return (
    <div className={`component container-default ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="col-12 component container p-4 mall-form">
          <div className="d-flex flex-row justify-content-center mt-5">
            <h1>SIGN-IN TO YOUR ACCOUNT</h1>
          </div>
          <form className="col-9 m-auto row p-5">
            <div className="px-2 offset-2 col-8 form-group my-3 row">
              <div className="col-12">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"
                  onChange={(e) => (emailId.current = e.target.value)}
                />
              </div>
            </div>
            <div className="px-2 offset-2 col-8 form-group my-3 row">
              <div className="col-12">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="sign-up-password"
                  aria-describedby="password"
                  placeholder="Password"
                  onChange={(e) => (passwd.current = e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center pt-5">
              <button type="submit" className="bg-dark btn me-5 text-bg-dark" onClick={onSubmit}>
                Sign In
              </button>
            </div>
            <div className="d-flex justify-content-center pt-5">
              <label className="form-check-label" htmlFor="term-condition">
                Dont have an account? <Link href="/signUp">Sign Up</Link>
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
