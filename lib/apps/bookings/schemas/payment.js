module.exports = {
  required: true
, type: 'object'
, properties: {
    member: { required: true, type: 'string' }
  , amount: { required: true, type: 'number' }
  , charge: { required: true, type: 'string' }
  , paidAt: { required: true, type: 'string', format: 'date-time' }
  , card: { 
      type: 'object'
    , properties: {
        last4: { required: true, type: 'string' }
      , brand: { required: true, type: 'string' }
      }
    }
  }
};
