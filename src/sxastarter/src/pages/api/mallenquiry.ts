import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = JSON.parse(req.body);
    console.log('mallenquiry.ts:' + JSON.stringify(user));

    const createUser = await prisma.mallEnquiry.create({
      data: {
        FirstName: user.firstName,
        LastName: user.lastName,
        EnquiryType: user.enquiryType,
        EnquiryDetails: user.enquiryDetails,
        CreatedDate: new Date(Date.now()).toISOString(),
        Email: user.email,
      },
    });

    console.log('mallenquiry.ts: Enquiry created:', createUser);

    res.status(200).json('success');
  } catch (err) {
    console.error('mallenquiry.ts: Error creating enquiry:', err);
    res.status(400).json({ message: 'Something went wrong' });
  }
};
