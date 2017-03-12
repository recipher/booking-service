var _ = require('lodash')
  , Promise = require('bluebird')
  , Pay = require('./pay')
  , Booking = require('../repositories/booking');

var Booker = function(context) {
  if (this instanceof Booker === false) return new Booker(context);

  this.context = context;
};

Booker.prototype.book = function(bookings, member, payment) {
  var context = this.context;

  if (_.isArray(bookings) === false) bookings = [ bookings ];

  return Promise.map(bookings, function(booking) {
    return Booking.create(booking);
  })

  .then(function(bookings) {
    return new Pay(context).pay(payment, member).then(function() {
      return bookings;
    });
  });
};

module.exports = Booker;