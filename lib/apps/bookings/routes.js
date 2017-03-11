module.exports = function(router, resource, middleware, errors) {
  var bookings = resource.bookings(middleware, errors);
  
  router.get('/', bookings.get);
  router.post('/', bookings.post);
};
