var _ = require('lodash')
  , Promise = require('bluebird')
  , Product = require('../repositories/product');

var Finder = function(context) {
  if (this instanceof Finder === false) return new Finder(context);

  this.context = context;
};

Finder.prototype.get = function(id) {
  return Product.get(id);
};

Finder.prototype.list = Promise.method(function(query) {
  if (query.ids) return Product.listByIds(query.ids, query);
  if (query.brand) return Product.listByBrand(query.brand, query);
  if (query.brandid) return Product.listByBrand(query.brandid, query);

  return [];
});

Finder.prototype.search = function(query, options) {
  if (query == null) return Product.find({}, options);
  return Product.search(query, options);
};

Finder.prototype.total = function(query, options) {
  return Product.total(query, options);
};

module.exports = Finder;