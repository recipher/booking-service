var Csv = require('../services/csv')
  , moment = require('moment');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) { 
      var csv = new Csv(this.context)
        , filename = 'bookings-' + moment().format('DDMMYY') + '.csv';

      this.status = 200;
      this.type = 'text/csv';
      this.body = yield csv.generate(this.params.q || this.request.query.q, this.request.query);
      this.response.set('Content-Disposition', 'attachment; filename=' + filename);
    }
  };
};