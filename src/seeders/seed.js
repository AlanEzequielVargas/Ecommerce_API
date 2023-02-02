const db = require("../utils/database");
const models = require('../models/index')

const productsArr = [
     {
          name: 'MacBook Air',
          price: 890.00,
          quantity: 12,
          status: true,
          userId: 2
     },
     {
          name: 'Apple Iphone',
          price: 330.00,
          quantity: 10,
          status: true,
          userId: 1
     }
];

db.sync({force: true})
     .then(() => {
          console.log('insertando info en base de datos');
          productsArr.forEach((user) => models.product.create(user))
     })
     .catch((error) => console.log(error))