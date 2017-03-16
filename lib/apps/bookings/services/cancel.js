var _ = require('lodash')
  , Promise = require('bluebird')
  , Booking = require('../repositories/booking')
  , Cancellation = require('../repositories/cancellation');

var Cancel = function(context) {
  if (this instanceof Cancel === false) return new Cancel(context);

  this.context = context;
};

Cancel.prototype.cancel = function(id) {
  return Booking.get(id).then(function(cancellation) {
    if (cancellation == null) return;

    cancellation.cancelledAt = new Date;

    return Cancellation.create(cancellation).then(function(cancellation) {
      return Booking.delete(id).then(function() {
        return cancellation;
      });
    })
  });
};

module.exports = Cancel;
