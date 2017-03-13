var data = require('../services/data');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) {
      this.status = 200;
      this.body = { slots: data(this.request.query) }; 
    }
  };
};