/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const res = [];
  let p1 = 0,
    p2 = n;
  while (p2 < nums.length) {
    res.push(nums[p1]);
    res.push(nums[p2]);
    p1++;
    p2++;
  }
  return res;
};

// Time: O(n) iterate through the array once
// Space: O(1) no additional memory other than the result array
