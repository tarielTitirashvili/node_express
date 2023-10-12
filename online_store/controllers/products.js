const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const {name, featured} = req.query;
  const requestedOBJ = {};
  if(featured){
    let featuredStatus = featured === 'true' ? true : featured === 'false' && false;
    if(featuredStatus)
      requestedOBJ.featured = featuredStatus;
  };
  const products = await Product.find({featured});
  res.status(200).json({products, length: products.length});
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({products});
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};