var Confirm = require('../services/confirm');

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) {
      var confirm = new Confirm(this.context);

      yield confirm.confirm(this.request.body.member);

      this.status = 204;
    }
  };
};