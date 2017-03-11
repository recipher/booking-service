var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('@recipher/store').Repository
  , schema = require('../schemas/product');

var NAME = 'product';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);


Repository.prototype.listByBrand = function(brand, options) {
  return this.find({ brand: brand }, options);
};

Repository.prototype.sanitize = function(product) {
  if (product == null) return;
  
  return product;
};

Repository.prototype.clean = function(product) {
  if (product == null) return;

  return product;
};

module.exports = new Repository;
