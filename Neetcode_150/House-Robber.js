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

// DP (Tabulation)
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

// Time: O(n)
// Space: O(n) for dp array

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
