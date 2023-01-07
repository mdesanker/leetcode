/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
  // sort intervals by starting point
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    let i1 = intervals[i - 1];
    let i2 = intervals[i];

    // if end of previous interval is larger than start of current interval return false
    if (i1[1] > i2[0]) return false;
  }
  return true;
};

// Time: O(nlogn)
// Space: O(1)
