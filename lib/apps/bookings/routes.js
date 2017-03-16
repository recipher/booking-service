module.exports = function(router, resource, middleware, errors) {
  var bookings = resource.bookings(middleware, errors)
    , booking = resource.booking(middleware, errors)
    , search = resource.search(middleware, errors)
    , confirmations = resource.confirmations(middleware, errors)
    , fix = resource.fix(middleware, errors);
  
  router.get('/', bookings.get);
  router.post('/', bookings.post);

  router.get('/search/:q?', search.get);

  router.delete('/:id', booking.delete);

  router.post('/fix', fix.get);

  router.post('/confirmations', confirmations.post);
};
