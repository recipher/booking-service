var _ = require('lodash')
  , Promise = require('bluebird')
  , moment = require('moment')
  , publish = require('@recipher/task').publish
  , Booking = require('../repositories/booking');

var Confirm = function(context) {
  if (this instanceof Confirm === false) return new Confirm(context);

  this.context = context;
};

var describe = function(booking) {
  return booking.data.brand.name + ' ' + 
         booking.data.product.name + ' ' + 
         booking.data.model.name + ' on ' + 
         moment(booking.data.slot.slot).format('ddd MMM Do - h:mma');
};

var email = function(bookings, user, host) {
  if (bookings == null || bookings.length === 0) return;
  
  var data = { bookings: _.map(bookings, describe) };

  publish('email', { user: user, template: 'booking.create', data: data, force: true }, { host: host })
};

Confirm.prototype.confirm = Promise.method(function(member, bookings, session, host) {
  if (bookings) return email(bookings, this.context.session, this.context.host);

  return Booking.listByMember(member.id).then(function(bookings) {
    email(bookings, session || this.context.session, host || this.context.host);
  }.bind(this));
});

module.exports = Confirm;

