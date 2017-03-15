var Finder = require('../services/finder');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) {
      var finder = new Finder(this.context);

      this.status = 200;
      this.body = { 
        bookings: yield finder.search(this.params.q || this.request.query.q, this.request.query) 
      , meta: { total: yield finder.total(this.params.q || this.request.query.q, this.request.query) }
      };
    }
  };
};
