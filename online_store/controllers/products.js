const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const { company, featured, name, sort, limit, page, numericFilters } = req.query;
  const requestedOBJ = {};

  // check featured
  if (featured === 'true' || featured === 'false') {
    let featuredStatus = featured === 'true' ? true : false;
    if (featuredStatus)
      requestedOBJ.featured = featuredStatus;
  };
  // check company
  if (company)
    requestedOBJ.company = company;
  // check name
  if (name)
    requestedOBJ.name = { $regex: name, $options: 'i' };

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$e',
      '<': '$lt',
      '=<': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`).split(',').forEach(items=>items.split('-'));
    console.log(filters.split);
  };

  let result = Product.find(requestedOBJ);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  if (limit) {
    if (isNaN(+limit) === true)
      throw new Error('limit must be a number');
    else
      result.limit(+limit);
  };
  if (page) {
    if (isNaN(+page)) {
      throw new Error('page must be a number');
    } else {
      let skip = isNaN(+limit) ? (+page - 1) * 10 : +limit * (+page - 1);
      result.skip(skip)
    }
  }
  const products = await result;
  res.status(200).json({ products, length: products.length });
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find().sort('price -name').limit(3).skip(2);
  res.status(200).json({ products, length: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};