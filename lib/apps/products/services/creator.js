var _ = require('lodash')
  , Promise = require('bluebird')
  , Product = require('../repositories/product');

var Creator = function(context) {
  if (this instanceof Creator === false) return new Creator(context);

  this.context = context;
};

Creator.prototype.create = function(product) {
  return Product.create(product);
};

module.exports = Creator;