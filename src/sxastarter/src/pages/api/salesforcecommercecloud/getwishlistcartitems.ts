import type { NextApiRequest, NextApiResponse } from 'next';
import { Customer, Checkout} from 'commerce-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
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

          const shopperCustomersClient = new Customer.ShopperCustomers(clientConfig);
          const shopperBasketsClient = new Checkout.ShopperBaskets(clientConfig);
            const wishlistitems =  await shopperCustomersClient.getCustomerProductList({
              headers: { authorization: `Bearer ${process.env.Acess_Tocken}` },
             parameters:{
              customerId:"abwHpKkrJKkHsRlrgXxGYYxbg3",
              listId:"097177d5d1c94c60b288cd24cf"
             }
              });
              console.log("reaching here wishlist")
            const basketitems = await shopperBasketsClient.getBasket({
              headers: { authorization: `Bearer ${process.env.Acess_Tocken}` },
             parameters:{
              basketId:"081956a6853d5f93e84a3d91c3"
             }
            });   
            if(wishlistitems.id !== null && basketitems !== null)
            {
             res.status(200).json({
              WishlistCount: wishlistitems.customerProductListItems?.length,
              BasketsCount: basketitems.productItems?.length
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