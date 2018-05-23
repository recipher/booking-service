var Creator = require('../services/creator')
  , Finder = require('../services/finder')
  , cache = require('@recipher/cache')
  , qs = require('qs');

module.exports = function(middleware, errors) {
  
  return { 
    get: function *(next) {
      var finder = new Finder(this.context);

      var brands = yield finder.list(this.request.query); // yield cache.fetch('brands', finder.list, finder, [ this.request.query ]);

      this.status = 200;
      this.body = { brands: brands }; 
    }

  , post: function *(next) {
      var creator = new Creator(this.context);

      this.status = 200;
      this.body = { brand: yield creator.create(this.request.body.brand) }; 
    }
  };
};
