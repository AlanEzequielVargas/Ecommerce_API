const ProductService = require("../services/product.service");

const createProduct = async (req,res) => {
     try {
          const product = req.body;
          const result = await ProductService.createProds(product);
          res.status(200).json('Created product')
     } catch (error) {
          res.status(400).json(error.message)
     }
};

const getAllProducts = async(req,res) => {
     try {
          const result = await ProductService.getAll();
          res.status(200).json(result);
     } catch (error) {
          res.status(400).json(error.message)
     }
};

const addProductToCart = async (req,res) => {
     try {
          const productId = req.params.id;
          const {userId} = req.body;
          const result = await ProductService.addProduct(productId,userId);
          res.status(200).json({message:'Added product'});
     } catch (error) {
          res.status(400).json({message:'Error to add product'});
     }
}

module.exports = {createProduct,getAllProducts,addProductToCart};