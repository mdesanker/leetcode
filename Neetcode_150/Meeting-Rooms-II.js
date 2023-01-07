/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  // split intervals into sorted arrays of start and end points
  const start = [];
  const end = [];
  for (let interval of intervals) {
    start.push(interval[0]);
    end.push(interval[1]);
  }
  start.sort((a, b) => a - b);
  end.sort((a, b) => a - b);

  // count number of overlapping meetings at any time
  let count = 0,
    res = 0;
  // pointers for positions in start and end arrays
  let s = 0,
    e = 0;

  // will reach end of start array first
  while (s < intervals.length) {
    if (start[s] < end[e]) {
      s++;
      count++;
    } else {
      e++;
      count--;
    }
    res = Math.max(res, count);
  }
  return res;
};

// Time: O(nlogn)
// Space: O(n)
