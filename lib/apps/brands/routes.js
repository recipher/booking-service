module.exports = function(router, resource, middleware, errors) {
  var brands = resource.brands(middleware, errors);
  
  router.get('/', brands.get);
  router.post('/', brands.post);
};
