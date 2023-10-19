const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const {company, featured, name, sort} = req.query;
  const requestedOBJ = {};
  // check featured
  if(featured === 'true' || featured === 'false'){
    let featuredStatus = featured === 'true' ? true : false;
    if(featuredStatus)
      requestedOBJ.featured = featuredStatus;
  };
  // check company
  if(company)
    requestedOBJ.company = company;
  // check name
  if(name)
    requestedOBJ.name = {$regex: name, $options: 'i'};

  let result = Product.find(requestedOBJ);

  if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  const products = await result;
  console.log(sort);
  res.status(200).json({products, length: products.length});
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find().sort('price -name');
  res.status(200).json({products});
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};