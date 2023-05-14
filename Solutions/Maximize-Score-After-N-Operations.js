/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
  const n = nums.length / 2,
    m = nums.length;
  let memo = new Array(1 << m).fill(-1);

  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  function dp(i, mask) {
    if (i === n + 1) return 0;

    if (memo[mask] !== -1) return memo[mask];

    let res = 0;
    for (let j = 0; j < m; j++) {
      if ((mask >> j) & 1) continue;
      for (let k = j + 1; k < m; k++) {
        if ((mask >> k) & 1) continue;
        let score = i * gcd(nums[j], nums[k]);
        let newMask = mask | (1 << j) | (1 << k);
        res = Math.max(res, dp(i + 1, newMask) + score);
      }
    }
    return (memo[mask] = res);
  }

  return dp(1, 0);
};
// m = 2 * n, A is max value in nums array (max A is 10^6)
// TC: O(4^n * n^2 * logA)
// SC: O(4^n)
