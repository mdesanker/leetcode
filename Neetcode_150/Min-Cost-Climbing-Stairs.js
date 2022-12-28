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
