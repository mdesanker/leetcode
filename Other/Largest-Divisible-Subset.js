/**
 * @param {number[]} nums
 * @return {number[]}
 */

/**
Key insight:
Same solution as "Print Longest Increasing Subsequence", 
except we sort nums array so that we only have to check whether new number is divisible by the previous number
and we check divisibility of nums[i] against previous, nums[j]
 */

var largestDivisibleSubset = function (nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  const dp = new Array(n).fill(1);
  hash = [];

  let max = 1,
    lastInd = 0;
  for (let i = 0; i < n; i++) {
    hash.push(i);
    for (let j = 0; j < i; j++) {
      if (
        nums[i] > nums[j] &&
        (nums[i] % nums[j] === 0 || nums[j] % nums[i] === 0) &&
        dp[i] < 1 + dp[j]
      ) {
        dp[i] = 1 + dp[j];
        hash[i] = j;
      }
    }
    if (dp[i] > max) {
      max = dp[i];
      lastInd = i;
    }
  }

  const res = [];
  res.push(nums[lastInd]);
  while (hash[lastInd] !== lastInd) {
    lastInd = hash[lastInd];
    res.push(nums[lastInd]);
  }
  return res.reverse();
};

// Time: O(n^2)
// Space: O(n)
