var _ = require('lodash')
  , Promise = require('bluebird')
  , moment = require('moment')
  , uniqBy = require('lodash.uniqby')
  , Pay = require('./pay')
  , Confirm = require('./confirm')
  , Booking = require('../repositories/booking');

var Booker = function(context) {
  if (this instanceof Booker === false) return new Booker(context);

  this.context = context;
};

var getTotalCount = function(days, counts, existingCounts) {
  const payments = _.map(days, function(day) {

    var findByDay = function(c) { return c.day === day; };

    const count = _.find(counts, findByDay)
        , existingCount = _.find(existingCounts, findByDay);

    return (count && count.bookingCount > 0) && (!existingCount || existingCount.bookingCount === 0) ? 1 : 0;
  });

  return _.reduce(payments, (l, r) => l + r, 0);
};

var getBookingCounts = function(bookings, days) {
  return _.map(days, function(day) {
    const bookingCount = _.filter(bookings, function(booking) {
      return moment(booking.slot.slot || booking.slot).dayOfYear() === day;
    }).length;

    return { day, bookingCount };
  });
};

var determineUniqueDays = function(bookings) {
  var slots = _.pluck(bookings, 'slot')
    , unique = uniqBy(slots, function(slot) { return moment(slot.slot || slot).dayOfYear(); });

  return _.map(unique, function(slot) {
    return moment(slot.slot || slot).dayOfYear();
  });
};

var calculateAmount = function(bookings, existing) {
  var allBookings = _.union(bookings, existing)
    , days = determineUniqueDays(allBookings)
    , bookingCounts = getBookingCounts(allBookings, days)
    , existingCounts = getBookingCounts(existing, days)
    , totalCount = getTotalCount(days, bookingCounts, existingCounts);

  return totalCount * 1049;
};

Booker.prototype.book = function(bookings, member, payment) {
  var context = this.context
    , confirm = new Confirm(context);

  if (_.isArray(bookings) === false) bookings = [ bookings ];

  var noOfBookings = bookings.length;

  return Booking.listByMember(member.id).then(function(existing) {

    return Promise.map(bookings, function(booking) {

      return Booking.listByModel(booking.model).then(function(bookingsForModel) {

        var exists = _.find(bookingsForModel, function(b) {
          return b.slot === booking.slot && b.member !== member.id;
        });

        booking.bookedAt = new Date;
        if (booking.description == null) booking.description == booking.data.brand.name + ' ' + booking.data.product.name;

        if (!exists) return Booking.create(booking);
      });
    })

    .then(function(bookings) {
      bookings = _.compact(bookings);

      if (noOfBookings > bookings.length && payment) payment.amount = calculateAmount(bookings, existing);

      if (payment == null || payment.amount === 0) {
        return confirm.confirm(member, bookings).then(function() {
          return bookings;
        });
      }
      
      return new Pay(context).pay(payment, member)

      .then(function(payment) {
        return confirm.confirm(member, bookings).then(function() {
          return bookings;
        });
      })

      .catch(function(err) {
        return Promise.map(bookings, function(booking) {
          return Booking.delete(booking.id);
        })

        .then(function() {
          throw err;
        });
      });
    });
  });
};

module.exports = Booker;