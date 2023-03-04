/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */

/**
nums[i] is the rightmost element of subarray
bad is index of last seen nums[i] < minK || nums[i] > maxK
min is index of last seen nums[i] === minK
max is index of last seen nums[i] === maxK

At end of each iteration, subarray ends at nums[i]
Starting element can be chosen from interval [bad + 1, min(min, max)]
Therefore count is min(min, max) - bad
Add count to res if greater than 0
 */

var countSubarrays = function (nums, minK, maxK) {
  const n = nums.length;
  let res = 0,
    bad = -1,
    min = -1,
    max = -1;

  for (let i = 0; i < n; i++) {
    if (nums[i] < minK || nums[i] > maxK) bad = i;
    if (nums[i] === minK) min = i;
    if (nums[i] === maxK) max = i;

    const count = Math.min(min, max) - bad;
    res += Math.max(0, count);
  }
  return res;
};

// Time: O(n)
// Space: O(1)
