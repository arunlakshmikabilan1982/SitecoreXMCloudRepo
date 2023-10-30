import type { NextApiRequest, NextApiResponse } from 'next';
import { Checkout } from 'commerce-sdk';

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
    let basket_Id = "";
    if(process.env.Basket_Id != undefined)
    {
      basket_Id = process.env.Basket_Id;
    }
    const itemId = JSON.parse(JSON.stringify(req.body));
    const shopperBasketsClient = new Checkout.ShopperBaskets(clientConfig);
    const cartAddedItem = await shopperBasketsClient.removeItemFromBasket({
      headers: { authorization: `Bearer ${process.env.Access_Token}` },
      parameters: {
        basketId: basket_Id,
        itemId: itemId,
      },
    });
    if (cartAddedItem.productItems !== null) {
      res.status(200).json({
        BasketProduct: cartAddedItem.productItems,
      });
    } else {
      res.status(400).json('Having Issue');
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' + err });
  }
}
