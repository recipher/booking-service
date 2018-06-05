var _ = require('lodash');
var Confirm = require('../services/confirm');

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) {
      var context = _.assign({}, this.context, this.request.body);

      var confirm = new Confirm(context);

      yield confirm.confirm(this.request.body.member);

      this.status = 204;
    }
  };
};