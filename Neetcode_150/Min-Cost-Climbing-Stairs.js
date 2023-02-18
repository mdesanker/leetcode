/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  cost.push(0);
  // cost = [10, 15, 20, 0]
  //             ^ start here because will not update last two indices
  for (let i = cost.length - 3; i >= 0; i--) {
    // add minimum of single jump vs double jump
    // cost[i] = Math.min(cost[i] + cost[i + 1], cost[i] + cost[i + 2]);
    cost[i] += Math.min(cost[i + 1], cost[i + 2]);
  }
  // return min of index 0 or 1 (two possible starting positions)
  return Math.min(cost[0], cost[1]);
};

// Time: O(n)
// Space: O(1) using input array

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
