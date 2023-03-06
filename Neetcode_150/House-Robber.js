/**
 * @param {number[]} nums
 * @return {number}
 */
// Recursion
var rob = function (nums) {
  const n = nums.length;

  function dp(i) {
    // base cases
    if (i === 0) return nums[0];
    if (i === 1) return Math.max(nums[0], nums[1]);

    // recurrence relation
    return Math.max(dp(i - 1), nums[i] + dp(i - 2));
  }
  return dp(n - 1);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + memoization
var rob = function (nums) {
  const n = nums.length;

  const memo = {};

  function dp(i) {
    // check cache
    if (i in memo) return memo[i];

    // base cases
    if (i === 0) return nums[0];
    if (i === 1) return Math.max(nums[0], nums[1]);

    // recurrence relation
    return (memo[i] = Math.max(dp(i - 1), nums[i] + dp(i - 2)));
  }
  return dp(n - 1);
};

// Time: O(n)
// Space: O(n)

// Tabulation
var rob = function (nums) {
  const n = nums.length;

  const dp = new Array(n).fill(0);

  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }
  return dp[n - 1];
};

// Time: O(n)
// Space: O(n)

// Tabulation - optimized
var rob = function (nums) {
  const n = nums.length;

  function dp(i) {
    if (i === 0) return nums[0];
    if (i === 1) return Math.max(nums[0], nums[1]);

    let two = nums[0],
      one = Math.max(nums[0], nums[1]);

    for (let i = 2; i < n; i++) {
      let curr = Math.max(one, nums[i] + two);
      two = one;
      one = curr;
    }
    return one;
  }
  return dp(n - 1);
};

// Time: O(n)
// Space: O(1)

/**
We will iterate through the array calculating the max that can be robbed as we go
The result is then the value we are left with at the end of the traversal

[1, 2, 3, 1]

At index 0, the max is 1
At index 1, the max is 2
At index 2, the max is 4 (max(1 + 3, 2))
At index 3, the max is 4 (max(1 + 3, 2 + 1))

We see a pattern as we iterate through the nums array
The max at every index is Math.max(nums[i] + max from 2 steps before, max from 1 step before);

We initialize the dp array to the length of nums + 1
I will iterate in reverse order, because that is what I am used to for some reason
Initialize last position in array to 0, second to last to the last value in nums array

Starting from third last position

dp[i] = Math.max(nums[i] + dp[i + 2], dp[i + 1]);

Once we have iterated through the entire array, the first value in dp array will be the result

TC: O(n) we iterate through nums array once
SC: O(n) extra space required for DP array

We can optimize this using two variables instead of an entire array to make SC: O(1)
 */
