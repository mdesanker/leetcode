/**
 * @param {number[][]} costs
 * @return {number}
 */
// Recursion [TLE]
var minCostII = function (costs) {
  const n = costs.length,
    k = costs[0].length;

  function dp(i, j) {
    if (i === n) return 0;

    let min = Infinity;
    for (let x = 0; x < k; x++) {
      if (x === -1 || x !== j) min = Math.min(min, costs[i][x] + dp(i + 1, x));
    }
    return min;
  }
  return dp(0, -1);
};
// TC: Exponential
// SC: O(nk)

// Recursion + Memoization
var minCostII = function (costs) {
  const n = costs.length,
    k = costs[0].length;
  const memo = [...new Array(n)].map(() => new Array(k + 1).fill(-1));

  function dp(i, j) {
    if (i === n) return 0;

    if (memo[i][j + 1] !== -1) return memo[i][j + 1];

    let min = Infinity;
    for (let x = 0; x < k; x++) {
      if (x === -1 || x !== j) min = Math.min(min, costs[i][x] + dp(i + 1, x));
    }
    return (memo[i][j + 1] = min);
  }
  return dp(0, -1);
};
// TC: O(nk^2)
// SC: O(nk)

// Tabulation
var minCostII = function (costs) {
  const n = costs.length,
    k = costs[0].length;
  const dp = [...new Array(n)].map(() => new Array(k).fill(0));
  dp[0] = costs[0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < k; j++) {
      let min = Infinity;
      for (let x = 0; x < k; x++) {
        if (x !== j) min = Math.min(min, costs[i][j] + dp[i - 1][x]);
      }
      dp[i][j] = min;
    }
  }
  return Math.min(...dp[n - 1]);
};
// TC: O(nk^2)
// SC: O(nk)

// Tabulation - Space optimized
var minCostII = function (costs) {
  const n = costs.length,
    k = costs[0].length;
  let dp = costs[0];

  for (let i = 1; i < n; i++) {
    let temp = new Array(k).fill(0);
    for (let j = 0; j < k; j++) {
      let min = Infinity;
      for (let x = 0; x < k; x++) {
        if (x !== j) min = Math.min(min, costs[i][j] + dp[x]);
      }
      temp[j] = min;
    }
    dp = temp;
  }
  return Math.min(...dp);
};
// TC: O(nk^2)
// SC: O(k)
