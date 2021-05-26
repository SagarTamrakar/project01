const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/Hind',{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log('Connected to mongoDB...'))
  .catch(err=>console.log('could not connect'));

  








  