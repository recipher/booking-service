// Friday 9 June 11am-12:30pm  1
// Friday 9 June 1pm-2:30pm  2
// Saturday 10 June  10am-11:30am  4
// Saturday 10 June  2pm-3:30pm  6
// Sunday 11 June  10am-11:30am  8
// Sunday 11 June  12pm-1:30pm 9

module.exports = function() {
  var slots = [
    { id: new Date(2018, 5, 8, 12, 0, 0), index: 1 }
  , { id: new Date(2018, 5, 8, 17, 0, 0), index: 3 }
  , { id: new Date(2018, 5, 9, 9, 30, 0), index: 4 }
  , { id: new Date(2018, 5, 9, 14, 30, 0), index: 6 }
  , { id: new Date(2018, 5, 10, 9, 30, 0), index: 7 }
  , { id: new Date(2018, 5, 10, 12, 0, 0), index: 8 }
  ];

  return slots.map(function(slot) {
    slot.slot = slot.id;
    return slot;
  });
};