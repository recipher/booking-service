var _ = require('lodash')
  , moment = require('moment');

var DAYS = 3
  , START = moment()
  , TIMES = [ 570, 660, 810 ];

module.exports = function(query) {
  var slots = [];

  var days = _
  .chain()
  .range(query.days || DAYS)
  .map(function(day) {
    return moment(query.start || START).add(day, 'day').hour(0).minute(0).second(0).millisecond(0);
  })
  .value();

  _.forEach(days, function(day) {
    _.forEach(TIMES, function(time) {
      var dt = moment(day).add(time, 'minute');
      slots.push({
        id: dt
      , slot: dt
      });
    });
  });

  return slots;
};