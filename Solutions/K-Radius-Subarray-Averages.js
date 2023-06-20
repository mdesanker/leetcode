/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function (nums, k) {
  const n = nums.length;
  const res = new Array(n).fill(-1);

  let l = 0,
    r = 0,
    sum = 0;
  while (r < n) {
    const rightNum = nums[r];
    sum += rightNum;
    r++;

    if (r - l >= 2 * k + 1) {
      res[r - k - 1] = Math.floor(sum / (2 * k + 1));
      const leftNum = nums[l];
      sum -= leftNum;
      l++;
    }
  }
  return res;
};
// TC: O(n)
// SC: O(1)
