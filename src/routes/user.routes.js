const {Router} = require('express');
const { getProductsOfUser ,getProductsInCart ,purchaseCart ,purchaseOrder,getOrders} = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();
/**
 * @openapi
 * /api/v1/user/{userId}/cart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get products of cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *           minimun: 1
 *         required: true
 *         description: Numeric ID of the user to get products of the cart
 *     responses:
 *       200:
 *         description: get products in cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getProductsInCart'
 *       400:
 *         description: Error to get products in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error to get products in cart
 * /api/v1/user/{userid}/cart:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Create order for purchase products of cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: integer
 *           minimun: 1
 *         required: true
 *         description: Numeric ID of the user to create order for purchase products on his cart
 *     responses:
 *       200:
 *         description: Order created for purchase products in cart
 *         content:
 *           application/json:
 *            schema:
 *              type: string
 *              example: Order created for purchase products in cart
 *       400:
 *         description: Error to create order for purchase products in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error to create order for purchase products in cart
 * /api/v1/user/{userID}/order:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get orders of a user
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: integer
 *           minimun: 1
 *         required: true
 *         description: Numeric ID of the user to get his orders
 *     responses:
 *       200:
 *         description: get orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ordersOfUser'
 *       400:
 *         description: Error to get orders
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error to get orders
 * /api/v1/user/{UserId}/order:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Purchase products in order
 *     tags:
 *       - Order
 *     requestBody:
 *       title: Required field for orderId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/purchaseOrder'
 *     parameters:
 *       - in: path
 *         name: UserId
 *         schema:
 *           type: integer
 *           minimun: 1
 *         required: true
 *         description: Numeric ID of user for purchase his order
 *     responses:
 *       200:
 *         description: Purchased product
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Purchased product
 *       400:
 *         description: Error to purchase products
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error to purchase products
 */

router.get('/:id/cart' ,authMiddleware, getProductsInCart);
router.put('/:id/cart' ,authMiddleware, purchaseCart);
router.get('/:id/order' ,authMiddleware, getOrders);
router.post('/:id/order' ,authMiddleware, purchaseOrder);

module.exports = router;