module.exports = {
  required: true
, type: 'object'
, properties: {
    name: { required: true, type: 'string' }
  , brand: { required: true, type: 'string' }
  , info: { type: 'string' }
  , image: { type: 'string' }
  }
};