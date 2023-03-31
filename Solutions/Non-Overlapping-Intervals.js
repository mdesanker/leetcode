/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  // sort by end if start is equal, otherwise sort by start
  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  let count = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    let [start, end] = intervals[i];
    // not overlapping, update prevEnd
    if (start >= prevEnd) {
      prevEnd = end;
      // overlap, increment count and set prevEnd to shorter value
      // shorter value less likely to overlap addition intervals
    } else {
      count++;
      prevEnd = Math.min(prevEnd, end);
    }
  }
  return count;
};

// Time: O(nlogn)
// Space: O(1)

/**
Brute force
Include or exclude each interval
Time: O(2^n)
*/
