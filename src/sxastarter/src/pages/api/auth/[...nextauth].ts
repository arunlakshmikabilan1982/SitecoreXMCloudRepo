/* eslint-disable @typescript-eslint/no-var-requires */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//const users = require('data/users.json');

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        /*const user = users.find(
          (u: { email: string | undefined; password: string | undefined }) =>
            u.email === credentials?.email && u.password === credentials?.password
        );*/

        const res = await fetch('/api/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/Mall-Pages',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // This will only be true on the first login
      if (user) {
        return {
          ...token,
          user: {
            ...user,
          },
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
});
