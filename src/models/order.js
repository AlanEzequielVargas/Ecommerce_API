const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
     return order.init(sequelize, DataTypes);
}

class order extends Sequelize.Model {
     static init(sequelize, DataTypes) {
          return super.init({
               id: {
                    autoIncrement: true,
                    autoIncrementIdentity: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true
               },
               total_price: {
                    type: DataTypes.DOUBLE,
                    allowNull: false
               },
               user_id: {
                    type: DataTypes.STRING,
                    allowNull: false
               },
               status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'pending'
               }
          }, {
               sequelize,
               tableName: 'order',
               schema: 'public',
               timestamps: false,
               indexes: [
                    {
                         name: "order_pkey",
                         unique: true,
                         fields: [
                              { name: "id" },
                         ]
                    },
               ]
          });
     }
}
