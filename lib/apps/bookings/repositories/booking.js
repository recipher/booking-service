var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('@recipher/store').Repository
  , schema = require('../schemas/booking');

var NAME = 'booking';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);


Repository.prototype.listByProduct = function(product, options) {
  return this.find({ product: product }, options);
};

Repository.prototype.listByMember = function(member, options) {
  return this.find({ member: member }, options);
};

Repository.prototype.sanitize = function(booking) {
  if (booking == null) return;
  
  return booking;
};

Repository.prototype.clean = function(booking) {
  if (booking == null) return;

  return booking;
};

module.exports = new Repository;
