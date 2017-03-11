module.exports = function(router, resource, middleware, errors) {
  var slots = resource.slots(middleware, errors);
  
  router.get('/', slots.get);
};
