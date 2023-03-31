/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const res = [];
  for (let i = 0; i < intervals.length; i++) {
    // newInterval doesn't overlap
    // newInterval comes before current interval
    if (newInterval[1] < intervals[i][0]) {
      res.push(newInterval);
      return res.concat(intervals.slice(i));
      // newInterval comes after current interval
    } else if (newInterval[0] > intervals[i][1]) {
      res.push(intervals[i]);

      // newInterval overlaps
    } else {
      // new interval is min of start points and max of end points
      newInterval = [
        Math.min(newInterval[0], intervals[i][0]),
        Math.max(newInterval[1], intervals[i][1]),
      ];
    }
  }
  // insert newInterval if hasn't been added
  res.push(newInterval);
  return res;
};

// Time: O(n)
// Space: O(n)
