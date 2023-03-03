/**
 * @param {number[][]} intervals
 * @return {number}
 */
// Chronological Ordering
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

// Min heap
var minMeetingRooms = function (intervals) {
  if (!intervals.length) return 0;

  // heap will store end times of meetings
  const minHeap = new MinPriorityQueue();

  // sort by starting time
  intervals.sort((a, b) => a[0] - b[0]);

  // add first meeting's end time
  minHeap.enqueue(intervals[0][1]);

  for (let i = 1; i < intervals.length; i++) {
    if (minHeap.front().element <= intervals[i][0]) {
      minHeap.dequeue().element;
    }

    minHeap.enqueue(intervals[i][1]);
  }
  return minHeap.size();
};

// Time: O(nlogn) for sorting intervals array and potentially n heap operations which are logn time
// Space: O(n) heap might hold end time for every meeting
