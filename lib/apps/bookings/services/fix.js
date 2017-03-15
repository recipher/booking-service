var _ = require('lodash')
  , Promise = require('bluebird')
  , request = require('@recipher/request')
  , Booking = require('../repositories/booking');

var Fix = function(context) {
  if (this instanceof Fix === false) return new Fix(context);

  this.context = context;
};

var describe = function(booking) {
  return request('/members/' + booking.member, this.context).get().then(function(data) {

    return _.assign({}, booking, { 
      description: booking.data.brand.name + ' ' + booking.data.product.name
    , bookedAt: booking.bookedAt || new Date(2017, 2, 14, 19, 0, 0)
    , data: _.assign({}, booking.data, { member: data.member })
    });
  });
};

Fix.prototype.fix = function() {
  var that = this;

  return Booking.find({}).then(function(bookings) {
    return Promise.map(bookings, function(booking) {
      return describe.call(that, booking).then(function(booking) {
        return Booking.update(booking.id, booking);
      });
    });
  });
};

module.exports = Fix;
