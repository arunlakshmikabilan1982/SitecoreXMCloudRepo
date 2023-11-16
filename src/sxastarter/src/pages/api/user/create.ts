import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = JSON.parse(JSON.stringify(req.body));

    const userData = JSON.parse(user);

    const upsertUser = await prisma.userDetails.upsert({
      where: {
        Email: userData.email,
      },
      update: {
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Gender: userData.gender,
        MobileNumber: userData.mobilenumber,
        Title: userData.title,
        Dob: new Date(userData.dateofbirth).toISOString(),
        UpdatedAt: new Date(Date.now()).toISOString(),
        LoginDetails: {
          update: { Password: userData.password },
        },
      },
      create: {
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Gender: userData.gender,
        MobileNumber: userData.mobilenumber,
        Title: userData.title,
        Dob: new Date(userData.dateofbirth).toISOString(),
        Email: userData.email,
        LoginDetails: {
          create: {
            Username: userData.email,
            Password: userData.password,
          },
        },
      },
    });

    if (upsertUser?.UserId !== null || upsertUser?.UserId !== undefined) {
      res.status(200).json('success');
    } else {
      res.status(400).json('Record not updated or created');
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong:' + err });
  }
}
