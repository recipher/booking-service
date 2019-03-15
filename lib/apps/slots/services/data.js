module.exports = function() {
  var slots = [
    { id: new Date(2019, 5, 7, 12, 0, 0), index: 1 }
  // , { id: new Date(2019, 5, 7, 14, 30, 0), index: 3 }
  , { id: new Date(2019, 5, 7, 17, 0, 0), index: 3 }
  , { id: new Date(2019, 5, 8, 9, 30, 0), index: 4 }
  // , { id: new Date(2019, 5, 8, 12, 0, 0), index: 5 }
  , { id: new Date(2019, 5, 8, 14, 30, 0), index: 6 }
  , { id: new Date(2019, 5, 9, 9, 30, 0), index: 7 }
  , { id: new Date(2019, 5, 9, 12, 0, 0), index: 8 }
  // , { id: new Date(2019, 5, 9, 14, 30, 0), index: 9 }
  ];

  return slots.map(function(slot) {
    slot.slot = slot.id;
    return slot;
  });
};