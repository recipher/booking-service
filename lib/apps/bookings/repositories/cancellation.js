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

Repository.prototype.sanitize = function(booking) {
  if (booking == null) return;
  
  if (booking.bookedAt) booking.bookedAt = new Date(booking.bookedAt).toISOString();

  return booking;
};

Repository.prototype.clean = function(booking) {
  if (booking == null) return;

  return booking;
};

Repository.prototype.index = function() {
  return this.createIndex('member');
};

module.exports = new Repository;
