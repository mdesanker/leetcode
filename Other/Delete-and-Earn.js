/**
 * @param {number[]} nums
 * @return {number}
 */

/**
Key Insight
In this problem, we don't iterate over the indices of the nums array, rather we iterate from 0 to the maxNum in the nums array
In this way, we can kind of convert this into the house robber problem
We need to use a hashmap to store the amounts that can be earned by "taking" a num
Then as we iterate from 0 to maxNum + 1, we take the max(amount earned for prev num, amount earned for prev prev num + amount earned from this num)
 */

// Memoization
var deleteAndEarn = function (nums) {
  const map = {};
  let maxNum = 0;
  for (let num of nums) {
    map[num] = map[num] + num || num;
    maxNum = Math.max(maxNum, num);
  }

  const cache = {};

  function dp(i) {
    if (i in cache) return cache[i];

    if (i === 0) return 0;
    if (i === 1) return map[1] || 0;

    return (cache[i] = Math.max(dp(i - 1), (map[i] || 0) + dp(i - 2)));
  }
  return dp(maxNum);
};

/**
Time: O(n + k)
    Iterate through nums once to build map and find maxNum O(n)
    Call dp on maxNum, which will be linear time because of memoization O(k)
Space: O(n + k)
    Size of map is equal to number of unique elements, worst case O(n)
    Recursive stack will be size maxNum O(k)
    Cache will store results for all states from 2 to maxNum, which means it will be size O(k)
    Total: O(n + 2k) = O(n + k)
 */

// Tabulation
var deleteAndEarn = function (nums) {
  const map = {};
  let maxNum = 0;
  for (let num of nums) {
    map[num] = map[num] + num || num;
    maxNum = Math.max(maxNum, num);
  }

  const dp = new Array(maxNum + 1).fill(0);

  dp[0] = 0;
  dp[1] = map[1] || 0;

  for (let i = 2; i < maxNum + 1; i++) {
    dp[i] = Math.max(dp[i - 1], (map[i] || 0) + dp[i - 2]);
  }
  return dp[maxNum];
};

/**
Time: O(n + k)
    Iterate through nums once to build map and find maxNum O(n)
    Iterate through dp array, which is size k + 1 O(k)
Space: O(n + k)
    Size of map is equal to number of unique elements, worst case O(n)
    Dp array is length k + 1 O(k)
 */

/**
Two characteristics of this problem hint towards use of DP:

1. Problem asks us to find the max of something
2. Each decision influences future decisions (if we chose a num, we cannot choose num + 1 or num - 1)
 */
