var _ = require('lodash')
  , Promise = require('bluebird')
  , Booking = require('../repositories/booking');

var Finder = function(context) {
  if (this instanceof Finder === false) return new Finder(context);

  this.context = context;
};

Finder.prototype.get = function(id) {
  return Booking.get(id);
};

Finder.prototype.list = Promise.method(function(query) {
  if (query.product) return Booking.listByProduct(query.product, query);
  if (query.productid) return Booking.listByProduct(query.productid, query);
  if (query.member) return Booking.listByMember(query.member, query);
  if (query.memberid) return Booking.listByMemberId(query.memberid, query);

  return [];
});

Finder.prototype.search = function(query, options) {
  if (query == null) return Booking.find({}, options);
  return Booking.search(query, options);
};

Finder.prototype.total = function(query, options) {
  return Booking.total(query, options);
};

module.exports = Finder;
