const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const products = await Product.find( req.query);
  res.status(200).json({products, length: products.length});
};

const getAllProductsStatic = async (req, res) => {
  const {name, featured} = req.query;
  // throw new Error('getAllProducts error')
  const products = await Product.find();
  res.status(200).json({products});
};

module.exports = {
  getAllProductsStatic,
  getAllProducts
};