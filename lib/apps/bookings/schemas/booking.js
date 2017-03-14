module.exports = {
  required: true
, type: 'object'
, properties: {
    model: { required: true, type: 'string' }
  , slot: { required: true, type: 'string', format: 'date-time' }
  , member: { required: true, type: 'string' }
  , product: { required: true, type: 'string' }
  , info: { required: true, type: 'object' }
  , data: { required: true, type: 'object' }
  , bookedAt: { required: true, type: 'string', format: 'date-time' }
  }
};