import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = JSON.parse(req.body);
    console.log('enquiry.ts:' + JSON.stringify(user));

    // Ensure that the 'ArrivalDate' key exists in the user object
    if (!user.ArrivalDate) {
      return res.status(400).json({ message: 'ArrivalDate is missing' });
    }

    const createUser = await prisma.enquiry.create({
      data: {
        FirstName: user.firstName,
        LastName: user.lastName,
        RoomType: user.roomType,
        NumberOfGuest: user.NumberOfGuest,
        ArrivalDate: user.ArrivalDate, // Make sure 'ArrivalDate' is correctly formatted
        DepartureDate: user.DepartureDate,
        FreePickup: user.freePickup,
        SpecialRequest: user.specialRequest,
        Email: user.email,
      },
    });

    console.log('enquiry.ts: Enquiry created:', createUser);

    res.status(200).json('success');
  } catch (err) {
    console.error('enquiry.ts: Error creating enquiry:', err);
    res.status(400).json({ message: 'Something went wrong' });
  }
};
