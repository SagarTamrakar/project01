const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');
const users =  require('../route/users');
const cookieParser = require('cookie-parser');

module.exports= async function auth(req,res,next){
    // const token = req.header('x-auth-token');
    const token = req.cookies.jwt
    if(!token) return res.status(401).send('Access Denied,No token provided.');

   try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    console.log(decoded);
    next();
   } catch (ex) {
       res.status(400).send('Invalid Token');
   }
}