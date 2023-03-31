/**
Solution: Linear search

Iterate through each interval

There are 3 conditions to handle:
1. newInterval comes before current interval - we can push newInterval onto result array, 
  and then return the concatenation of the remaining intervals
2. newInterval comes after current interval - push current interval onto result array and continue iteration
3. newInterval overlaps with current interval - modify newInterval to be the merge of newInterval and current interval, continue iteration

If we finish iterating through intervals, then we have not added newInterval to res yet and returned the concatenation.
In this case, we push newInterval onto end of res array and return'

n = intervals.length
TC: O(n) 
SC: O(1)
 */

var insert = function (intervals, newInterval) {
  const res = [];
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (newInterval[1] < start) {
      res.push(newInterval);
      return res.concat(intervals.slice(i));
    } else if (newInterval[0] > end) {
      res.push(intervals[i]);
    } else {
      newInterval = [
        Math.min(newInterval[0], start),
        Math.max(newInterval[1], end),
      ];
    }
  }
  res.push(newInterval);
  return res;
};
