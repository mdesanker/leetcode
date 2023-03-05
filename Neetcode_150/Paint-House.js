/**
 * @param {number[][]} costs
 * @return {number}
 */

/**
Key Insight
Brute force permutation approach: Consider every possible combination of house painting

Paint 1 red
  Paint 2 blue
    Paint 3 red
    Paint 3 green
  Paint 2 green
    Paint 3 red
    Paint 3 blue

Etc for Paint 1 blue, Paint 1 green
Time complexity of brute force is O(2^n) 

Brute force recursive tree approach
First step: I can choose to paint house 1 red, green or blue
Second step: For house 1 = red tree, I can choose to paint house 2 green or blue
 */

// Top-down
var minCost = function (costs) {
  const memo = {};

  function dp(i, color) {
    // check cache
    const key = `${i}#${color}`;
    if (key in memo) return memo[key];

    let total = costs[i][color];

    // base case - end of costs array
    if (i === costs.length - 1);
    else if (color === 0) {
      // recurrence relation
      total += Math.min(dp(i + 1, 1), dp(i + 1, 2));
    } else if (color === 1) {
      total += Math.min(dp(i + 1, 0), dp(i + 1, 2));
    } else if (color === 2) {
      total += Math.min(dp(i + 1, 0), dp(i + 1, 1));
    }
    return (memo[key] = total);
  }

  // edge case
  if (!costs.length) return 0;

  return Math.min(dp(0, 0), dp(0, 1), dp(0, 2));
};

// Time: O(n)
// Space: O(n)

// Bottom-up
var minCost = function (costs) {
  // start from second last row, update optimal cost to paint house each color depending on cost of previous row
  for (let i = costs.length - 2; i >= 0; i--) {
    costs[i][0] += Math.min(costs[i + 1][1], costs[i + 1][2]);
    costs[i][1] += Math.min(costs[i + 1][0], costs[i + 1][2]);
    costs[i][2] += Math.min(costs[i + 1][0], costs[i + 1][1]);
  }
  // edge case
  if (!costs.length) return 0;

  // return min of first row
  return Math.min(...costs[0]);
};

// Time: O(n)
// Space: O(1) because use input grid
