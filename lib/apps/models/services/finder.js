var _ = require('lodash')
  , Promise = require('bluebird')
  , Model = require('../repositories/model');

var Finder = function(context) {
  if (this instanceof Finder === false) return new Finder(context);

  this.context = context;
};

Finder.prototype.get = function(id) {
  return Model.get(id);
};

Finder.prototype.list = Promise.method(function(query) {
  if (query.product) return Model.listByProduct(query.product, query);
  if (query.productid) return Model.listByProduct(query.productid, query);

  return [];
});

Finder.prototype.search = function(query, options) {
  if (query == null) return Model.find({}, options);
  return Model.search(query, options);
};

Finder.prototype.total = function(query, options) {
  return Model.total(query, options);
};

module.exports = Finder;