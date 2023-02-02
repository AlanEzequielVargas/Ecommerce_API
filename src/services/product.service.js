const models = require('../models');
const Sequelize = require('sequelize');

const Users = models.users;

class ProductService{
     static async createProds(product){
          try {
               const result = await models.product.create(product);
               return result;
          } catch (error) {
               throw error;
          }
     };
     static async getAll(){
          try {
               const result = await models.product.findAll(
                    {where: {
                         price: {
                              [Sequelize.Op.gt]: 0
                         }
                    },include: {
                         model: Users,
                         as: 'user',
                         attributes: ['username']
                    }} 
               );
               return result;
          } catch (error) {
               throw error;
          }
     };
     static async addProduct (productId,userId) {
          try {
               const product = await models.product.findOne({
                         where: {
                              id: productId
                         }
               });
               const [result, created] = await models.product_in_cart.findOrCreate({
                    where: { product_id: productId, cart_id: userId },
                    defaults: { 
                         quantity: 1 ,
                         price: product.price ,
                         status: "pending"}
                    });
                    console.log(product.price);
               if (!created) {
                    await result.increment("quantity");
               }
               const total = await models.product_in_cart.sum("price", { where: { cart_id: userId } });
               console.log(total);
               await models.cart.update({ total_price: total }, { where: { id: userId } });
               return product;
          } catch (error) {
               throw error;
          }
     }
}

module.exports = ProductService;