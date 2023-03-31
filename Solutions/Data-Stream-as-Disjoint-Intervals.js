// https://leetcode.com/problems/data-stream-as-disjoint-intervals/solutions/3107284/javascript-solution-using-binary-search-and-set/

var SummaryRanges = function () {
  this.interval = [];
  this.set = new Set();
};

/**
 * @param {number} value
 * @return {void}
 */
SummaryRanges.prototype.addNum = function (value) {
  if (this.set.has(value)) return;

  this.set.add(value);

  let l = 0,
    r = this.interval.length;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (this.interval[mid][1] < value) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  if (!this.set.has(value - 1) && !this.set.has(value + 1)) {
    this.interval.splice(l, 0, [value, value]);
    return;
  } else if (!this.set.has(value + 1) && this.set.has(value - 1)) {
    this.interval[l - 1][1] = value;
    return;
  } else if (!this.set.has(value - 1) && this.set.has(value + 1)) {
    this.interval[l][0] = value;
    return;
  } else {
    this.interval[l - 1][1] = this.interval[l][1];
    this.interval.splice(l, 1);
  }
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function () {
  return this.interval;
};

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(value)
 * var param_2 = obj.getIntervals()
 */
