var _ = require('lodash')
  , Promise = require('bluebird')
  , Brand = require('../repositories/brand');

var Finder = function(context) {
  if (this instanceof Finder === false) return new Finder(context);

  this.context = context;
};

Finder.prototype.get = function(id) {
  return Brand.get(id);
};

Finder.prototype.list = Promise.method(function(query) {
  return Brand.find({}, query);
});

Finder.prototype.search = function(query, options) {
  if (query == null) return Brand.find({}, options);
  return Brand.search(query, options);
};

Finder.prototype.total = function(query, options) {
  return Brand.total(query, options);
};

module.exports = Finder;