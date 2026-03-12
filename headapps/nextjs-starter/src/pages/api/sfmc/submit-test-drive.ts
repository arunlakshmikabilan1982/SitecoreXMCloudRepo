import type { NextApiRequest, NextApiResponse } from 'next';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  model: string;
  dealer: string;
  date: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: FormData = req.body;

    // Step 1: Get access token from SFMC
    const tokenResponse = await fetch(
      'https://mctj9h-m0vnm4djsbg0sd62mz8lm.auth.marketingcloudapis.com/v2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: 'zuu70r3p17oeorvav4tsksov',
          client_secret: 'rtKIQVJxMUNgKeM4pe7q2r4A',
          grant_type: 'client_credentials',
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('SFMC Token Error:', errorText);
      return res.status(500).json({ error: 'Failed to authenticate with SFMC' });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Submit form data to SFMC events endpoint
    const eventsResponse = await fetch(
      'https://mctj9h-m0vnm4djsbg0sd62mz8lm.rest.marketingcloudapis.com/interaction/v1/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ContactKey: 'bharadwaz.mingi@concentrix.com',
          EventDefinitionKey: 'APIEvent-81a9d50b-52bd-d815-9f9e-5e2b8722c490',
          Data: {
            Salutation: 'Hello',
            FirstName: formData.firstName,
            LastName: formData.lastName,
            InterestedModel: formData.model,
            Mobile: formData.phone,
            Email: formData.email,
            AreaCode: formData.dealer,
            MarketingConsent: 'False',
            Followup_On_InterestedModel: 'True',
            Timeslot: formData.date,
            Imageurl: 'https://hamronepalibazar.com/oc-content/plugins/blog/img/blog/31.jpg',
          },
        }),
      }
    );

    if (!eventsResponse.ok) {
      const errorText = await eventsResponse.text();
      console.error('SFMC Events Error:', errorText);
      return res.status(500).json({ error: 'Failed to submit data to SFMC' });
    }

    const eventsData = await eventsResponse.json();
    return res.status(200).json({ success: true, data: eventsData });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
