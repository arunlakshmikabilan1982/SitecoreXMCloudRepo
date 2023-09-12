import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export const Default = () => {
  const { data: session } = useSession();
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          <p className="text-sky-600"> {session.user.name}</p>
          <button type="submit" className="bg-dark btn me-5 text-bg-dark" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <button className="bg-dark btn me-5 text-bg-dark" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};
