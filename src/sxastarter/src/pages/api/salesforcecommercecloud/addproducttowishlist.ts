import type { NextApiRequest, NextApiResponse } from 'next';
import { Customer } from 'commerce-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const clientConfig = {
      parameters: {
        clientId: process.env.SFDC_CLIENT_ID,
        secret: process.env.SFDC_SECRET,
        organizationId: process.env.SFDC_ORGANIZATIONID,
        shortCode: process.env.SFDC_SHORTCODE,
        siteId: process.env.SFDC_SITEID,
      },
    };
    console.log(clientConfig);
    // const username = 'SomanahalliParvathi';
    // const password = 'Welcome@123';
    // const credentials = `${username}:${password}`
    // const base64data = Buffer.from(credentials).toString('base64')
    // const headers = { Authorization: `Basic ${base64data}` }
    // const client = new Customer.ShopperLogin(clientConfig)

    // const shopperToken = client.getAccessToken({
    //   headers,
    //   body: {
    //     grant_type: 'client_credentials',
    //   },
    // })
    const productId = JSON.parse(JSON.stringify(req.body));
    const shopperCustomersClient = new Customer.ShopperCustomers(clientConfig);
    console.log('reaching here :', productId);
    const wishlistitem = await shopperCustomersClient.createCustomerProductListItem({
      headers: { Authorization: `Bearer ${process.env.Acess_Tocken}` },
      parameters: {
        customerId: 'bcmrtJxboYxHaRxeg1kqYYmbk0',
        listId: '097177d5d1c94c60b288cd24cf',
      },
      body: {
        quantity: 1,
        purchasedQuantity: 0,
        priority: 2,
        productId: '22951021M',
        public: true,
        type: 'product',
      },
    });
    console.log('reaching here:', wishlistitem);
    if (wishlistitem.id !== null) {
      res.status(200).json({
        wishListedProduct: wishlistitem.product,
      });
    } else {
      res.status(400).json('Having Issue');
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' + err });
  }
}
