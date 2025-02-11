const {expressjwt} = require('express-jwt');
const util = require('util');
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING' , algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate'
        ]
    });
    console.log("jwt:"+req);
    return util.promisify(middleware)(req, res);
}