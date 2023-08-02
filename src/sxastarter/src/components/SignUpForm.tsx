import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const DefaultContainer = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const phKey = `container-${props.params.DynamicPlaceholderId}`;
  const id = props.params.RenderingIdentifier;
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }

  return (
    <div className={`component container-default ${styles}`} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className='col-12 component container p-4 mall-form'>
          <div className="d-flex flex-row justify-content-center mt-5">
            <h1>Create your account</h1>
          </div>
          <form className='col-9 m-auto row p-5'>
            <div className="col-12 form-group my-3 row">
              {/* <label htmlFor="exampleInputEmail1" className="col-1 col-5 col-form-label">Email address</label> */}
              <div className='form-check me-4 w-auto'>
                <input type="checkbox" name='gender' className="form-check-input" id="mr-gender" />
                <label className="form-check-label" htmlFor="mr-gender">Mr</label>
              </div>
              <div className='form-check me-4 w-auto'>
                <input type="checkbox" name='gender' className="form-check-input" id="mrs-gender" />
                <label className="form-check-label" htmlFor="mrs-gender">Mrs</label>
              </div>
              <div className='form-check me-4 w-auto'>
                <input type="checkbox" name='gender' className="form-check-input" id="other-gender" />
                <label className="form-check-label" htmlFor="other-gender">Other</label>
              </div>
            </div>
            <div className="col-6 form-group my-3 row">
              <label htmlFor="firstname" className="col-1 col-5 col-form-label">First Name</label>
              <div className="col-7">
                <input type="text" name='firstName' className="form-control" id="firstname" aria-describedby="firstName" placeholder="First Name" />
              </div>
            </div>
            <div className="col-6 form-group my-3 row">
              <label htmlFor="lastname" className="col-1 col-5 col-form-label">Last Name</label>
              <div className="col-7">
                <input type="text" name='lastName' className="form-control" id="lastname" aria-describedby="lastName" placeholder="Last Name" />
              </div>
            </div>
            <div className="col-6 form-group my-3 row">
              <label htmlFor="age" className="col-1 col-5 col-form-label">Age</label>
              <div className="col-7">
                <input type="number" name='age' className="form-control" id="age" aria-describedby="age" placeholder="Age" />
              </div>
            </div>
            <div className="col-6 form-group my-3 row">
              <label htmlFor="exampleInputEmail1" className="col-1 col-5 col-form-label">Email address</label>
              <div className="col-7">
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
            </div>
            <div className="col-6 form-group my-3 row">
              <label htmlFor="sign-up-password" className="col-1 col-5 col-form-label">Password</label>
              <div className="col-7">
                <input type="password" name='password' className="form-control" id="sign-up-password" aria-describedby="password" placeholder="Password" />
              </div>
            </div>
            <div className="col-6 form-group my-3 row">
              <label htmlFor="sign-up-confirm-password" className="col-1 col-5 col-form-label">Confirm Password</label>
              <div className="col-7">
                <input type="password" name='confirmPassword' className="form-control" id="sign-up-confirm-password" aria-describedby="confirm password" placeholder="Confirm password" />
              </div>
            </div>
            <div className="col-12 form-group form-check my-3 row">
              {/* <label htmlFor="exampleInputEmail1" className="col-1 col-5 col-form-label">Email address</label> */}
              <div className='form-check me-4 w-auto'>
                <input type="checkbox" className="form-check-input" name='termCondition' id="term-condition" />
                <label className="form-check-label" htmlFor="term-condition">
                  You confirm that you have read and agreed to our <a href='/'>Privacy Policy</a> and <a href='/'>Terms & Conditions</a>.
                </label>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <button type="submit" className="btn btn-primary me-5">Create Account</button>
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
