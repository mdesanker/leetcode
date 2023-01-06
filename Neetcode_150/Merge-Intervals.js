/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // sort by start point
  intervals.sort((a, b) => a[0] - b[0]);

  // seed with first interval to avoid edge case
  const res = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const lastEnd = res[res.length - 1][1];
    const [start, end] = intervals[i];

    // if they overlap
    if (start <= lastEnd) {
      res[res.length - 1][1] = Math.max(lastEnd, end);
      // if no overlap
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
};

// Time: O(nlogn)
// Space: O(n)
