import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = JSON.parse(JSON.stringify(req.body));
    const upsertUser = await prisma.userDetails.upsert({
      where: {
        Email: user.email,
      },
      update: {
        FirstName: user.firstName,
        LastName: user.lastName,
        Gender: user.gender,
        MobileNumber: user.mobilenumber,
        Title: user.title,
        Dob: new Date(user.dateofbirth).toISOString(),
        UpdatedAt: new Date(Date.now()).toISOString(),
        LoginDetails: {
          update: { Password: user.password },
        },
      },
      create: {
        FirstName: user.firstName,
        LastName: user.lastName,
        Gender: user.gender,
        MobileNumber: user.mobilenumber,
        Title: user.title,
        Dob: new Date(user.dateofbirth).toISOString(),
        Email: user.email,
        LoginDetails: {
          create: {
            Username: user.email,
            Password: user.password,
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
    res.status(400).json({ message: 'Something went wrong' + err });
  }
}
