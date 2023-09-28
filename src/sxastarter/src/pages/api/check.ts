import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const userDetails = await prisma.loginDetails.findFirst({
      where: {
        AND: [
          {
            Username: {
              equals: email,
            },
          },
          {
            Password: {
              equals: password,
            },
          },
        ],
      },
      include: {
        UserDetails: true,
      },
    });
    res.status(200).json({
      id: userDetails?.UserDetails.UserId,
      email: userDetails?.UserDetails.Email,
      firstName: userDetails?.UserDetails.FirstName,
      lastName: userDetails?.UserDetails.LastName,
      gender: userDetails?.UserDetails.Gender,
      title: userDetails?.UserDetails.Title,
      mobileNumber: userDetails?.UserDetails.MobileNumber,
      dob: userDetails?.UserDetails.Dob,
    });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};
