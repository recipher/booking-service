var importer = require('../services/import');

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) {
      yield importer();

      this.status = 204;
    }
  };
};