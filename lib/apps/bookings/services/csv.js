var _ = require('lodash')
  , Promise = require('bluebird')
  , moment = require('moment')
  , csv = require('csv-stringify')
  , Finder = require('./finder');

var HEADER = [ 'Rider', 'Brand', 'Bike', 'Size', 'Slot' ];

var Generator = function(context) {
  if (this instanceof Generator === false) return new Generator(context);

  this.context = context;
};

Generator.prototype.generate = function(query, options) {
  var finder = new Finder(this.context)
    , stringify = Promise.promisify(csv);
  
  var toArray = function(bookings) {
    return bookings.map(function(booking) {
      return [ 
        booking.data.member.name
      , booking.data.brand.name
      , booking.data.product.name
      , booking.data.model.name
      , moment(booking.data.slot.slot).format('Do MMM YYYY HH:mm')
      ];
    });
  };

  var insertHeader = function(bookings) {
    bookings.splice(0, 0, HEADER);
    return bookings;
  };

  return finder.search(query, options).then(function(bookings) {
    return stringify(insertHeader(toArray(bookings)));
  });
};

module.exports = Generator;
