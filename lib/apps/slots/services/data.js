module.exports = function() {
  var slots = [
    { id: new Date(2021, 7, 27, 12, 0, 0), index: 1 }
  , { id: new Date(2021, 7, 27, 14, 0, 0), index: 2 }
  , { id: new Date(2021, 7, 28, 9, 0, 0), index: 3 }
  , { id: new Date(2021, 7, 28, 11, 0, 0), index: 4 }
  , { id: new Date(2021, 7, 29, 9, 0, 0), index: 5 }
  , { id: new Date(2021, 7, 29, 11, 0, 0), index: 6 }
  ];

  return slots.map(function(slot) {
    slot.slot = slot.id;
    return slot;
  });
};