import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = JSON.parse(req.body);
    console.log("create.ts:"+JSON.stringify(user));
    const upsertUser = await prisma.userDetails.upsert({
      where: {
        Email: user.email,
      },
      update: {
        FirstName:user.firstName,
        LastName:user.lastName,
        Gender:user.gender,
        MobileNumber:user.mobilenumber,
        Title:user.title,
        Dob:user.dateofbirth,
        UpdatedAt:Date.now.toString(),
        LoginDetails: {
          update: { Password: user.password},
        },  
      },
      create: {
        FirstName:user.firstName,
        LastName:user.lastName,
        Gender:user.gender,
        MobileNumber:user.mobilenumber,
        Title:user.title,
        Dob:user.dateofbirth,
        Email:user.email,
        LoginDetails: {
          create: { 
            Username: user.email, 
            Password: user.password 
          },
        },  
      },
    });
    res.status(200).json("success");
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};