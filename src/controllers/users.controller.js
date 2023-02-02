const UserService = require("../services/users.service");

const getProductsInCart = async (req, res) => {
     try {
          const { id } = req.params;
          const result = await UserService.getProdsInCart(id);
          res.status(200).json(result)
     } catch (error) {
          res.status(400).json({ message: 'Error something is wrong' })
     }
};

const purchaseCart = async (req, res) => {
     try {
          const { id } = req.params;
          const result = await UserService.createOrder(id);
          res.status(200).json({ message: 'Products in order' })
     } catch (error) {
          res.status(400).json({ message: 'Error to create order' })
     }
};

const getOrders = async (req, res) => {
     try {
          const { id: userId } = req.params;
          const result = await UserService.getOrder(userId);
          res.status(200).json(result);
     } catch (error) {
          res.status(400).json({ message: 'Error to get orders' })
     }
};

const purchaseOrder = async (req, res) => {
     try {
          const { id: userId } = req.params;
          const { orderId } = req.body;
          const result = await UserService.purchaseOrder(orderId , userId);
          res.status(200).json({ message: 'Products purchased successfully' })
     } catch (error) {
          res.status(400).json({ message: 'Error to purchase products' })
     }
};



module.exports = {
      getProductsInCart, purchaseCart, purchaseOrder,getOrders
}