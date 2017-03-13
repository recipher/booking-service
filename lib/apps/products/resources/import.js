var import = require('../services/import');

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) {
      yield import();

      this.status = 204;
    }
  };
};