module.exports = function(router, resource, middleware, errors) {
  var models = resource.models(middleware, errors);
  
  router.post('/', models.post);
  router.get('/', models.get);
};
