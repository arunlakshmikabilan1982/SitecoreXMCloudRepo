import type { NextApiRequest, NextApiResponse } from 'next';
import { Customer, Checkout } from 'commerce-sdk';

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
    // const username = 'SomanahalliParvathi';
    // const password = 'Welcome@123';
    console.log(clientConfig);
    const credentials = `${clientConfig.parameters.clientId}:${clientConfig.parameters.secret}`;
    const base64data = Buffer.from(credentials).toString('base64');
    const headers = { Authorization: `Basic ${base64data}` };
    const client = new Customer.ShopperLogin(clientConfig);

    const shopperToken = await client.getAccessToken({
      headers,
      body: {
        grant_type: 'client_credentials',
      },
    });
    // const configWithAuth = {
    //   ...clientConfig,
    //   headers: { authorization: `Bearer ${shopperToken.access_token}` },
    // };
    const shopperCustomersClient = new Customer.ShopperCustomers(clientConfig);
    const shopperBasketsClient = new Checkout.ShopperBaskets(clientConfig);
    // const customer =  await shopperCustomersClient.registerCustomer({
    //   headers: { authorization: `Bearer ${(await shopperToken).access_token}` },
    //   body: {
    //   password: "Welcome@123",
    //   customer: {
    //   login: "SomanahalliParvathi",
    //   email: "parvathi.somanahalli@concentrix.com",
    //   firstName: "Parvathi",
    //   lastName: "Somanahalli"
    //   }
    //   }
    //   });
    // const customer =  await shopperCustomersClient.getCustomer({
    //   parameters:{
    //     customerId:"abwHpKkrJKkHsRlrgXxGYYxbg3"
    //   },
    //   headers: {
    //     authorization: token.getBearerHeader()
    //     }
    //   });
    const wishlist = await shopperCustomersClient.createCustomerProductList({
      headers: { authorization: `Bearer ${shopperToken.access_token}` },
      parameters: {
        customerId: 'abwHpKkrJKkHsRlrgXxGYYxbg3',
      },
      body: {
        type: 'wish_list',
      },
    });
    const basket = await shopperBasketsClient.createBasket({
      headers: { authorization: `Bearer ${shopperToken.access_token}` },
      body: {
        customerInfo: {
          email: 'parvathi.somanahalli@concentrix.com',
        },
      },
    });
    if (wishlist.id !== null && basket.basketId !== null) {
      res.status(200).json({
        wishlist: wishlist,
        wishlistId: wishlist.id,
        basket: basket,
        basketId: basket.basketId,
      });
    } else {
      res.status(400).json('Having Issue');
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' + err });
  }
}
