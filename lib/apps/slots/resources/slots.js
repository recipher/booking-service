var generate = require('../services/generate');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) {
      this.status = 200;
      this.body = { slots: generate(this.request.query) }; 
    }
  };
};