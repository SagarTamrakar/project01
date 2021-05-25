const cements = require('./route/cements');
const auth = require('./route/auth');
const db = require('./models/db');
const users = require('./route/users');
const express = require('express');
const app = express();
const config = require('config');
const path = require('path');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} =require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

app.use(bodyparser.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended:true}));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR : jwtPrivateKey is not defined');     //$env: hind_jwtPrivateKey = "8871183753"
  process.exit(1);
}


app.set('views',path.join(__dirname,'views'));
app.engine('hbs', exphbs({extname: 'hbs',defaultLayout:'mainLayout.hbs',handlebars:allowInsecurePrototypeAccess(Handlebars),layoutsDir:__dirname +'/views/layouts/'}));
app.set('view engine','hbs');

app.use('/api/cements', cements)
app.use('/api/users',users) 
app.use('/api/login',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));