/**
 * @param {number[]} cost
 * @return {number}
 */

/**
Recurrence relation

Add a 0 to end of cost array because we need to get to position just after last index of cost array
[10, 15, 20, 0]

We can start at first or second step, so cost to get to index 0 or 1 is 0
Start by considering the cost to get to third step (index 2)

[10, 15, 20, 0]
[0,  0,  _,  _]

To get to third step, we can either come from first or second step
Therefore cost to get third step is the minimum of coming from first or the second step
To come from first step, we sum cost to get the first step (dp[0] = 0) with the cost to use that step (cost[0] = 10)
To come from second step, we sum cost to get to the second step (dp[1] = 0) with the cost to use that step (cost[1] = 15)

Third step = Math.min(0 + 10, 0 + 15)

This recurrence relation can be generalized as Math.min(cost[i - 1] + dp(i - 1), cost[i - 2] + dp(i - 2));
 */

// Recursion
var minCostClimbingStairs = function (cost) {
  function dp(i) {
    if (i <= 1) return 0;
    return Math.min(dp(i - 1) + cost[i - 1], dp(i - 2) + cost[i - 2]);
  }
  return dp(cost.length);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + memoization
var minCostClimbingStairs = function (cost) {
  const memo = {};
  function dp(i) {
    if (i in memo) return memo[i];
    if (i <= 1) return 0;
    return (memo[i] = Math.min(
      dp(i - 1) + cost[i - 1],
      dp(i - 2) + cost[i - 2]
    ));
  }
  return dp(cost.length);
};

// Time: O(n)
// Space: O(n)

// Tabulation
var minCostClimbingStairs = function (cost) {
  const n = cost.length;

  const dp = new Array(n + 1);

  dp[0] = dp[1] = 0;

  for (let i = 2; i < n + 1; i++) {
    dp[i] = Math.min(cost[i - 1] + dp[i - 1], cost[i - 2] + dp[i - 2]);
  }
  return dp[n];
};

// Tabulation - optimized
var minCostClimbingStairs = function (cost) {
  const n = cost.length;

  function dp(i) {
    if (i <= 1) return 0;

    let one = 0,
      two = 0;
    for (let i = 2; i < n + 1; i++) {
      let curr = Math.min(cost[i - 1] + two, cost[i - 2] + one);
      one = two;
      two = curr;
    }
    return two;
  }
  return dp(cost.length);
};

// Time: O(n)
// Space: O(1)

/**
Two initial observations that indicate this is a DP problem:
1. We need to find the max/min of something
2. We have to make decisions that might look different depending on decisions made previously

This is an easy problem to start with tabulation for (bottom up DP)
We need to get to the index right after the cost array
We can modify the input array by pushing a 0 onto the end

The value in every cell is the cost to take a step from that cell, whether it's a single step or a double step
The last cell is now a 0, because that is our target. We are at the end so do not need to do anything to get to where we alreay are

[10, 15, 20, 0]

Working through this array in reverse order
Second last cell [20] - there is only one possible option to get to the end, which is 1 step away. 
We must pay the cost of this cell alone to get to the end

Third last cell [15] - here we have multiple options to get to the end, because we can make either a single or double step
If we take a single step, we get to step [20], where we then have to take another single step: 15 + 20 = 35
If we take a double step, we get directly to then end: 15 + 0 = 15
The cost of getting to the end from the third cell will be the minimum of these two values

We iterate backwards through array, starting from 3rd last cell, updating the cost

cost[i] += Math.min(cost[i + 1], cost[i + 2]);

Once we finish iterating over the array, we return the minimum of the first two cells, since we can start from either position

return Math.min(cost[0], cost[1]);

TC: O(n) iterate over array once
SC: O(1) since we use input array
 */
