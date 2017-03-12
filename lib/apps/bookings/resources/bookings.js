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
      var booker = new Booker(this.context)
        , bookings = yield booker.book(
            this.request.body.bookings || this.request.body.booking
          , this.request.body.member
          , this.request.body.payment);

      this.status = 200;
      this.body = { bookings: bookings }; 
    }
  };
};