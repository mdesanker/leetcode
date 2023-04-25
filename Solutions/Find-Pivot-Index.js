/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const n = nums.length;
  const forward = new Array(n).fill(0),
    reverse = new Array(n).fill(0);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    forward[i] = sum;
  }
  sum = 0;
  for (let i = n - 1; i >= 0; i--) {
    sum += nums[i];
    reverse[i] = sum;
  }

  for (let i = 0; i < n; i++) {
    if (forward[i] === reverse[i]) return i;
  }
  return -1;
};
// TC: O(n)
// SC: O(n)
