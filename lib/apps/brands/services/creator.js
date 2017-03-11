var _ = require('lodash')
  , Promise = require('bluebird')
  , Brand = require('../repositories/brand');

var Creator = function(context) {
  if (this instanceof Creator === false) return new Creator(context);

  this.context = context;
};

Creator.prototype.create = function(brand) {
  return Brand.create(brand);
};

module.exports = Creator;