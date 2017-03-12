var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('@recipher/store').Repository
  , schema = require('../schemas/payment');

var NAME = 'payment';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);

Repository.prototype.listByMember = function(member, options) {
  return this.find({ member: member }, options);
};

Repository.prototype.sanitize = function(payment) {
  if (payment == null) return;
  
  if (payment.paidAt) payment.paidAt = new Date(payment.paidAt).toISOString();

  return payment;
};

Repository.prototype.clean = function(payment) {
  if (payment == null) return;

  return payment;
};

module.exports = new Repository;
