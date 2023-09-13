import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export const Default = () => {
  const { data: session } = useSession();
  const user=session?.user as any;
  return (
    <div className="d-flex flex-row justify-content-center mt-5">
      {session?.user ? (
        <>          
          <button type="submit" className="btn me-5 text-bg-dark" onClick={() => signOut()}>
            <p> {"Welcome "+user.firstName+" "+user.lastName}</p>
            Sign Out
          </button>
        </>
      ) : (
        <button className="btn me-5" onClick={() => signIn()}>
          <img width="25px" height="25px" src="https://www.pngkit.com/png/detail/808-8088160_loginsignupwishlist-transparent-login-icon.png"></img>
        </button>
      )}
    </div>
  );
};
