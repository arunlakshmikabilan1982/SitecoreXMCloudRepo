/* eslint-disable @typescript-eslint/no-var-requires */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();
let users = require('data/users.json');

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        /* const userDetails = await prisma.loginDetails.findFirst({
          where: {
            AND: [
              {
                Username: {
                  equals: credentials?.email,
                },
              },
              {
                Password: {
                  equals: credentials?.password,
                },
              },
            ],
          },
          include: {
            UserDetails: true,
          },
        });
        const user = JSON.parse(
          JSON.stringify({
            id: userDetails?.UserDetails?.UserId?.toString(),
            email: userDetails?.UserDetails?.Email,
            firstName: userDetails?.UserDetails?.FirstName,
            lastName: userDetails?.UserDetails?.LastName,
            gender: userDetails?.UserDetails?.Gender,
            title: userDetails?.UserDetails?.Title,
            mobileNumber: userDetails?.UserDetails?.MobileNumber,
            dob: userDetails?.UserDetails?.Dob?.toString(),
          })
        ); */
        const user=users.find(x => x.email === credentials?.email && x.password === credentials?.password);
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
