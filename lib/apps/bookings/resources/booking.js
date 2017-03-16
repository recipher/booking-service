var Cancel = require('../services/cancel');

module.exports = function(middleware, errors) {
  
  return { 
    delete: function *(next) {
      var cancel = new Cancel(this.context);

      const cancellation = yield cancel.cancel(this.params.id);

      if (cancellation == null) throw new errors.NotFoundError;

      this.status = 200;
      this.body = { cancellation: cancellation };
    }
  };
};