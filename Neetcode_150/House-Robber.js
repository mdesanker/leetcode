/**
 * @param {number[]} nums
 * @return {number}
 */

// Dynamic programming
var rob = function (nums) {
  let rob1 = 0,
    rob2 = 0;

  // [rob1, rob2, n, n + 1, ...]
  for (let num of nums) {
    let temp = Math.max(num + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
};

// Time: O(n)
// Space: O(1)

// Recursion and memoization
var rob = function (nums) {
  const N = nums.length;

  // create dp array with one size larger than nums
  const dp = new Array(N + 1).fill(0);

  // set last index to 0
  dp[N] = 0;
  // second second last index to last index of nums
  dp[N - 1] = nums[N - 1];

  // iterate backwards through dp from second last index calculating max rob
  for (let i = N - 2; i >= 0; i--) {
    dp[i] = Math.max(nums[i] + dp[i + 2], dp[i + 1]);
  }
  return dp[0];
};

// n = nums.length

// Time: O(n)
// Soace: O(n) for dp array
