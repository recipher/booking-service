var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('@recipher/store').Repository
  , schema = require('../schemas/brand');

var NAME = 'brand';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);

Repository.prototype.listByName = function(name, options) {
  return this.find({ name: name }, options);
};

Repository.prototype.sanitize = function(brand) {
  if (brand == null) return;
  
  return brand;
};

Repository.prototype.clean = function(brand) {
  if (brand == null) return;

  return brand;
};

Repository.prototype.index = function() {
  return this.createIndex('name');
};

module.exports = new Repository;
