var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , moment = require('moment')
  , Base = require('@recipher/store').Repository
  , schema = require('../schemas/booking');

var NAME = 'booking';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);


Repository.prototype.listByProduct = function(product, options) {
  return this.find({ product: product }, options);
};

Repository.prototype.listByMember = function(member, options) {
  return this.find({ member: member }, options);
};

Repository.prototype.listByModel = function(model, options) {
  return this.find({ model: model }, options);
};

var search = function(query, options) {
  var time = this.database.time.bind(this.database)
    , ISO8601 = this.database.ISO8601.bind(this.database);

  var to = moment(options.to)
    , from = moment(options.from || [ 2016, 1, 1]);

  var t = time(to.year(), to.month() + 1, to.date(), 23, 59, 0, 'Z')
    , f = time(from.year(), from.month() + 1, from.date(), 0, 0, 0, 'Z');

  return function(booking) {
    return booking('description').match('(?i)' + query) //.and(
           // ISO8601(booking('slot')).during(f, t));
  };
};

Repository.prototype.search = function(query, options) {
  var filter = search.call(this, query, options);
  return this.find(filter, options);
};

Repository.prototype.total = function(query, options) {
  var filter = search.call(this, query, options);
  return this.count(filter, options);
};

Repository.prototype.sanitize = function(booking) {
  if (booking == null) return;
  
  if (booking.bookedAt) booking.bookedAt = new Date(booking.bookedAt).toISOString();

  return booking;
};

Repository.prototype.clean = function(booking) {
  if (booking == null) return;

  return booking;
};

Repository.prototype.index = function() {
  return this.createIndex('description').then(function() {
    return this.createIndex('slot');
  }.bind(this));
};


module.exports = new Repository;
