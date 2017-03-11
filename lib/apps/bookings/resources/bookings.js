var Booker = require('../services/booker')
  , Finder = require('../services/finder');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) {
      var finder = new Finder(this.context);

      this.status = 200;
      this.body = { bookings: yield finder.list(this.request.query) }; 
    }

  , post: function *(next) {
      var booker = new Booker(this.context);

      this.status = 200;
      this.body = { booking: yield booker.book(this.request.body.booking) }; 
    }
  };
};