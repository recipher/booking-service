// Friday 9 June 11am-12:30pm  1
// Friday 9 June 1pm-2:30pm  2
// Saturday 10 June  10am-11:30am  4
// Saturday 10 June  2pm-3:30pm  6
// Sunday 11 June  10am-11:30am  8
// Sunday 11 June  12pm-1:30pm 9

module.exports = function() {
  var slots = [
    { id: new Date(2017, 5, 9, 11, 0, 0), index: 1 }
  , { id: new Date(2017, 5, 9, 13, 0, 0), index: 2 }
  , { id: new Date(2017, 5, 10, 10, 0, 0), index: 4 }
  , { id: new Date(2017, 5, 10, 14, 0, 0), index: 6 }
  , { id: new Date(2017, 5, 11, 10, 0, 0), index: 8 }
  , { id: new Date(2017, 5, 11, 12, 0, 0), index: 9 }
  ];

  return slots.map(function(slot) {
    slot.slot = slot.id;
    return slot;
  });
};