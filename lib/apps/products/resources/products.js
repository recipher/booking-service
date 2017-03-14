var Creator = require('../services/creator')
  , Finder = require('../services/finder')
  , cache = require('@recipher/cache')
  , qs = require('qs');

module.exports = function(middleware, errors) {
  return { 
    get: function *(next) {
      var finder = new Finder(this.context);
console.log(qs.stringify(this.request.query))
      var key = 'products:' + qs.stringify(this.request.query)
        , products = yield cache.fetch(key, finder.list, finder, [ this.request.query ]);

      this.status = 200;
      this.body = { products: products }; 
    }

  , post: function *(next) {
      var creator = new Creator(this.context);

      this.status = 200;
      this.body = { product: yield creator.create(this.request.body.product) }; 
    }
  };
};