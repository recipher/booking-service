var Creator = require('../services/creator')
  , Finder = require('../services/finder')
  , cache = require('@recipher/cache')
  , qs = require('qs');

module.exports = function(middleware, errors) {
  return { 
    get: function *(next) {
      var finder = new Finder(this.context);

      var key = 'models:' + qs.stringify(this.request.query)
        , models = yield cache.fetch(key, finder.list, finder, [ this.request.query ]);

      this.status = 200;
      this.body = { models: models }; 
    }

  , post: function *(next) {
      var creator = new Creator(this.context);

      this.status = 200;
      this.body = { model: yield creator.create(this.request.body.model) }; 
    }
  };
};