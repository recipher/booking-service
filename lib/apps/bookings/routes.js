module.exports = function(router, resource, middleware, errors) {
  var bookings = resource.bookings(middleware, errors)
    , search = resource.search(middleware, errors)
    , fix = resource.fix(middleware, errors);
  
  router.get('/', bookings.get);
  router.post('/', bookings.post);

  router.get('/search/:q?', search.get);

  router.post('/fix', fix.get);
};
