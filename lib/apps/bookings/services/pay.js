var _ = require('lodash')
  , Promise = require('bluebird')
  , configuration = require('@recipher/configuration')
  , errors = require('@recipher/errors')
  , stripe = require('stripe')(configuration('stripe:key'))
  , Payment = require('../repositories/payment');

console.log('KEY', configuration('stripe:key'))

var Pay = function(context) {
  if (this instanceof Pay === false) return new Pay(context);

  this.context = context;
};

Pay.prototype.pay = Promise.method(function(payment, member) {
  var makeCharge = Promise.promisify(stripe.charges.create).bind(stripe.charges);

  return makeCharge({
    amount: payment.amount 
  , currency: 'gbp'
  , card: payment.id
  , description: 'Booking for ' + member.name
  })

  .then(function(charge) {

    var payment = { 
      member: member.id
    , charge: charge.id
    , amount: charge.amount
    , paidAt: new Date
    , card: { last4: charge.source.last4, brand: charge.source.brand }
    };

    return Payment.create(payment);
  })

  .catch(function(err) {
    throw new errors.DeclinedError(err.message);
  });
});

module.exports = Pay;

