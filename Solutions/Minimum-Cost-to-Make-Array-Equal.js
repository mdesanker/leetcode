/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
var minCost = function (nums, cost) {
  function getCost(x) {
    return nums.reduce((tot, num, i) => tot + Math.abs(num - x) * cost[i], 0);
  }

  let l = Math.min(...nums),
    r = Math.max(...nums);
  let ans = getCost(l);

  while (l < r) {
    const mid = l + Math.floor((r - l) / 2);
    let y1 = getCost(mid),
      y2 = getCost(mid + 1);
    ans = Math.min(y1, y2);
    if (y1 < y2) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return ans;
};
// TC: O(n)
// SC: O(1)
