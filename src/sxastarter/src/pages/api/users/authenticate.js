const jwt = require('jsonwebtoken');

import { apiHandler } from 'helpers/api';      

// users in JSON file for simplicity, store in a db for production applications
const users = require('data/users.json');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function authenticate() {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) throw 'Email or password is incorrect';
    
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ sub: user.id }, 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING' , { expiresIn: '7d' });
    
        // return basic user details and token
        return res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            token
        });
    }
}