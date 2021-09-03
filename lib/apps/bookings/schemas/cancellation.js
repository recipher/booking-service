var assign = require('lodash/assign')
  , schema = assign({}, require('./booking'));

schema.properties.cancelledAt = { required: true, type: 'string', format: 'date-time' };

module.exports = schema;