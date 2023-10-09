import type { NextApiRequest, NextApiResponse } from 'next';
import { Customer, Checkout} from 'commerce-sdk'

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
          }
          console.log(clientConfig);

          const credentials = `${clientConfig.parameters.clientId}:${clientConfig.parameters.secret}`
          const base64data = Buffer.from(credentials).toString('base64')
          const headers = { Authorization: `Basic ${base64data}` }
          const client = new Customer.ShopperLogin(clientConfig)

          const shopperToken = client.getAccessToken({
            headers,
            body: {
              grant_type: 'client_credentials',
            },
          })
          const productId = JSON.parse(JSON.stringify(req.body));
          const shopperBasketsClient = new Checkout.ShopperBaskets(clientConfig);
          const cartAddedItem =  await shopperBasketsClient.addItemToBasket({
            headers: { authorization: `Bearer ${process.env.Acess_Tocken}` },
            parameters:{
              basketId:"081956a6853d5f93e84a3d91c3"
            },
            body: [{
              "productId": productId,
              "quantity": 1
             }]
            }); 
            if(cartAddedItem.productItems !== null)
            {
             res.status(200).json({
              BasketProduct: cartAddedItem.productItems
             });
            }
            else{
             res.status(400).json('Having Issue');
            }
          }
        catch (err) {
          res.status(400).json({ message: 'Something went wrong' + err });
        }
}