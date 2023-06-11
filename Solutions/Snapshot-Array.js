// https://leetcode.com/problems/snapshot-array/solutions/909644/javascript-binary-search/
/**
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.id = 0;
  this.historyRecords = new Array(length);
  for (let i = 0; i < this.historyRecords.length; i++) {
    this.historyRecords[i] = [[0, 0]];
  }
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  const arrAtIndex = this.historyRecords[index];
  const lastIndex = arrAtIndex.length - 1;
  const lastSnapId = arrAtIndex[lastIndex][0];

  if (lastSnapId === this.id) {
    arrAtIndex[lastIndex][1] = val;
  } else {
    arrAtIndex.push([this.id, val]);
  }
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  this.id++;
  return this.id - 1;
};

/**
 * @param {number} index
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  const arrAtIndex = this.historyRecords[index];

  if (arrAtIndex[arrAtIndex.length - 1][0] < snap_id) {
    return arrAtIndex[arrAtIndex.length - 1][1];
  }

  let l = 0,
    r = arrAtIndex.length - 1;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arrAtIndex[mid][0] >= snap_id) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  // r is at ceiling
  if (arrAtIndex[r][0] === snap_id || r === 0) {
    return arrAtIndex[r][1];
  }

  // r - 1 must be floor
  return arrAtIndex[r - 1][1];
};
// TC: O(nlogn)
// SC: O(n)

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */
