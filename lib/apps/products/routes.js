module.exports = function(router, resource, middleware, errors) {
  var products = resource.products(middleware, errors)
    , imports = resource.imports(middleware, errors);
  
  router.post('/', products.post);
  router.get('/', products.get);

  router.post('/imports', imports.post);
};
