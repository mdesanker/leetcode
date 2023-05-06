/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Two Pointer
var numSubseq = function (nums, target) {
  const n = nums.length;
  const MOD = 10 ** 9 + 7;
  nums.sort((a, b) => a - b);

  const power = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    power[i] = (power[i - 1] * 2) % MOD;
  }

  let l = 0,
    r = n - 1,
    res = 0;
  while (l <= r) {
    if (nums[l] + nums[r] > target) {
      r--;
    } else {
      res = (res + power[r - l]) % MOD;
      l++;
    }
  }
  return res % MOD;
};
// TC: O(nlogn)
// SC: O(n)
