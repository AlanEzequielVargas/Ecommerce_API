const models = require('../models');
const transporter = require('../utils/mailer');
require('dotenv').config();

class UserService {
     static async getProdsInCart(id) {
          try {
               console.log('entre en el servicio');
               const productsInCart = await models.product_in_cart.findAll({
                    where: { cart_id: id },
                    include: [
                         {
                              model: models.product,
                              as: "product"
                         }
                    ],
                    attributes: {
                         exclude: ['cart_id', 'product_id', 'quantity', 'price']
                    }
               });
               return productsInCart;
          } catch (error) {
               throw error;
          }
     };
     static async createOrder(userId) {
          try {
               const productsInCart = await models.product_in_cart.findAll({ where: { cart_id: userId } });

               const totalPrice = productsInCart.reduce((sum, prod) => sum + prod.price, 0);

               for (let i = 0; i < productsInCart.length; i++) {
                    await models.product_in_cart.update({ status: 'in order' }, {
                         where: {
                              status: 'pending'
                         }
                    })
               }

               const order = await models.order.create({ user_id: userId, total_price: totalPrice });
               console.log('entre al servicio');

               for (const prod of productsInCart) {
                    await models.product_in_order.create({
                         order_id: order.id,
                         product_id: prod.product_id,
                         status: 'pending',
                         price: prod.price,
                         quantity: prod.quantity,
                    });
               }


          } catch (error) {
               throw error;
          }
     };
     static async purchaseOrder(orderId, userId) {
          try {
console.log('aqui');
               const productsInOrder = await models.product_in_order.findAll({
                    where: { order_id: orderId },
               });
               for (const prod of productsInOrder) {
                    prod.status = 'purchased';
                    await prod.save(); 
               }
               const productsInCart = await models.product_in_cart.findAll({
                    where: { cart_id: userId },
               });

               for (let i = 0; i < productsInCart.length; i++) {
                    await models.product_in_cart.destroy({
                         where: { cart_id: userId }
                    })
               }

               
               const order = await models.order.findOne({
                    where: { id: orderId, user_id: userId, status: 'pending' },
               });

               order.status = 'purchased';
               await order.save();

               


               const user = await models.users.findOne({
                    where: {
                         id: userId
                    }
               })

               await transporter.sendMail({
                    to: user.email,
                    from: process.env.OWNER_MAIL,
                    subject: 'Successful purchase',
                    html: `<h1>Thanks for your purchase</h1>`
               });

          } catch (error) {
               throw error;
          }
     };
     static async getOrder(userId) {
          try {
               const result = await models.order.findAll({
                    where: {
                         user_id: userId
                    }
               })
               return result;
          } catch (error) {
               throw error;
          }
     }
}

module.exports = UserService;