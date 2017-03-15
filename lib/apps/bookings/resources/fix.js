var Fixer = require('../services/fix');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) {
      var fix = new Fixer(this.context);

      this.status = 200;
      this.body = { bookings: yield fix.fix() }; 
    }
  };
};