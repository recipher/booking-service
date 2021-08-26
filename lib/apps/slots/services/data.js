module.exports = function() {
  var slots = [
    { id: new Date(2021, 8, 17, 12, 0, 0), index: 1 }
  , { id: new Date(2021, 8, 17, 14, 0, 0), index: 2 }
  , { id: new Date(2021, 8, 18, 9, 0, 0), index: 5 }
  , { id: new Date(2021, 8, 18, 11, 0, 0), index: 6 }
  , { id: new Date(2021, 8, 19, 9, 0, 0), index: 9 }
  , { id: new Date(2021, 8, 19, 11, 0, 0), index: 10 }
  ];

  return slots.map(function(slot) {
    slot.slot = slot.id;
    return slot;
  });
};