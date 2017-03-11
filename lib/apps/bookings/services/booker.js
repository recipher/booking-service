var _ = require('lodash')
  , Promise = require('bluebird')
  , Booking = require('../repositories/booking');

var Booker = function(context) {
  if (this instanceof Booker === false) return new Booker(context);

  this.context = context;
};

Booker.prototype.book = function(booking) {
  return Booking.create(booking);
};

module.exports = Booker;