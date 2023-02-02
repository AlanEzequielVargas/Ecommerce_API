const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
     return product.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Phone
 *         price:
 *           type: float
 *           example: 350.50
 *         available_quantity:
 *           type: int
 *           example: 2
 *         status:
 *           type: string
 *           example: available
 *         user_id:
 *           type: int
 *           example: 2
 *         image:
 *           type: string
 *           example: https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204
 *     productsOnSale:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 2
 *         name:
 *           type: string
 *           example: Phone
 *         price:
 *           type: float
 *           example: 350.50
 *         available_quantity:
 *           type: int
 *           example: 2
 *         status:
 *           type: string
 *           example: available
 *         user_id:
 *           type: int
 *           example: 2
 *         image:
 *           type: string
 *           example: https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: rodrigo
 *     addProductToCart:
 *       type: object
 *       properties:
 *         userId:
 *           type: int
 *           example: 1
 *     getProductsInCart:
 *       type: object
 *       properties:
 *         product:
 *           type: object
 *           properties:
 *             id:
 *               type: int
 *               example: 1
 *             name:
 *               type: string
 *               example: Iphone
 *             price:
 *               type: float
 *               example: 460.00
 *             available_quantity:
 *               type: int
 *               example: 2
 *             status:
 *               type: string
 *               example: string
 *             user_id:
 *               type: int
 *               example: 2
 *             image:
 *               type: string
 *               example: https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204
 *     ordersOfUser:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 1
 *         total_price:
 *           type: float
 *           example: 3500.00
 *         user_id:
 *           type: int
 *           example: 2
 *         status:
 *           type: string
 *           example: purchased
 *     purchaseOrder:
 *       type: object
 *       properties:
 *         orderId:
 *           type: int
 *           example: 1
 */

class product extends Sequelize.Model {
     static init(sequelize, DataTypes) {
          return super.init({
               id: {
                    autoIncrement: true,
                    autoIncrementIdentity: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true
               },
               name: {
                    type: DataTypes.STRING,
                    allowNull: false
               },
               price: {
                    type: DataTypes.DOUBLE,
                    allowNull: false
               },
               available_quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false
               },
               status: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
               },
               user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                         model: 'users',
                         key: 'id'
                    }
               },
               image: {
                    type: DataTypes.STRING,
               }
          }, {
               sequelize,
               tableName: 'product',
               schema: 'public',
               timestamps: false,
               indexes: [
                    {
                         name: "product_pkey",
                         unique: true,
                         fields: [
                              { name: "id" },
                         ]
                    },
               ]
          });
     }
}
