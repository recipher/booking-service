var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('@recipher/store').Repository
  , schema = require('../schemas/cancellation');

var NAME = 'cancellation';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);

Repository.prototype.listByMember = function(member, options) {
  return this.find({ member: member }, options);
};

Repository.prototype.sanitize = function(cancellation) {
  if (cancellation == null) return;
  
  if (cancellation.bookedAt) cancellation.bookedAt = new Date(cancellation.bookedAt).toISOString();
  if (cancellation.cancelledAt) cancellation.cancelledAt = new Date(cancellation.cancelledAt).toISOString();

  return cancellation;
};

Repository.prototype.clean = function(cancellation) {
  if (cancellation == null) return;

  return cancellation;
};

Repository.prototype.index = function() {
  return this.createIndex('member');
};

module.exports = new Repository;
