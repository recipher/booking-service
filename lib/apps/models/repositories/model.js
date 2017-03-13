var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('@recipher/store').Repository
  , schema = require('../schemas/model');

var NAME = 'model';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);

Repository.prototype.listByNameForProduct = function(product, name, options) {
  return this.find({ name: name, product: product }, options);
};

Repository.prototype.listByProduct = function(product, options) {
  return this.find({ product: product }, options);
};

Repository.prototype.sanitize = function(model) {
  if (model == null) return;
  
  return model;
};

Repository.prototype.clean = function(model) {
  if (model == null) return;

  return model;
};

module.exports = new Repository;
