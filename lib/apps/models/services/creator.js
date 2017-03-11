var _ = require('lodash')
  , Promise = require('bluebird')
  , Model = require('../repositories/model');

var Creator = function(context) {
  if (this instanceof Creator === false) return new Creator(context);

  this.context = context;
};

Creator.prototype.create = function(model) {
  return Model.create(model);
};

module.exports = Creator;