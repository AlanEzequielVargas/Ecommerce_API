const {Router} = require('express');
const { createProduct,getAllProducts,addProductToCart } = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();
/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: 'Get products on sale'
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: get products
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/productsOnSale'
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to get products
 * /api/v1/product:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: 'Creation of product'
 *     tags:
 *       - Products
 *     requestBody:
 *       title: Required field for title of product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: product created
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create
 * /api/v1/product/{productId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add product to cart
 *     tags:
 *       - Products
 *     requestBody:
 *       title: Required field for userId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addProductToCart'
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *           minimun: 1
 *         required: true
 *         description: Numeric ID of product to add
 *     responses:
 *       200:
 *         description: added product
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Added product
 *       400:
 *         description: Error to add products
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error to add products
 */

router.get('/products',getAllProducts);
router.post('/product/:id',authMiddleware,addProductToCart);
router.post('/product',authMiddleware,createProduct);

module.exports = router;