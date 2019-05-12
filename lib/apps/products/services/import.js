var Promise = require('bluebird')
  , fs = require('fs')
  , path = require('path')
  , csv = require('csv')
  , Product = require('../repositories/product')  
  , Brand = require('../../brands/repositories/brand')  
  , Model = require('../../models/repositories/model');

var createBrand = function(brand) {
  return Brand.listByName(brand).then(function(b) {
    if (b.length === 0) return Brand.create({ name: brand });
    return b[0];
  });
};

var createProduct = function(product, info, brand) {
  return Product.listByName(product).then(function(p) {
    if (p.length === 0) return Product.create({ name: product, info: info, brand: brand.id });
    return p[0];
  });
};

var createModel = function(model, product) {
  return Model.listByNameForProduct(product.id, model).then(function(m) {
    return Model.create({ name: model, product: product.id });
  });
};

var create = function(data) {
  var brand = data[0]
    , product = data[1].replace(/-/g, ' ')
    , model = data[2]
    , info = data[3];

  return createBrand(brand).then(function(brand) {
    return createProduct(product, info, brand).then(function(product) {
      return createModel(model, product);
    });
  });
};

var imp = module.exports = Promise.method(function() {
  var readFile = Promise.promisify(fs.readFile)
    , parse = Promise.promisify(csv.parse);

  return readFile(path.join(__dirname, '../data/stanton.csv'), 'utf8').then(function(data) {
    return parse(data).then(function(data) {
      return Promise.mapSeries(data, create);
    });
  });
});
