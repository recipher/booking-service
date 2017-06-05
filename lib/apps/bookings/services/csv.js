var _ = require('lodash')
  , Promise = require('bluebird')
  , moment = require('moment')
  , csv = require('csv-stringify')
  , request = require('@recipher/request')
  , Finder = require('./finder');

var HEADER = [ 
  'Forename'
, 'Surname'
, 'Brand'
, 'Bike'
, 'Size'
, 'Date'
, 'Time'
, 'Booked At'
, 'Email'
, 'Contact Number'
, 'Emergency Name'  
, 'Emergency Contact'  
, 'DOB'
, 'Height'
, 'Weight'
, 'Medical Info'  
, 'Bringing Pedals'  
, 'Rear Brake'  
];

var Generator = function(context) {
  if (this instanceof Generator === false) return new Generator(context);

  this.context = context;
};

Generator.prototype.generate = function(query, options) {
  var context = this.context
    , finder = new Finder(this.context)
    , stringify = Promise.promisify(csv);

  var populate = function(booking) {
    return request('users/users', context).get({ id: booking.data.member.createdBy }).then(function(data) {
      return _.assign({}, booking, { user: data.users.length && data.users[0] });
    });
  };
  
  var toArray = function(bookings) {
    return bookings.map(function(booking) {
      return [ 
        booking.info.name
      , booking.info.surname
      , booking.data.brand.name
      , booking.data.product.name
      , booking.data.model.name
      , moment(booking.data.slot.slot).format('Do MMM YYYY')
      , moment(booking.data.slot.slot).format('HH:mm')
      , moment(booking.bookedAt).format('Do MMM YYYY')
      , booking.info.phone
      , booking.user.email
      , booking.info.emergencyName
      , booking.info.emergencyPhone
      , booking.info.dob
      , booking.info.height
      , booking.info.weight
      , booking.info.medical
      , booking.info.pedals
      , booking.info.brakes
      ];
    });
  };

  var insertHeader = function(bookings) {
    bookings.splice(0, 0, HEADER);
    return bookings;
  };

  return finder.search(query, _.assign({}, options, { limit: 1000 })).then(function(bookings) {
    return Promise.map(bookings, populate).then(function(bookings) {
      return stringify(insertHeader(toArray(bookings)));
    });
  });
};

module.exports = Generator;
