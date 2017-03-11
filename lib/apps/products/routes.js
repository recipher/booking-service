module.exports = function(router, resource, middleware, errors) {
  var products = resource.products(middleware, errors);
  
  router.post('/', products.post);
  router.get('/', products.get);
};

// GET /brands
// GET /products?brand=cannondale
// GET /models?product=scalpel

// GET /bookings?model=scalpel-large
// POST /bookings

// POST /payments